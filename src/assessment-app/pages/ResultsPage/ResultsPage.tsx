import React, { useState } from "react";
import { GRN, INK, INK2, INK3, GOLD, FONT_HEADING, FONT_BODY, FONT_BUTTON } from "../../constants/theme";
import { Header } from "../../components/Header/Header";
import { SectionLabel, Dot } from "../../components/SectionLabel";
import { PW, PRICING, PATHWAY_SEVERITY, FRAMING_BODY, BRIDGE_SENTENCE, ASSURANCE, ACTIONABLE_POINTS } from "../../data/pathways";
import { ChatBot } from "../../components/ChatBot/ChatBot";
import { GI_BILLING } from "../../constants/zohoCheckout";
import EyebrowPill from "../../../components/option1/EyebrowPill";

export type ResultsPageProps = {
  res: any;
  ans: any;
  info: any;
  profile: any;
  selectedPhase: string | null;
  secExpanded: boolean;
  setSecExpanded: (v: boolean) => void;
  showSticky: boolean;
  bodyVisible: boolean;
  pricingRef: React.RefObject<HTMLDivElement | null>;
  onSelectPhase: (p: string) => void;
  onViewDetail: (k: string) => void;
  attemptsLeft: number | null;
  onRetry: () => void;
  pct: number;
  total: number;
  crmLeadId?: string | null;
};

/* Shared dark glass card style */
const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 16,
  padding: "20px 22px",
  backdropFilter: "blur(12px)",
};

export function ResultsPage({
  res, info,
  showSticky, bodyVisible, pricingRef,
  onSelectPhase,
  pct, total, crmLeadId,
}: ResultsPageProps) {
  const pw = PW[res.pathway];
  const sev = PATHWAY_SEVERITY[res.pathway];
  const name = info.name || "You";
  const isGIPathway = res.pathway === "GI_Core" || res.pathway === "GI_Advanced";
  const actionables = isGIPathway ? ACTIONABLE_POINTS.gi : ACTIONABLE_POINTS.metabolic;

  const giBilling = GI_BILLING[res.pathway] ?? null;
  const [billing, setBilling] = useState<"monthly" | "upfront">("upfront");
  const effectivePhase = giBilling
    ? (billing === "monthly" ? giBilling.monthly.key : giBilling.upfront.key)
    : res.pathway;
  const priceMain = giBilling
    ? (billing === "monthly" ? giBilling.monthly.label : giBilling.upfront.label)
    : (PRICING[res.pathway]?.main ?? "");
  const priceDay = giBilling
    ? (billing === "monthly" ? giBilling.monthly.dayLabel : giBilling.upfront.dayLabel)
    : (PRICING[res.pathway]?.day ?? "");

  return (
    <div style={{ minHeight: "100vh", fontFamily: FONT_BODY }}>
      <Header showProgress={false} pct={pct} total={total} />

      {/* Sticky CTA — CSS class handles dark backdrop */}
      {showSticky && (
        <div className="sticky-cta">
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: INK, lineHeight: 1, fontFamily: FONT_HEADING }}>{pw.badge.split(" · ")[0]}</p>
            <p style={{ fontSize: 12, color: INK3, marginTop: 3 }}>{priceMain} · {priceDay}</p>
          </div>
          <button onClick={() => onSelectPhase(effectivePhase)} className="btng" style={{ padding: "12px 24px", fontSize: 14, fontFamily: FONT_BUTTON }}>
            Start now →
          </button>
        </div>
      )}

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "36px 20px 100px" }}>
        <div className="fu">

          {/* Clinical Report — uses the site's EyebrowPill */}
          <div style={{ marginBottom: 20 }}>
            <EyebrowPill>{name}'s Clinical Report</EyebrowPill>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(26px,5vw,42px)", fontWeight: 600, lineHeight: 1.15,
            marginBottom: 0, letterSpacing: "-0.025em", color: INK,
            fontFamily: FONT_HEADING,
          }}>{pw.headline}</h1>

          {/* Body — fades in after mount */}
          <div style={{ opacity: bodyVisible ? 1 : 0, transform: bodyVisible ? "translateY(0)" : "translateY(10px)", transition: "opacity .5s ease, transform .5s ease" }}>
            <div style={{ height: 20 }} />

            {/* Severity statement */}
            <p style={{
              fontSize: 14, color: sev.color, fontWeight: 600,
              marginBottom: 16,
              background: sev.bg, border: `1px solid ${sev.border}`,
              borderRadius: 10, padding: "10px 14px",
              fontFamily: FONT_BODY,
            }}>{pw.severityStatement}</p>

            {/* Framing body */}
            <p style={{ fontSize: 14, color: INK2, lineHeight: 1.75, marginBottom: 16 }}>{FRAMING_BODY}</p>

            {/* Assurance */}
            <p style={{ fontSize: 14, color: INK2, lineHeight: 1.75, marginBottom: 20 }}>{ASSURANCE[res.pathway]}</p>

            {/* Actionable points — promoted card. Gold left rail + stronger
                glass + larger label so it reads as the section the user is
                actually meant to act on, not just another tinted block. */}
            <div style={{
              position: "relative",
              background: "linear-gradient(180deg, rgba(254,242,114,0.07) 0%, rgba(98,150,117,0.16) 100%)",
              border: "1.5px solid rgba(254,242,114,0.40)",
              borderLeft: "4px solid #FEF272",
              borderRadius: 16,
              padding: "22px 24px 22px 26px",
              marginBottom: 28,
              backdropFilter: "blur(14px)",
              boxShadow: "0 14px 36px -18px rgba(254,242,114,0.16)",
            }}>
              <p style={{
                fontSize: 12, color: GOLD, fontWeight: 700,
                marginBottom: 16, fontFamily: FONT_BUTTON,
                letterSpacing: ".10em", textTransform: "uppercase",
              }}>
                Your action plan
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {actionables.map((a: string, i: number) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{
                      flexShrink: 0,
                      width: 22, height: 22, borderRadius: "50%",
                      background: "rgba(254,242,114,0.18)",
                      border: "1px solid rgba(254,242,114,0.45)",
                      color: GOLD, fontSize: 11, fontWeight: 700,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: FONT_BUTTON, lineHeight: 1,
                    }}>{i + 1}</span>
                    <span style={{ fontSize: 14, color: INK, lineHeight: 1.55, paddingTop: 2 }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* GI diagnosis callout — neutral glass with stronger left rail
                so it's instantly distinguishable from the green action card. */}
            {isGIPathway && res.gi_dx_labels?.length > 0 && (
              <div style={{
                ...glassCard,
                marginBottom: 28,
                borderLeft: "3px solid #FEF272",
                paddingLeft: 22,
              }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 6 }}>Your gut conditions are the focus of this clinical pathway.</p>
                <p style={{ fontSize: 13, color: INK2, lineHeight: 1.6, marginBottom: res.meta_dx_labels?.length > 0 ? 10 : 0 }}>
                  <strong>{res.gi_dx_labels.join(", ")}</strong>. Your clinical team is briefed at onboarding and your protocol is built around these from day one.
                </p>
                {res.meta_dx_labels?.length > 0 && (
                  <p style={{ fontSize: 13, color: INK2, lineHeight: 1.6, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 10 }}>
                    <strong>{res.meta_dx_labels.join(", ")}</strong> {res.meta_dx_labels.length > 1 ? "have" : "has"} also been noted. Your clinical team factors this into your plan. Nothing is treated in isolation.
                  </p>
                )}
              </div>
            )}

            {/* Metabolic diagnosis callout — same neutral-glass-with-rail pattern */}
            {!isGIPathway && res.dx_labels_metabolic?.length > 0 && (
              <div style={{
                ...glassCard,
                marginBottom: 28,
                borderLeft: "3px solid #FEF272",
                paddingLeft: 22,
              }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 6 }}>Your diagnoses are part of this clinical pathway from day one.</p>
                <p style={{ fontSize: 13, color: INK2, lineHeight: 1.6 }}>
                  <strong>{res.dx_labels_metabolic.join(", ")}</strong>. Your Clinical Health Coach and medical team are briefed at onboarding.
                </p>
              </div>
            )}

            {/* Bridge sentence — full-width divider treatment so it acts as
                the visual cue that we're transitioning to the CTA section. */}
            <div style={{
              borderTop: "1px solid rgba(255,255,255,0.12)",
              borderBottom: "1px solid rgba(255,255,255,0.12)",
              padding: "18px 0",
              marginBottom: 24,
            }}>
              <p style={{ fontSize: 14, color: INK, fontWeight: 600, fontFamily: FONT_BODY, textAlign: "center" }}>{BRIDGE_SENTENCE}</p>
            </div>

            {/* GI billing toggle */}
            {isGIPathway && giBilling && (
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }} ref={pricingRef}>
                <button className={`toggle-btn${billing === "upfront" ? " active" : ""}`} onClick={() => setBilling("upfront")} style={{ fontFamily: FONT_BUTTON }}>
                  3 months · Save ${giBilling.upfront.savings}
                </button>
                <button className={`toggle-btn${billing === "monthly" ? " active" : ""}`} onClick={() => setBilling("monthly")} style={{ fontFamily: FONT_BUTTON }}>
                  Monthly
                </button>
              </div>
            )}

            {/* Pricing card — strongest visual weight on the page since
                it's the primary action. Yellow border, stronger glass,
                bigger price, more padding. */}
            <div
              style={{
                border: "2px solid rgba(254,242,114,0.45)",
                borderRadius: 18,
                padding: "22px 24px",
                background: "linear-gradient(180deg, rgba(254,242,114,0.06) 0%, rgba(98,150,117,0.10) 100%)",
                marginBottom: 28,
                backdropFilter: "blur(14px)",
                boxShadow: "0 16px 40px -20px rgba(254,242,114,0.18)",
              }}
              ref={!isGIPathway ? pricingRef : undefined}
            >
              {/* Eyebrow pill removed — pw.badge text is already echoed by
                  the page heading and the order-summary card downstream, so
                  showing it here just produced a redundant "GI ADVANCED · 1
                  MONTH CLINICAL PATHWAY" line above the price. */}
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 28, fontWeight: 700, color: GOLD, fontFamily: FONT_HEADING, letterSpacing: "-0.02em", lineHeight: 1 }}>{priceMain}</span>
                  <span style={{ fontSize: 13, color: INK3, marginLeft: 4 }}>{priceDay}</span>
                </div>
                <button
                  onClick={() => onSelectPhase(effectivePhase)}
                  className="btng"
                  style={{ padding: "12px 26px", fontSize: 14, fontFamily: FONT_BUTTON }}
                >
                  Start now →
                </button>
              </div>
            </div>

            {/* What's included */}
            <div style={{ ...glassCard, marginBottom: 0 }}>
              <SectionLabel>What's included in your clinical pathway</SectionLabel>
              {pw.bullets.map((b: string, i: number) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: i < pw.bullets.length - 1 ? 12 : 0 }}>
                  <Dot /><span style={{ fontSize: 14, color: INK2, lineHeight: 1.55 }}>{b}</span>
                </div>
              ))}
            </div>

            {/* After your pathway */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20, marginTop: 20 }}>
              <p style={{ fontSize: 11, color: INK3, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 10, fontFamily: FONT_BUTTON }}>After your pathway</p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {[
                  { name: "NewME 360",      desc: "Ongoing coaching, habit reviews and relapse prevention." },
                  { name: "NewME Movement", desc: "Fitness programming, live sessions and community." },
                ].map((c, i) => (
                  <div key={i} style={{ flex: 1, minWidth: 180 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: INK2, marginBottom: 2, fontFamily: FONT_BODY }}>{c.name}</p>
                    <p style={{ fontSize: 12, color: INK3, lineHeight: 1.5 }}>{c.desc}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 11, color: INK3, marginTop: 10, fontStyle: "italic" }}>Available when you're ready. Not part of this purchase.</p>
            </div>

          </div>
        </div>
      </div>

      <ChatBot
        userName={info.name || ""}
        phaseName={pw.badge.split(" · ")[0]}
        pricingMain={PRICING[res.pathway]?.main ?? ""}
        pricingDay={PRICING[res.pathway]?.day ?? ""}
        pricingSub={PRICING[res.pathway]?.sub ?? ""}
        bullets={pw.bullets}
        onStartNow={() => onSelectPhase(res.pathway)}
        leadId={crmLeadId}
      />
    </div>
  );
}
