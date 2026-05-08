import { useState, useEffect, useRef } from "react";
import { saveCalendlyAppointment } from "../../services/crmService";
import { GRN, INK2, INK3, GOLD, FONT_BODY, FONT_BUTTON } from "../../constants/theme";
import { LogoMark } from "../Logo";

type MessageFrom = "bot" | "user";
interface Message { from: MessageFrom; text: string; }
type MenuStep = "about_menu" | "payments_menu" | "schedule_menu" | "coaching_menu" | "health_menu";
type Step = "welcome" | MenuStep | "answered" | "talk" | "book";

export interface ChatBotProps {
  userName: string;
  phaseName: string;
  pricingMain: string;
  pricingDay: string;
  pricingSub: string;
  bullets: string[];
  onStartNow: () => void;
  leadId?: string | null;
}

interface QAItem { label: string; answer: string[]; }
interface Category { step: MenuStep; label: string; items: QAItem[]; }

const CATEGORIES: Category[] = [
  {
    step: "about_menu", label: "About the Program",
    items: [
      { label: "What do I get?", answer: ["You get a personalized clinical pathway covering nutrition, fitness, and lifestyle, guided by a dedicated clinical health coach.", "Your plan is based on your health details, onboarding inputs, and ongoing guidance."] },
      { label: "Is it personalized?", answer: ["Yes. It is designed based on your health history, lifestyle, and goals.", "After you join, detailed inputs are collected and your plan is further personalized."] },
      { label: "What happens after I join?", answer: ["After enrollment, you'll complete a detailed onboarding form and share recent blood tests (if available).", "Your clinical health coach will then connect with you and begin your personalized plan."] },
    ],
  },
  {
    step: "payments_menu", label: "Payments & Pricing",
    items: [
      { label: "How does payment work?", answer: ["You can complete your enrollment directly here.", "Once payment is successful, you'll receive the next steps to begin."] },
      { label: "Are there any extra costs?", answer: ["The clinical pathway includes all core coaching and guidance.", "Additional sessions or services, if chosen, are available separately."] },
      { label: "Can I speak to someone before deciding?", answer: ["Yes, you can speak to a care advisor who will guide you based on your situation and help you decide the next step."] },
    ],
  },
  {
    step: "schedule_menu", label: "Schedule & Flexibility",
    items: [
      { label: "Will this fit my routine?", answer: ["Yes, the clinical pathway is designed to fit into your lifestyle.", "Your coach will guide you based on your routine to help you stay consistent."] },
      { label: "What if I travel or stay busy?", answer: ["The pathway is designed to work around travel and unpredictable schedules.", "Your coach will guide you on managing your routine and making better choices."] },
    ],
  },
  {
    step: "coaching_menu", label: "Coaching & Support",
    items: [
      { label: "How will I stay accountable?", answer: ["Your clinical health coach will track your progress, check in regularly, and guide you throughout.", "You'll have continuous support to stay consistent."] },
      { label: "How do I talk to my coach?", answer: ["You'll be connected with your clinical health coach via WhatsApp for regular check-ins and support.", "Communication includes chat and scheduled calls."] },
    ],
  },
  {
    step: "health_menu", label: "Health Conditions",
    items: [
      { label: "Is this right for my condition?", answer: ["Yes, it is designed based on your health history, lifestyle, and goals.", "Your plan is personalized further after onboarding."] },
      { label: "Can I join after surgery or injury?", answer: ["It's best to speak with a care advisor so they can understand your condition and guide you appropriately.", "They'll help adapt the plan for you."] },
      { label: "Can I join if pregnant or postpartum?", answer: ["This depends on your stage of pregnancy and overall condition.", "We recommend speaking to a care advisor to guide you on what's suitable."] },
    ],
  },
];

const WHATSAPP_NUMBER = "";
const CALENDLY_URL    = "https://calendly.com/d/ct35-rpb-xkg/dr-pal-s-newme";

function openWhatsApp(phaseName: string) {
  const msg = encodeURIComponent(`Hi, I'd like to know more about the ${phaseName} pathway.`);
  const url = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}` : `https://wa.me/?text=${msg}`;
  window.open(url, "_blank");
}

function openCalendly() {
  const url: string = CALENDLY_URL || "https://calendly.com";
  const cal = (window as any).Calendly;
  if (cal && CALENDLY_URL) cal.initPopupWidget({ url });
  else window.open(url, "_blank");
}

/* ── Chat bubbles ── */
function BotBubble({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-end", marginBottom: 8 }}>
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(98,150,117,0.2)", border: "1.5px solid rgba(98,150,117,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <LogoMark size={14} color={GRN} />
      </div>
      <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "16px 16px 16px 4px", padding: "10px 14px", fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.55, maxWidth: "80%", backdropFilter: "blur(8px)" }}>
        {text}
      </div>
    </div>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
      <div style={{ background: GOLD, color: "#013E37", borderRadius: "16px 16px 4px 16px", padding: "10px 14px", fontSize: 13, lineHeight: 1.55, maxWidth: "80%", fontWeight: 500 }}>
        {text}
      </div>
    </div>
  );
}

function CtaButton({ label, onClick, variant = "primary" }: { label: string; onClick: () => void; variant?: "primary" | "green" }) {
  const styles: Record<string, React.CSSProperties> = {
    primary: { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)", borderRadius: 50, padding: "8px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: FONT_BODY, transition: "all .15s", textAlign: "left" as const, width: "100%" },
    green:   { background: GOLD, border: "none", color: "#013E37", borderRadius: 50, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: FONT_BUTTON, width: "100%", marginTop: 4 },
  };
  return <button style={styles[variant]} onClick={onClick}>{label}</button>;
}

/* ── Main component ── */
export function ChatBot({ userName, phaseName, onStartNow, leadId }: ChatBotProps) {
  const [open,     setOpen]     = useState(false);
  const [pulse,    setPulse]    = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [step,     setStep]     = useState<Step>("welcome");
  const [prevMenu, setPrevMenu] = useState<MenuStep>("about_menu");
  const [typing,   setTyping]   = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onCalendlyEvent(e: MessageEvent) {
      if (e.data?.event === "calendly.event_scheduled") {
        const cal = (window as any).Calendly;
        if (cal?.closePopupWidget) cal.closePopupWidget();
        const eventUri   = e.data.payload?.event?.uri;
        const inviteeUri = e.data.payload?.invitee?.uri;
        if (leadId && eventUri && inviteeUri) saveCalendlyAppointment(leadId, eventUri, inviteeUri);
        setOpen(true);
        setMessages(prev => [
          ...prev,
          { from: "bot", text: "Your call has been booked! ✅ You'll receive a confirmation email shortly." },
          { from: "bot", text: "Our care advisor will call you at the scheduled time. In the meantime, feel free to go ahead and start your pathway." },
        ]);
        setStep("book");
      }
    }
    window.addEventListener("message", onCalendlyEvent);
    return () => window.removeEventListener("message", onCalendlyEvent);
  }, []);

  useEffect(() => {
    if (!(window as any).Calendly) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => { const t = setTimeout(() => setPulse(true), 3000); return () => clearTimeout(t); }, []);

  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout>;
    function resetTimer() {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => { setOpen(o => { if (!o) setPulse(false); return true; }); }, 60_000);
    }
    resetTimer();
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("touchstart", resetTimer);
    return () => { clearTimeout(idleTimer); window.removeEventListener("mousemove", resetTimer); window.removeEventListener("touchstart", resetTimer); };
  }, []);

  useEffect(() => {
    if (!open || messages.length > 0) return;
    addBotMessage(`Hi ${userName || "there"}! 👋 I'm Nova, your NewME clinical assistant. What would you like to know about your ${phaseName} pathway?`);
  }, [open]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  function addBotMessage(text: string, delay = 600) {
    setTyping(true);
    setTimeout(() => { setTyping(false); setMessages(prev => [...prev, { from: "bot", text }]); }, delay);
  }

  function handleCategory(cat: Category) {
    setMessages(prev => [...prev, { from: "user", text: cat.label }]);
    addBotMessage(`Here are some common questions about ${cat.label}:`);
    setStep(cat.step);
  }

  function handleQuestion(item: QAItem, fromMenu: MenuStep) {
    setPrevMenu(fromMenu);
    setMessages(prev => [...prev, { from: "user", text: item.label }]);
    item.answer.forEach((line, i) => { setTimeout(() => addBotMessage(line, 600), i * 900); });
    setStep("answered");
  }

  function handleAction(label: string, nextStep: "talk" | "book") {
    setMessages(prev => [...prev, { from: "user", text: label }]);
    setStep(nextStep);
    if (nextStep === "talk") { addBotMessage("I'll open WhatsApp for you — our care team typically replies within a few hours."); setTimeout(() => openWhatsApp(phaseName), 1200); }
    if (nextStep === "book") { addBotMessage("Opening our booking page — pick a time that works and a care advisor will call you."); setTimeout(() => openCalendly(), 1200); }
  }

  function reset() {
    setMessages([]);
    setStep("welcome");
    addBotMessage(`What else would you like to know about your ${phaseName} pathway?`);
  }

  const isMenuStep = (s: Step): s is MenuStep =>
    ["about_menu", "payments_menu", "schedule_menu", "coaching_menu", "health_menu"].includes(s);

  const currentMenuItems = isMenuStep(step) ? (CATEGORIES.find(c => c.step === step)?.items ?? []) : [];

  return (
    <>
      {/* Floating launcher — pill label on the left, circular icon on the right.
          The label only appears when the chat is closed; clicking either piece
          opens the panel. The whole stack pulses softly until the user has
          interacted so the prompt actually gets noticed. */}
      <div
        style={{
          position: "fixed", bottom: 88, right: 24, zIndex: 200,
          display: "flex", alignItems: "center", gap: 10,
          pointerEvents: "none", // children opt-in below
        }}
      >
        {/* "Have any questions?" pill — closed state only */}
        {!open && (
          <button
            type="button"
            onClick={() => { setOpen(true); setPulse(false); }}
            aria-label="Open chat — have any questions?"
            style={{
              pointerEvents: "auto",
              background: "#FEF272",
              color: "#013E37",
              border: "none",
              borderRadius: 999,
              padding: "10px 16px",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: FONT_BUTTON,
              boxShadow: "0 6px 20px rgba(0,0,0,0.28)",
              cursor: "pointer",
              whiteSpace: "nowrap",
              animation: pulse ? "chatLabelBob 2.4s ease-in-out infinite" : "none",
              transition: "transform .15s ease",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
          >
            Have any questions?
          </button>
        )}

        {/* Circular icon launcher */}
        <div
          onClick={() => { setOpen(o => !o); setPulse(false); }}
          role="button"
          aria-label={open ? "Close chat" : "Open chat"}
          style={{
            pointerEvents: "auto",
            position: "relative",
            width: 52, height: 52, borderRadius: "50%",
            background: open ? "#0E2827" : "#013E37",
            border: "1.5px solid rgba(255,255,255,0.2)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "background .2s, transform .2s",
            transform: open ? "scale(1.05)" : "scale(1)",
          }}
        >
          {pulse && !open && (
            <div style={{ position: "absolute", inset: -4, borderRadius: "50%", border: `2px solid ${GOLD}`, animation: "chatPulse 1.4s ease-out infinite" }} />
          )}
          {open ? (
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 20, lineHeight: 1 }}>✕</span>
          ) : (
            // Chat-bubble icon — universally legible as "chat with us"
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-6.5l-4.2 3.36a.6.6 0 0 1-.97-.47V16H6a2 2 0 0 1-2-2V5z"
                fill={GOLD}
              />
              <circle cx="9" cy="9.5" r="1.1" fill="#013E37" />
              <circle cx="12" cy="9.5" r="1.1" fill="#013E37" />
              <circle cx="15" cy="9.5" r="1.1" fill="#013E37" />
            </svg>
          )}
        </div>
      </div>

      {/* Chat window */}
      {open && (
        <div style={{
          position: "fixed", top: 16, bottom: 152, right: 24, zIndex: 199,
          width: 340, borderRadius: 20,
          background: "rgba(1,30,28,0.96)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          display: "flex", flexDirection: "column",
          overflow: "hidden",
          animation: "chatSlideUp .28s cubic-bezier(.22,1,.36,1)",
        }}>

          {/* Header */}
          <div style={{ background: "#013E37", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LogoMark size={18} color={GRN} />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#ffffff", lineHeight: 1 }}>Nova</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>NewME Clinical Assistant</p>
              </div>
            </div>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} title="Online" />
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "14px 12px", minHeight: 80 }}>
            {messages.map((m, i) =>
              m.from === "bot" ? <BotBubble key={i} text={m.text} /> : <UserBubble key={i} text={m.text} />
            )}
            {typing && (
              <div style={{ display: "flex", gap: 8, alignItems: "flex-end", marginBottom: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(98,150,117,0.2)", border: "1.5px solid rgba(98,150,117,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <LogoMark size={14} color={GRN} />
                </div>
                <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "16px 16px 16px 4px", padding: "10px 14px" }}>
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    {[0, 1, 2].map(j => <div key={j} style={{ width: 6, height: 6, borderRadius: "50%", background: GRN, animation: `typingDot .9s ${j * 0.18}s ease-in-out infinite` }} />)}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* CTAs */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "12px", background: "rgba(0,0,0,0.2)", overflowY: "auto", maxHeight: "min(280px, 42vh)", flexShrink: 0 }}>
            {step === "welcome" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {CATEGORIES.map(cat => <CtaButton key={cat.step} label={cat.label} onClick={() => handleCategory(cat)} />)}
                <CtaButton label="📅  Book a call" onClick={() => handleAction("Book a call", "book")} />
                <CtaButton label="Start now →" variant="green" onClick={() => { onStartNow(); setOpen(false); }} />
              </div>
            )}
            {isMenuStep(step) && (
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {currentMenuItems.map(item => <CtaButton key={item.label} label={item.label} onClick={() => handleQuestion(item, step)} />)}
                <button onClick={reset} style={{ background: "none", border: "none", fontSize: 12, color: INK3, cursor: "pointer", marginTop: 2, fontFamily: FONT_BODY, textAlign: "left" }}>← Back to topics</button>
              </div>
            )}
            {step === "answered" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <CtaButton label="Ask another question" onClick={() => setStep(prevMenu)} />
                <CtaButton label="📅  Book a call" onClick={() => handleAction("Book a call", "book")} />
                <CtaButton label="Start now →" variant="green" onClick={() => { onStartNow(); setOpen(false); }} />
                <button onClick={reset} style={{ background: "none", border: "none", fontSize: 12, color: INK3, cursor: "pointer", marginTop: 2, fontFamily: FONT_BODY, textAlign: "left" }}>← Back to topics</button>
              </div>
            )}
            {(step === "talk" || step === "book") && (
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <CtaButton label="Ask a question" onClick={reset} />
                <CtaButton label="Start now →" variant="green" onClick={() => { onStartNow(); setOpen(false); }} />
              </div>
            )}
            <p style={{ fontSize: 10, color: INK3, textAlign: "center", marginTop: 8 }}>Powered by NewME · hello@newme.com</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes chatPulse { 0% { opacity:.8; transform:scale(1); } 100% { opacity:0; transform:scale(1.6); } }
        @keyframes chatSlideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes typingDot { 0%, 100% { transform:translateY(0); opacity:.4; } 50% { transform:translateY(-4px); opacity:1; } }
        @keyframes chatLabelBob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
      `}</style>
    </>
  );
}
