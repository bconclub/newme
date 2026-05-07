import { useState, useEffect, useRef } from "react";
import { GRN, GRN_L, INK, INK2, INK3, baseStyle } from "../../constants/theme";
import { Header } from "../../components/Header/Header";
import { TOTAL } from "../../data/questions";
import { checkAssessmentLimit, verifyEmail } from "../../services/assessmentService";
import { createPreQuizLead, checkLeadByEmail, deleteLeadById } from "../../services/crmService";

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

  // Debounced email check — MX validation + CRM enrollment status
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

  // profile step: requires first name + last name
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
        // An older lead exists for this email — delete the fresh profile lead and reuse the old one
        if (existingLeadId && existingLeadId !== foundCrmLead.id) {
          deleteLeadById(existingLeadId); // fire-and-forget
        }
        leadId = foundCrmLead.id;
      } else if (!leadId) {
        try {
          const r = await createPreQuizLead(info.name, info.last, info.email);
          leadId = r.leadId ?? null;
        } catch { /* fail silently */ }
      }

      onLimitChecked(Math.max(0, left - 1));
      startCalc(leadId);
    } catch {
      startCalc(null); // fail open
    } finally {
      setLimitChecking(false);
    }
  }

  return (
    <div style={{ ...baseStyle }}>
      <Header step={step} total={total} pct={pct} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 72px)", padding: "32px 24px" }}>

        {/* ── PROFILE STEP: first name + DOB + gender + phone ── */}
        {isProfile && (
          <div key="profile" className="fu" style={{ width: "100%", maxWidth: 500 }}>
            <p style={{ fontSize: 12, color: GRN, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 10 }}>Before we begin</p>
            <h2 style={{ fontSize: "clamp(22px,3.5vw,28px)", fontWeight: 700, lineHeight: 1.25, marginBottom: 6, color: INK, letterSpacing: "-.015em" }}>A couple of quick things</h2>
            <p style={{ fontSize: 14, color: INK3, marginBottom: 28 }}>We use these to make sure your clinical pathway recommendation is specific to you, not a generic result.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: 12, color: INK2, fontWeight: 600, marginBottom: 7, letterSpacing: ".04em", textTransform: "uppercase" }}>First name</label>
                  <input className="inp" placeholder="First name" type="text" name="given-name" autoComplete="given-name" value={info.name || ""} onChange={e => setInfo((p: any) => ({ ...p, name: e.target.value }))} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: 12, color: INK2, fontWeight: 600, marginBottom: 7, letterSpacing: ".04em", textTransform: "uppercase" }}>Last name</label>
                  <input className="inp" placeholder="Last name" type="text" name="family-name" autoComplete="family-name" value={info.last || ""} onChange={e => setInfo((p: any) => ({ ...p, last: e.target.value }))} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, color: INK2, fontWeight: 600, marginBottom: 7, letterSpacing: ".04em", textTransform: "uppercase" }}>Date of birth</label>
                <input type="date" value={profile.dob} onChange={e => handleDOB(e.target.value)} className="inp" />
                {dobErr && <p style={{ fontSize: 12, color: "#c0392b", marginTop: 6 }}>{dobErr}</p>}
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, color: INK2, fontWeight: 600, marginBottom: 8, letterSpacing: ".04em", textTransform: "uppercase" }}>Gender</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[{ v: "female", l: "Female" }, { v: "male", l: "Male" }, { v: "prefer_not", l: "Prefer not to say" }].map(o => (
                    <button key={o.v} className={`opt${profile.gender === o.v ? " s" : ""}`} onClick={() => setProfile((p: any) => ({ ...p, gender: o.v }))}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${profile.gender === o.v ? GRN : "#c8d6c4"}`, background: profile.gender === o.v ? GRN_L : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {profile.gender === o.v && <div style={{ width: 8, height: 8, borderRadius: "50%", background: GRN }} />}
                      </div>{o.l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, color: INK2, fontWeight: 600, marginBottom: 7, letterSpacing: ".04em", textTransform: "uppercase" }}>Whatsapp number</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <select value={profile.dialCode || ""} onChange={e => setProfile((p: any) => ({ ...p, dialCode: e.target.value }))} className="inp" style={{ width: "auto", flexShrink: 0, paddingLeft: 12, paddingRight: 12, cursor: "pointer", color: profile.dialCode ? "inherit" : INK3 }}>
                    <option value="" disabled>Code</option>
                    {[
                      { c: "🇺🇸", d: "+1", n: "US" }, { c: "🇬🇧", d: "+44", n: "UK" }, { c: "🇦🇺", d: "+61", n: "AU" },
                      { c: "🇨🇦", d: "+1", n: "CA" }, { c: "🇮🇳", d: "+91", n: "IN" }, { c: "🇦🇪", d: "+971", n: "AE" },
                      { c: "🇸🇬", d: "+65", n: "SG" }, { c: "🇳🇿", d: "+64", n: "NZ" }, { c: "🇿🇦", d: "+27", n: "ZA" },
                      { c: "🇩🇪", d: "+49", n: "DE" }, { c: "🇫🇷", d: "+33", n: "FR" }, { c: "🇵🇰", d: "+92", n: "PK" },
                      { c: "🇧🇩", d: "+880", n: "BD" }, { c: "🇳🇬", d: "+234", n: "NG" }, { c: "🇰🇪", d: "+254", n: "KE" },
                    ].map(o => (
                      <option key={o.n} value={o.d}>{o.c} {o.d}</option>
                    ))}
                  </select>
                  <input type="tel" value={profile.phone || ""} onChange={e => setProfile((p: any) => ({ ...p, phone: e.target.value }))} className="inp" placeholder="Your Whatsapp number" style={{ flex: 1 }} />
                </div>
              </div>
            </div>
            <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 14 }}>
              <button className="btng" disabled={!canAdvanceProfileFull()} onClick={onAdvanceProfile}>Continue →</button>
              <p style={{ fontSize: 11, color: INK3 }}>Always private. Never shared.</p>
            </div>
          </div>
        )}

        {/* ── QUIZ QUESTIONS ── */}
        {!isProfile && !isDetails && q && (
          <div key={step} className="fu" style={{ width: "100%", maxWidth: 540 }}>
            <p style={{ fontSize: 12, color: GRN, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 10 }}>{q.hl}</p>
            <h2 style={{ fontSize: "clamp(20px,3.5vw,26px)", fontWeight: 700, lineHeight: 1.3, marginBottom: q.sub ? 8 : 22, color: INK, letterSpacing: "-.015em" }}>{q.q}</h2>
            {q.sub && <p style={{ fontSize: 13, color: INK3, marginBottom: 18 }}>{q.sub}</p>}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, pointerEvents: transitioning ? "none" : "auto" }}>
              {q.opts.map((o: any) => {
                const isSel = isMulti ? (sel || []).includes(o.v) : sel === o.v;
                return (
                  <button key={o.v} className={`opt${isSel ? " s" : ""}`} onClick={() => isMulti ? toggleMulti(o.v) : handlePickSingle(o.v)}>
                    <div style={{ width: 18, height: 18, borderRadius: isMulti ? "4px" : "50%", border: `2px solid ${isSel ? GRN : "#c8d6c4"}`, background: isSel ? GRN_L : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .15s" }}>
                      {isSel && <div style={{ width: 8, height: 8, borderRadius: "50%", background: GRN }} />}
                    </div>{o.l}
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop: 20, display: "flex", gap: 10, alignItems: "center" }}>
              <button className="btnout" onClick={goBack}>← Back</button>
              {isMulti && <button className="btng" disabled={!canNext} onClick={advanceMulti}>Continue →</button>}
            </div>
          </div>
        )}

        {/* ── DETAILS STEP: last name + email ── */}
        {isDetails && (() => {
          const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email);
          const canSubmit = emailOk && !limitChecking && !emailVerifying && emailDomainValid !== false;
          const showEmailErr = info.email?.length > 0 && !emailOk;
          const showDomainErr = emailOk && emailDomainValid === false;

          if (enrolledBlocked) {
            return (
              <div key="enrolled" className="fu" style={{ width: "100%", maxWidth: 440, textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#e6f4ea", border: `1.5px solid #a8d5b5`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 20px" }}>✅</div>
                <h2 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, color: INK, marginBottom: 10, letterSpacing: "-.02em" }}>Already enrolled!</h2>
                <p style={{ fontSize: 14, color: INK2, lineHeight: 1.7, marginBottom: 8 }}>
                  Payment has already been completed with <strong>{info.email}</strong>.
                </p>
                <p style={{ fontSize: 14, color: INK3, lineHeight: 1.65, marginBottom: 28 }}>
                  Your program is active. Contact us if you need help accessing your account.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <a href="mailto:hello@newme.com" style={{ display: "block", background: GRN, color: "white", fontWeight: 700, padding: "14px 28px", borderRadius: 50, fontSize: 15, textDecoration: "none" }}>
                    Contact us at hello@newme.com
                  </a>
                  <button className="btnout" onClick={() => { setEnrolledBlocked(false); setInfo((p: any) => ({ ...p, email: "" })); }} style={{ width: "100%" }}>
                    Try with a different email
                  </button>
                </div>
              </div>
            );
          }

          if (limitBlocked) {
            return (
              <div key="blocked" className="fu" style={{ width: "100%", maxWidth: 440, textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fdecea", border: "1.5px solid #f5c6c2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 20px" }}>🚫</div>
                <h2 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, color: INK, marginBottom: 10, letterSpacing: "-.02em" }}>Assessment limit reached</h2>
                <p style={{ fontSize: 14, color: INK2, lineHeight: 1.7, marginBottom: 8 }}>
                  You've completed this assessment <strong>{attemptsUsed} of 2</strong> times with <strong>{info.email}</strong>.
                </p>
                <p style={{ fontSize: 14, color: INK3, lineHeight: 1.65, marginBottom: 28 }}>
                  Please reach out and we'll help you find the right pathway.
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28 }}>
                  {[1, 2].map(n => (
                    <div key={n} style={{ width: 36, height: 36, borderRadius: "50%", background: n <= attemptsUsed ? GRN : GRN_L, border: `2px solid ${GRN}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: n <= attemptsUsed ? "white" : INK3 }}>{n}</div>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <a href="mailto:hello@newme.com" style={{ display: "block", background: GRN, color: "white", fontWeight: 700, padding: "14px 28px", borderRadius: 50, fontSize: 15, textDecoration: "none" }}>
                    Contact us at hello@newme.com
                  </a>
                  <button className="btnout" onClick={() => { setLimitBlocked(false); setInfo((p: any) => ({ ...p, email: "" })); }} style={{ width: "100%" }}>
                    Try with a different email
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div key="details" className="fu" style={{ width: "100%", maxWidth: 440 }}>
              <p style={{ fontSize: 12, color: GRN, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 10 }}>Almost there</p>
              <h2 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, lineHeight: 1.2, marginBottom: 10, color: INK, letterSpacing: "-.02em" }}>Where should we send your results?</h2>
              <p style={{ color: INK3, fontSize: 14, lineHeight: 1.65, marginBottom: 24 }}>Your results are private. We will never share your information.</p>
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
                        borderColor: showDomainErr || showEmailErr ? "#c0392b" : emailDomainValid === true ? GRN : undefined,
                        paddingRight: emailOk ? 38 : undefined,
                      }}
                    />
                    {/* Verification status icon */}
                    {emailOk && (
                      <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 15, lineHeight: 1 }}>
                        {emailVerifying
                          ? <span style={{ display: "inline-block", width: 14, height: 14, border: `2px solid ${GRN}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin .7s linear infinite", verticalAlign: "middle" }} />
                          : emailDomainValid === true  ? <span style={{ color: GRN }}>✓</span>
                          : emailDomainValid === false ? <span style={{ color: "#c0392b" }}>✗</span>
                          : null}
                      </span>
                    )}
                  </div>
                  {showEmailErr  && <p style={{ fontSize: 12, color: "#c0392b", marginTop: 5 }}>Please enter a valid email address.</p>}
                  {showDomainErr && (
                    <p style={{ fontSize: 12, color: "#c0392b", marginTop: 5 }}>
                      {emailInvalidReason === "disposable_email"
                        ? "Disposable or temporary email addresses are not accepted. Please use your real email."
                        : "This email address doesn't appear to exist. Please double-check and try again."}
                    </p>
                  )}
                </div>
              </div>
              <button className="btng" disabled={!canSubmit} onClick={handleDetailsSubmit} style={{ width: "100%", fontSize: 15, padding: "16px" }}>
                {limitChecking ? "Checking…" : "See my clinical pathway →"}
              </button>
              <p style={{ fontSize: 11, color: INK3, textAlign: "center", marginTop: 12 }}>No spam · Unsubscribe anytime</p>
            </div>
          );
        })()}

      </div>
    </div>
  );
}
