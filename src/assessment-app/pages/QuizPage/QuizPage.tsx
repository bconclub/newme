import { useState, useEffect, useRef } from "react";
import { GRN, INK, INK2, INK3, GOLD, FONT_HEADING, FONT_BODY, FONT_BUTTON } from "../../constants/theme";
import { Header } from "../../components/Header/Header";
import { TOTAL } from "../../data/questions";
import { checkAssessmentLimit, verifyEmail } from "../../services/assessmentService";
import { createPreQuizLead, checkLeadByEmail, deleteLeadById } from "../../services/crmService";
import { PhoneInput } from "../../components/PhoneInput/PhoneInput";

export type QuizPageProps = {
  step: number;
  profile: any;
  setProfile: (p: any) => void;
  ans: any;
  info: any;
  setInfo: (i: any) => void;
  q: any;
  dobErr: string;
  canAdvanceProfile: () => boolean;
  handleDOB: (v: string) => void;
  pickSingle: (v: string) => void;
  toggleMulti: (v: string) => void;
  advanceMulti: () => void;
  startCalc: (leadId: string | null) => void;
  existingLeadId: string | null;
  goBack: () => void;
  onAdvanceProfile: () => void;
  onLimitChecked: (attemptsLeft: number) => void;
  pct: number;
  total: number;
};

/* ── Shared label style (reused across all sub-steps) ── */
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 11, color: GRN, fontWeight: 700,
  marginBottom: 8, letterSpacing: ".06em", textTransform: "uppercase",
  fontFamily: FONT_BUTTON,
};

export function QuizPage({
  step, profile, setProfile, ans, info, setInfo,
  q, dobErr, canAdvanceProfile, handleDOB, pickSingle, toggleMulti,
  advanceMulti, startCalc, existingLeadId, goBack, onAdvanceProfile, onLimitChecked, pct, total,
}: QuizPageProps) {
  const isProfile = step === 0;
  const isDetails = step === TOTAL + 1;
  const qId = q?.id ?? "";
  const isMulti = q?.type === "m";
  const sel = isMulti ? (ans[qId] || []) : ans[qId];
  const canNext = isMulti ? (ans[q?.id] || []).length > 0 : true;

  const [limitChecking,    setLimitChecking]    = useState(false);
  const [limitBlocked,     setLimitBlocked]     = useState(false);
  const [enrolledBlocked,  setEnrolledBlocked]  = useState(false);
  const [attemptsUsed,     setAttemptsUsed]     = useState(0);
  const [emailVerifying,   setEmailVerifying]   = useState(false);
  const [emailDomainValid, setEmailDomainValid] = useState<boolean | null>(null);
  const [emailInvalidReason, setEmailInvalidReason] = useState<string>("");
  const [foundCrmLead,     setFoundCrmLead]     = useState<{ id: string; status: string } | null>(null);
  const [transitioning,    setTransitioning]    = useState(false);
  const debounceRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handlePickSingle(v: string) {
    setTransitioning(true);
    if (transitionRef.current) clearTimeout(transitionRef.current);
    transitionRef.current = setTimeout(() => setTransitioning(false), 500);
    pickSingle(v);
  }

  useEffect(() => {
    setEnrolledBlocked(false);
    setFoundCrmLead(null);
    const syntaxOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email || "");
    if (!syntaxOk) { setEmailDomainValid(null); return; }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setEmailVerifying(true);
      try {
        const [{ valid, reason }, crmLead] = await Promise.all([
          verifyEmail(info.email),
          checkLeadByEmail(info.email),
        ]);
        if (crmLead?.status === "Converted") {
          setEnrolledBlocked(true);
          setEmailDomainValid(null);
          return;
        }
        if (crmLead) setFoundCrmLead(crmLead);
        setEmailDomainValid(valid);
        setEmailInvalidReason(reason || "");
      } catch {
        setEmailDomainValid(null);
        setEmailInvalidReason("");
      } finally {
        setEmailVerifying(false);
      }
    }, 700);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [info.email]);

  function canAdvanceProfileFull() {
    return info.name?.trim().length > 0 && info.last?.trim().length > 0 && canAdvanceProfile();
  }

  async function handleDetailsSubmit() {
    setLimitChecking(true);
    try {
      const { allowed, attemptsUsed: used, attemptsLeft: left } = await checkAssessmentLimit(info.email);
      if (!allowed) {
        setAttemptsUsed(used);
        setLimitBlocked(true);
        return;
      }
      let leadId: string | null = existingLeadId ?? null;
      if (foundCrmLead) {
        if (existingLeadId && existingLeadId !== foundCrmLead.id) deleteLeadById(existingLeadId);
        leadId = foundCrmLead.id;
      } else if (!leadId) {
        try {
          const r = await createPreQuizLead(info.name, info.last, info.email);
          leadId = r.leadId ?? null;
        } catch {}
      }
      onLimitChecked(Math.max(0, left - 1));
      startCalc(leadId);
    } catch {
      startCalc(null);
    } finally {
      setLimitChecking(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", fontFamily: FONT_BODY }}>
      <Header step={step} total={total} pct={pct} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 60px)", padding: "32px 24px" }}>

        {/* ── PROFILE STEP ── */}
        {isProfile && (
          <div key="profile" className="fu" style={{ width: "100%", maxWidth: 500 }}>
            <p style={{ fontSize: 11, color: GRN, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 10, fontFamily: FONT_BUTTON }}>Before we begin</p>
            <h2 style={{ fontSize: "clamp(22px,3.5vw,30px)", fontWeight: 600, lineHeight: 1.2, marginBottom: 6, color: INK, letterSpacing: "-0.015em", fontFamily: FONT_HEADING }}>A couple of quick things</h2>
            <p style={{ fontSize: 14, color: INK3, marginBottom: 28, fontFamily: FONT_BODY }}>We use these to make sure your clinical pathway recommendation is specific to you.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>First name</label>
                  <input className="inp" placeholder="First name" type="text" name="given-name" autoComplete="given-name" value={info.name || ""} onChange={e => setInfo((p: any) => ({ ...p, name: e.target.value }))} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Last name</label>
                  <input className="inp" placeholder="Last name" type="text" name="family-name" autoComplete="family-name" value={info.last || ""} onChange={e => setInfo((p: any) => ({ ...p, last: e.target.value }))} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Date of birth</label>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="bday"
                  placeholder="DD/MM/YYYY"
                  value={profile.dob || ""}
                  onChange={e => handleDOB(e.target.value)}
                  className="inp"
                  maxLength={10}
                />
                {dobErr && <p style={{ fontSize: 12, color: "#ff7b6b", marginTop: 6, fontFamily: FONT_BODY }}>{dobErr}</p>}
              </div>
              <div>
                <label style={labelStyle}>Gender</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[{ v: "female", l: "Female" }, { v: "male", l: "Male" }, { v: "prefer_not", l: "Prefer not to say" }].map(o => (
                    <button key={o.v} className={`opt${profile.gender === o.v ? " s" : ""}`} onClick={() => setProfile((p: any) => ({ ...p, gender: o.v }))}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${profile.gender === o.v ? GOLD : "rgba(255,255,255,0.25)"}`, background: profile.gender === o.v ? "rgba(254,242,114,0.18)" : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {profile.gender === o.v && <div style={{ width: 8, height: 8, borderRadius: "50%", background: GOLD }} />}
                      </div>{o.l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={labelStyle}>Whatsapp number</label>
                {/* Country picker auto-defaults to the user's timezone-inferred
                    country (no permission prompt, no API call). They can swap
                    it via the dropdown. Combined value lands in profile.phone
                    as "+CC LOCALNUMBER" so the backend contract stays the
                    same — no API changes needed. */}
                <PhoneInput
                  value={profile.phone || ""}
                  onChange={v => setProfile((p: any) => ({ ...p, phone: v }))}
                  placeholder="9876543210"
                />
                <p style={{ fontSize: 11, color: INK3, marginTop: 6, fontFamily: FONT_BODY }}>
                  We auto-pick a country code from your location — tap the flag if it&rsquo;s wrong.
                </p>
              </div>
            </div>
            <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 14 }}>
              <button className="btng" disabled={!canAdvanceProfileFull()} onClick={onAdvanceProfile} style={{ fontFamily: FONT_BUTTON }}>Continue →</button>
              <p style={{ fontSize: 11, color: INK3, fontFamily: FONT_BODY }}>Always private. Never shared.</p>
            </div>
          </div>
        )}

        {/* ── QUIZ QUESTIONS ── */}
        {!isProfile && !isDetails && q && (
          <div key={step} className="fu" style={{ width: "100%", maxWidth: 540 }}>
            <p style={{ fontSize: 11, color: GRN, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 10, fontFamily: FONT_BUTTON }}>{q.hl}</p>
            <h2 style={{ fontSize: "clamp(20px,3.5vw,28px)", fontWeight: 600, lineHeight: 1.25, marginBottom: q.sub ? 8 : 22, color: INK, letterSpacing: "-0.015em", fontFamily: FONT_HEADING }}>{q.q}</h2>
            {q.sub && <p style={{ fontSize: 13, color: INK3, marginBottom: 18, fontFamily: FONT_BODY }}>{q.sub}</p>}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, pointerEvents: transitioning ? "none" : "auto" }}>
              {q.opts.map((o: any) => {
                const isSel = isMulti ? (sel || []).includes(o.v) : sel === o.v;
                return (
                  <button key={o.v} className={`opt${isSel ? " s" : ""}`} onClick={() => isMulti ? toggleMulti(o.v) : handlePickSingle(o.v)}>
                    <div style={{ width: 18, height: 18, borderRadius: isMulti ? "4px" : "50%", border: `2px solid ${isSel ? GOLD : "rgba(255,255,255,0.25)"}`, background: isSel ? "rgba(254,242,114,0.18)" : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .15s" }}>
                      {isSel && <div style={{ width: 8, height: 8, borderRadius: isMulti ? 0 : "50%", background: GOLD }} />}
                    </div>{o.l}
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop: 20, display: "flex", gap: 10, alignItems: "center" }}>
              <button className="btnout" onClick={goBack}>← Back</button>
              {isMulti && <button className="btng" disabled={!canNext} onClick={advanceMulti} style={{ fontFamily: FONT_BUTTON }}>Continue →</button>}
            </div>
          </div>
        )}

        {/* ── DETAILS STEP ── */}
        {isDetails && (() => {
          const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email);
          const canSubmit = emailOk && !limitChecking && !emailVerifying && emailDomainValid !== false;
          const showEmailErr = info.email?.length > 0 && !emailOk;
          const showDomainErr = emailOk && emailDomainValid === false;

          if (enrolledBlocked) {
            return (
              <div key="enrolled" className="fu" style={{ width: "100%", maxWidth: 440, textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(98,150,117,0.2)", border: "1.5px solid rgba(98,150,117,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 20px" }}>✅</div>
                <h2 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 700, color: INK, marginBottom: 10, letterSpacing: "-0.02em", fontFamily: FONT_HEADING }}>Already enrolled!</h2>
                <p style={{ fontSize: 14, color: INK2, lineHeight: 1.7, marginBottom: 8, fontFamily: FONT_BODY }}>Payment has already been completed with <strong>{info.email}</strong>.</p>
                <p style={{ fontSize: 14, color: INK3, lineHeight: 1.65, marginBottom: 28, fontFamily: FONT_BODY }}>Your program is active. Contact us if you need help accessing your account.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <a href="mailto:hello@newme.com" style={{ display: "block", background: GOLD, color: "#013E37", fontWeight: 600, padding: "14px 28px", borderRadius: 50, fontSize: 15, textDecoration: "none", fontFamily: FONT_BUTTON }}>
                    Contact us at hello@newme.com
                  </a>
                  <button className="btnout" onClick={() => { setEnrolledBlocked(false); setInfo((p: any) => ({ ...p, email: "" })); }} style={{ width: "100%", fontFamily: FONT_BUTTON }}>
                    Try with a different email
                  </button>
                </div>
              </div>
            );
          }

          if (limitBlocked) {
            return (
              <div key="blocked" className="fu" style={{ width: "100%", maxWidth: 440, textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,107,94,0.15)", border: "1.5px solid rgba(255,107,94,0.35)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 20px" }}>🚫</div>
                <h2 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 700, color: INK, marginBottom: 10, letterSpacing: "-0.02em", fontFamily: FONT_HEADING }}>Assessment limit reached</h2>
                <p style={{ fontSize: 14, color: INK2, lineHeight: 1.7, marginBottom: 8, fontFamily: FONT_BODY }}>You've completed this assessment <strong>{attemptsUsed} of 2</strong> times with <strong>{info.email}</strong>.</p>
                <p style={{ fontSize: 14, color: INK3, lineHeight: 1.65, marginBottom: 28, fontFamily: FONT_BODY }}>Please reach out and we'll help you find the right pathway.</p>
                <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28 }}>
                  {[1, 2].map(n => (
                    <div key={n} style={{ width: 36, height: 36, borderRadius: "50%", background: n <= attemptsUsed ? GOLD : "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: n <= attemptsUsed ? "#013E37" : INK3 }}>{n}</div>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <a href="mailto:hello@newme.com" style={{ display: "block", background: GOLD, color: "#013E37", fontWeight: 600, padding: "14px 28px", borderRadius: 50, fontSize: 15, textDecoration: "none", fontFamily: FONT_BUTTON }}>
                    Contact us at hello@newme.com
                  </a>
                  <button className="btnout" onClick={() => { setLimitBlocked(false); setInfo((p: any) => ({ ...p, email: "" })); }} style={{ width: "100%", fontFamily: FONT_BUTTON }}>
                    Try with a different email
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div key="details" className="fu" style={{ width: "100%", maxWidth: 440 }}>
              <p style={{ fontSize: 11, color: GRN, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 10, fontFamily: FONT_BUTTON }}>Almost there</p>
              <h2 style={{ fontSize: "clamp(22px,4vw,32px)", fontWeight: 600, lineHeight: 1.15, marginBottom: 10, color: INK, letterSpacing: "-0.02em", fontFamily: FONT_HEADING }}>Where should we send your results?</h2>
              <p style={{ color: INK3, fontSize: 14, lineHeight: 1.65, marginBottom: 24, fontFamily: FONT_BODY }}>Your results are private. We will never share your information.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
                <div>
                  <div style={{ position: "relative" }}>
                    <input
                      className="inp"
                      placeholder="Email address"
                      type="email"
                      value={info.email || ""}
                      onChange={e => setInfo((p: any) => ({ ...p, email: e.target.value }))}
                      style={{
                        borderColor: showDomainErr || showEmailErr ? "rgba(255,100,80,0.7)" : emailDomainValid === true ? "rgba(98,150,117,0.7)" : undefined,
                        paddingRight: emailOk ? 38 : undefined,
                      }}
                    />
                    {emailOk && (
                      <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 15, lineHeight: 1 }}>
                        {emailVerifying
                          ? <span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: GOLD, borderRadius: "50%", animation: "spin .7s linear infinite", verticalAlign: "middle" }} />
                          : emailDomainValid === true  ? <span style={{ color: GRN }}>✓</span>
                          : emailDomainValid === false ? <span style={{ color: "#ff7b6b" }}>✗</span>
                          : null}
                      </span>
                    )}
                  </div>
                  {showEmailErr  && <p style={{ fontSize: 12, color: "#ff7b6b", marginTop: 5, fontFamily: FONT_BODY }}>Please enter a valid email address.</p>}
                  {showDomainErr && (
                    <p style={{ fontSize: 12, color: "#ff7b6b", marginTop: 5, fontFamily: FONT_BODY }}>
                      {emailInvalidReason === "disposable_email"
                        ? "Disposable or temporary email addresses are not accepted. Please use your real email."
                        : "This email address doesn't appear to exist. Please double-check and try again."}
                    </p>
                  )}
                </div>
              </div>
              <button className="btng" disabled={!canSubmit} onClick={handleDetailsSubmit} style={{ width: "100%", fontSize: 15, padding: "16px", fontFamily: FONT_BUTTON }}>
                {limitChecking ? "Checking…" : "See my clinical pathway →"}
              </button>
              <p style={{ fontSize: 11, color: INK3, textAlign: "center", marginTop: 12, fontFamily: FONT_BODY }}>No spam · Unsubscribe anytime</p>
            </div>
          );
        })()}

      </div>
    </div>
  );
}
