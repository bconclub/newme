import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ENDPOINTS } from "../../constants/urlConstants";
import { ResultsPage } from "../ResultsPage/ResultsPage";
import { OrderPage } from "../OrderPage/OrderPage";
import { PaymentSuccessPage } from "../PaymentSuccessPage/PaymentSuccessPage";
import { GRN, SAND, INK, INK3 } from "../../constants/theme";
import { LogoMark } from "../../components/Logo";
import { globalCss } from "../../constants/styles";
import { selectPhase, convertLead } from "../../services/crmService";

type Screen = "results" | "order" | "payment_success";

export function SharedResultsPage() {
  const params = useSearchParams();
  const email = params.get("email") || "";

  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);
  const [data,    setData]    = useState<any>(null);

  const [screen,        setScreen]        = useState<Screen>("results");
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [paidPhase,     setPaidPhase]     = useState<string | null>(null);

  const [secExpanded, setSecExpanded] = useState(false);
  const [showSticky,  setShowSticky]  = useState(false);
  const pricingRef   = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle Zoho redirect-back on this page
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("zoho_payment") === "success") {
      const phase  = sessionStorage.getItem("newme_pending_phase") ?? "Reset";
      const leadId = sessionStorage.getItem("newme_pending_lead_id");
      if (leadId) convertLead(leadId, phase).catch(() => {});
      try { sessionStorage.removeItem("newme_pending_phase"); sessionStorage.removeItem("newme_pending_lead_id"); } catch {}
      window.history.replaceState({}, "", window.location.pathname + window.location.search.replace(/[?&]zoho_payment=success/, ""));
      setPaidPhase(phase);
      setScreen("payment_success");
      setLoading(false);
      return;
    }

    if (!email) { setError("No email provided."); setLoading(false); return; }
    fetch(ENDPOINTS.CRM_LEAD_RESULTS(email))
      .then(r => { if (!r.ok) throw new Error("not_found"); return r.json(); })
      .then(d => {
        setData(d);
        if (d.status === "Converted") {
          setPaidPhase(d.paidPhase);
          setScreen("payment_success");
        }
        setLoading(false);
      })
      .catch(() => { setError("No results found for this email."); setLoading(false); });
  }, [email]);

  useEffect(() => {
    if (!data) return;
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => { setShowSticky(el.scrollTop > 120); };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [data]);

  function handleSelectPhase(phase: string) {
    setSelectedPhase(phase);
    if (data?.crmLeadId) {
      selectPhase(data.crmLeadId, phase).catch(() => {});
      // Store leadId so the Zoho success handler can call convertLead
      try { sessionStorage.setItem("newme_pending_lead_id", data.crmLeadId); } catch {}
    }
    setScreen("order");
  }

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: SAND }}>
      <div style={{ textAlign: "center" }}>
        <LogoMark size={36} color={GRN} />
        <p style={{ marginTop: 16, fontSize: 14, color: INK3 }}>Loading your results…</p>
      </div>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: SAND }}>
      <div style={{ textAlign: "center", maxWidth: 320, padding: 24 }}>
        <LogoMark size={36} color={GRN} />
        <p style={{ marginTop: 16, fontSize: 16, fontWeight: 700, color: INK }}>Results not found</p>
        <p style={{ marginTop: 8, fontSize: 14, color: INK3 }}>{error}</p>
      </div>
    </div>
  );

  return (
    <>
      <style>{globalCss}</style>
      <div ref={containerRef} style={{ height: "100dvh", overflowY: "auto" }}>
        {screen === "results" && data && (
          <ResultsPage
            res={data.res}
            ans={data.ans}
            info={data.info}
            profile={data.profile}
            selectedPhase={selectedPhase}
            secExpanded={secExpanded}
            setSecExpanded={setSecExpanded}
            showSticky={showSticky}
            bodyVisible={true}
            pricingRef={pricingRef}
            onSelectPhase={handleSelectPhase}
            onViewDetail={() => {}}
            attemptsLeft={null}
            onRetry={() => {}}
            pct={100}
            total={100}
            crmLeadId={data.crmLeadId}
          />
        )}

        {screen === "order" && selectedPhase && data && (
          <OrderPage
            phase={selectedPhase}
            info={data.info}
            onBack={() => setScreen("results")}
          />
        )}

        {screen === "payment_success" && paidPhase && (
          <PaymentSuccessPage paidPhase={paidPhase} />
        )}
      </div>
    </>
  );
}
