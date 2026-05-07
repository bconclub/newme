import { useState, useEffect, useRef } from "react";
import { globalCss } from "./constants/styles";
import { TOTAL, ALL_Q } from "./data/questions";
import { SEC, PW, PRICING } from "./data/pathways";
import { routeAnswers, getCalcMessages } from "./utils/routing";
import { createLead, createLeadFromProfile, updateLeadQuizData, selectPhase, convertLead, attachResultsPDF } from "./services/crmService";
import { recordAssessmentAttempt } from "./services/assessmentService";
import { IntroPage } from "./pages/IntroPage/IntroPage";
import { QuizPage } from "./pages/QuizPage/QuizPage";
import { CalcPage } from "./pages/CalcPage/CalcPage";
import { ResultsPage } from "./pages/ResultsPage/ResultsPage";
import { PhaseDetailPage } from "./pages/PhaseDetailPage/PhaseDetailPage";
import { OrderPage } from "./pages/OrderPage/OrderPage";
import { PaymentSuccessPage } from "./pages/PaymentSuccessPage/PaymentSuccessPage";

export default function App() {
  // ── Session restore ───────────────────────────────────────────────────────
  const savedSession = (() => {
    try { const s = sessionStorage.getItem("newme_session"); return s ? JSON.parse(s) : null; } catch { return null; }
  })();

  const [screen,      setScreen]     = useState("intro");
  const [step,        setStep]       = useState(0);
  const [profile,     setProfile]    = useState<{ dob: string; gender: string; phone: string; dialCode?: string }>(
    savedSession?.profile ?? { dob: "", gender: "", phone: "" }
  );
  const [ans,         setAns]        = useState<Record<string, any>>(
    savedSession?.ans ?? { r2_symptoms: [], r3_diagnoses: [] }
  );
  const [info,        setInfo]       = useState<{ name: string; last: string; email: string; phone: string }>(
    savedSession?.info ?? { name: "", last: "", email: "", phone: "" }
  );
  const [res,         setRes]        = useState<Record<string, any> | null>(null);
  const [calcIdx,     setCalcIdx]    = useState(0);
  const [calcMsgs,    setCalcMsgs]   = useState<string[]>([]);
  const [calcPct,     setCalcPct]    = useState(0);
  const [dobErr,      setDobErr]     = useState("");
  const [detailKey,   setDetailKey]  = useState<string | null>(null);
  const [crmLeadId,      setCrmLeadId]     = useState<string | null>(() => {
    try { return localStorage.getItem("newme_lead_id") || null; } catch { return null; }
  });
  const [selectedPhase,  setSelectedPhase] = useState<string | null>(null);
  const [secExpanded,    setSecExpanded]   = useState(false);
  const [bodyVisible, setBodyVisible] = useState(false);
  const [showSticky,  setShowSticky]  = useState(false);
  const [paidPhase,   setPaidPhase]   = useState<string | null>(null);
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pricingRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = globalCss;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  // Persist session to sessionStorage (survives refresh, clears on tab close)
  useEffect(() => {
    if (screen === "intro" || screen === "payment_success") return;
    try {
      sessionStorage.setItem("newme_session", JSON.stringify({ screen, step, info, profile, ans, res, crmLeadId, selectedPhase }));
    } catch {}
  }, [screen, step, info, profile, ans, res, crmLeadId, selectedPhase]);

  useEffect(() => { containerRef.current?.scrollTo({ top: 0, behavior: "smooth" }); }, [step, screen, detailKey]);


  useEffect(() => {
    if (screen !== "results") return;
    setBodyVisible(false);
    setShowSticky(false);
    setSecExpanded(false);
    const t = setTimeout(() => setBodyVisible(true), 420);
    return () => clearTimeout(t);
  }, [screen]);

  useEffect(() => {
    if (screen !== "results" || !pricingRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => setShowSticky(!e.isIntersecting),
      { threshold: 0.1, root: containerRef.current || null }
    );
    obs.observe(pricingRef.current);
    return () => obs.disconnect();
  }, [screen, res]);

  // Handle Zoho redirect-back (success or cancelled/back-button)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pendingPhase = sessionStorage.getItem("newme_pending_phase");

    if (params.get("zoho_payment") === "success") {
      // Payment completed — show success screen and notify CRM
      const phase = pendingPhase ?? "Reset";
      const leadId = (() => { try { return localStorage.getItem("newme_lead_id"); } catch { return null; } })();
      if (leadId) convertLead(leadId, phase).catch(() => {});
      try { sessionStorage.removeItem("newme_pending_phase"); sessionStorage.removeItem("newme_session"); } catch {}
      window.history.replaceState({}, "", window.location.pathname);
      setPaidPhase(phase);
      setScreen("payment_success");
      return;
    }

    if (pendingPhase) {
      // User pressed back from Zoho without completing payment — silently restore session
      try { sessionStorage.removeItem("newme_pending_phase"); } catch {}
      const session = (() => { try { const s = sessionStorage.getItem("newme_session"); return s ? JSON.parse(s) : null; } catch { return null; } })();
      if (session?.crmLeadId) setCrmLeadId(session.crmLeadId);
      if (session?.res) setRes(session.res);
      if (session?.selectedPhase) setSelectedPhase(session.selectedPhase);
      setStep(session?.step ?? 0);
      setScreen(session?.res ? "results" : "q");
    }
  }, []);

  const qIdx = step - 1;
  const q = qIdx >= 0 && qIdx < TOTAL ? ALL_Q[qIdx] : null;
  const pct = step === 0 ? 4 : Math.round((step / (TOTAL + 1)) * 100);

  /** Parse DOB in either DD/MM/YYYY (text input) or YYYY-MM-DD (legacy) */
  function calcAge(dob: string) {
    if (!dob) return null;
    let y: number, m: number, d: number;
    if (dob.includes("/")) {
      const parts = dob.split("/");
      if (parts.length !== 3) return null;
      d = parseInt(parts[0], 10);
      m = parseInt(parts[1], 10) - 1;
      y = parseInt(parts[2], 10);
    } else {
      y = parseInt(dob.slice(0, 4), 10);
      m = parseInt(dob.slice(5, 7), 10) - 1;
      d = parseInt(dob.slice(8, 10), 10);
    }
    if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return null;
    if (y < 1900 || y > 2100 || m < 0 || m > 11 || d < 1 || d > 31) return null;
    const today = new Date(), b = new Date(y, m, d);
    if (b.getFullYear() !== y || b.getMonth() !== m || b.getDate() !== d) return null;
    let age = today.getFullYear() - b.getFullYear();
    if (today < new Date(today.getFullYear(), m, d)) age--;
    return age;
  }

  /** Auto-format text DOB as DD/MM/YYYY while typing */
  function handleDOB(v: string) {
    // Strip non-digits, then re-insert slashes
    const digits = v.replace(/\D/g, "").slice(0, 8);
    let formatted = digits;
    if (digits.length > 4)      formatted = `${digits.slice(0,2)}/${digits.slice(2,4)}/${digits.slice(4)}`;
    else if (digits.length > 2) formatted = `${digits.slice(0,2)}/${digits.slice(2)}`;
    setProfile(p => ({ ...p, dob: formatted }));
    if (formatted.length === 10) {
      const a = calcAge(formatted);
      setDobErr(a === null || a < 18 || a > 65 ? "Please enter a valid date of birth (age 18 to 65)." : "");
    } else {
      setDobErr("");
    }
  }

  function canAdvanceProfile() {
    if (!profile.dob || !profile.gender || !profile.phone?.trim()) return false;
    const a = calcAge(profile.dob); return a !== null && a >= 18 && a <= 65;
  }

  function pickSingle(v: string) {
    setAns(a => ({ ...a, [q!.id]: v }));
    setTimeout(() => { if (step < TOTAL) setStep(s => s + 1); else setStep(TOTAL + 1); }, 210);
  }

  function toggleMulti(v: string) {
    setAns(a => {
      const cur: string[] = a[q!.id] || [], excl = (q!.opts as any[]).filter(o => o.excl).map((o: any) => o.v);
      if ((q!.opts as any[]).find((o: any) => o.v === v)?.excl) return { ...a, [q!.id]: cur.includes(v) ? [] : [v] };
      const base = cur.filter(x => !excl.includes(x));
      if (base.includes(v)) return { ...a, [q!.id]: base.filter(x => x !== v) };
      if ((q as any).max && base.length >= (q as any).max) return a;
      return { ...a, [q!.id]: [...base, v] };
    });
  }

  function advanceMulti() {
    if (step < TOTAL) setStep(s => s + 1); else setStep(TOTAL + 1);
  }

  function startCalc(preQuizLeadId: string | null = null) {
    const effectiveLeadId = preQuizLeadId ?? crmLeadId;
    if (effectiveLeadId) {
      setCrmLeadId(effectiveLeadId);
    }
    const recommended = routeAnswers(ans).pathway;
    const secondary = SEC[recommended];
    const infoWithPhone = { ...info, phone: profile.phone || info.phone };
    if (effectiveLeadId) {
      updateLeadQuizData(effectiveLeadId, { info: infoWithPhone, profile, ans, pathway: recommended, secondary }).catch(() => {});
    } else {
      createLead({ info: infoWithPhone, profile, ans, pathway: recommended, secondary })
        .then(d => { if (d.leadId) setCrmLeadId(d.leadId); })
        .catch(() => {});
    }
    recordAssessmentAttempt(info.email, recommended).catch(() => {});

    const msgs = getCalcMessages(ans);
    setCalcMsgs(msgs); setCalcIdx(0); setCalcPct(0); setScreen("calc");
    msgs.forEach((_, i) => setTimeout(() => { setCalcIdx(i); setCalcPct(Math.round(((i + 1) / msgs.length) * 85)); }, i * 900));
    setTimeout(() => {
      setCalcPct(100);
      const result = routeAnswers(ans);
      setRes(result);
      setScreen("results");
      // Fire-and-forget: attach results PDF to CRM lead
      const leadIdNow = effectiveLeadId;
      if (leadIdNow) {
        const secKey = SEC[result.pathway];
        attachResultsPDF(leadIdNow, {
          info: { ...info, phone: profile.phone || info.phone },
          res: { ...result, ans },
          pw: { badge: PW[result.pathway].badge, bullets: PW[result.pathway].bullets },
          pricing: PRICING[result.pathway],
          secBadge: secKey ? PW[secKey]?.badge : null,
        });
      }
    }, msgs.length * 900 + 600);
  }

  function trackSelectedPhase(phase: string) {
    setSelectedPhase(phase);
    if (crmLeadId) {
      selectPhase(crmLeadId, phase).catch(() => {});
    }
    setScreen("order");
  }

  function backToResults() { setScreen("results"); setDetailKey(null); }

  function handleContinue() {
    if (!savedSession) return;
    if (savedSession.crmLeadId) setCrmLeadId(savedSession.crmLeadId);
    if (savedSession.res) setRes(savedSession.res);
    if (savedSession.selectedPhase) setSelectedPhase(savedSession.selectedPhase);
    const targetScreen = savedSession.screen;
    const targetStep   = savedSession.step ?? 0;
    setStep(targetStep);
    // "order" without a selectedPhase would be a blank page — fall back to results
    const resolvedScreen =
      targetScreen === "calc" ? "q"
      : targetScreen === "order" && !savedSession.selectedPhase ? (savedSession.res ? "results" : "q")
      : targetScreen;
    setScreen(resolvedScreen);
  }

  function handleStartOver() {
    try { sessionStorage.removeItem("newme_session"); } catch {}
    setAns({ r2_symptoms: [], r3_diagnoses: [] });
    setInfo({ name: "", last: "", email: "", phone: "" });
    setProfile({ dob: "", gender: "", phone: "" });
    setRes(null); setCrmLeadId(null); setAttemptsLeft(null); setStep(0); setScreen("q");
  }

  function handleRetry() {
    setAns({ r2_symptoms: [], r3_diagnoses: [] });
    // keep info and profile so fields are pre-filled on retry
    setRes(null);
    setAttemptsLeft(null);
    setStep(0);
    setScreen("q");
  }

  // ── ROUTER ────────────────────────────────────────────────────────────────

  if (screen === "intro") return (
    <div ref={containerRef}>
      <IntroPage
        onStart={handleStartOver}
        onContinue={savedSession ? handleContinue : undefined}
        savedStep={savedSession?.step}
        savedTotal={TOTAL}
        savedScreen={savedSession?.screen}
      />
    </div>
  );


  if (screen === "q") return (
    <div ref={containerRef}>
      <QuizPage
        step={step}
        profile={profile}
        setProfile={setProfile}
        ans={ans}
        info={info}
        setInfo={setInfo}
        q={q}
        dobErr={dobErr}
        canAdvanceProfile={canAdvanceProfile}
        handleDOB={handleDOB}
        pickSingle={pickSingle}
        toggleMulti={toggleMulti}
        advanceMulti={advanceMulti}
        startCalc={startCalc}
        existingLeadId={crmLeadId}
        goBack={() => setStep(s => s - 1)}
        onAdvanceProfile={() => {
          // Only create a new CRM lead if we don't already have one for this user
          if (!crmLeadId) {
            createLeadFromProfile({
              firstName: info.name,
              phone: profile.phone,
              dob: profile.dob,
              gender: profile.gender,
            }).then(d => { if (d?.leadId) setCrmLeadId(d.leadId); }).catch(() => {});
          }
          setStep(1);
        }}
        onLimitChecked={(left) => setAttemptsLeft(left)}
        pct={pct}
        total={TOTAL}
      />
    </div>
  );

  if (screen === "calc") return (
    <div ref={containerRef}>
      <CalcPage calcIdx={calcIdx} calcMsgs={calcMsgs} calcPct={calcPct} pct={pct} total={TOTAL} />
    </div>
  );

  if (screen === "results" && res) return (
    <div ref={containerRef}>
      <ResultsPage
        res={res}
        ans={ans}
        info={info}
        profile={profile}
        selectedPhase={selectedPhase}
        secExpanded={secExpanded}
        setSecExpanded={setSecExpanded}
        showSticky={showSticky}
        bodyVisible={bodyVisible}
        pricingRef={pricingRef}
        onSelectPhase={trackSelectedPhase}
        onViewDetail={k => { setDetailKey(k); setScreen("phase_detail"); }}
        attemptsLeft={attemptsLeft}
        onRetry={handleRetry}
        pct={pct}
        total={TOTAL}
        crmLeadId={crmLeadId}
      />
    </div>
  );

  if (screen === "phase_detail" && detailKey) return (
    <div ref={containerRef}>
      <PhaseDetailPage
        detailKey={detailKey}
        ans={ans}
        info={info}
        profile={profile}
        res={res}
        onBack={backToResults}
        onSelectPhase={trackSelectedPhase}
        attemptsLeft={attemptsLeft}
        onRetry={handleRetry}
        pct={pct}
        total={TOTAL}
      />
    </div>
  );

  if (screen === "order" && selectedPhase) return (
    <div ref={containerRef}>
      <OrderPage
        phase={selectedPhase}
        info={info}
        onBack={backToResults}
      />
    </div>
  );

  if (screen === "payment_success" && paidPhase) return (
    <div ref={containerRef}>
      <PaymentSuccessPage paidPhase={paidPhase} />
    </div>
  );

  return null;
}
