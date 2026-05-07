/**
 * Assessment app — global injected CSS
 * Dark atmospheric design matching the NewME site system:
 *  • Pine-teal base (set in page.tsx wrapper)
 *  • Glass option cards, white text
 *  • Yellow (#FEF272) primary CTA — matches site header CTA
 *  • Transparent/glass inputs with white borders
 */

export const globalCss = [
  "@keyframes fu{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}",
  "@keyframes spin{to{transform:rotate(360deg)}}",
  "@keyframes countPop{0%{transform:scale(.92)}60%{transform:scale(1.04)}100%{transform:scale(1)}}",
  "@keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}",
  ".fu{animation:fu .42s cubic-bezier(.22,1,.36,1) both}",

  // Option button — glass dark card
  `.opt{width:100%;padding:15px 20px;border-radius:12px;border:1.5px solid rgba(255,255,255,0.14);background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.85);font-size:15px;text-align:left;cursor:pointer;transition:all .17s;display:flex;align-items:center;gap:12px;font-family:var(--font-urbanist,'Urbanist',sans-serif);line-height:1.4;box-sizing:border-box;-webkit-tap-highlight-color:transparent;outline:none;-webkit-appearance:none;appearance:none;backdrop-filter:blur(8px)}`,
  // Option button — selected state (green glass)
  `.opt:hover{border-color:rgba(255,255,255,0.25);background:rgba(255,255,255,0.08)}`,
  `.opt.s{border-color:rgba(98,150,117,0.7);background:rgba(98,150,117,0.18);color:#ffffff}`,

  // Primary CTA — yellow, matches site "Start My Assessment" button
  `.btng{background:#FEF272;color:#013E37;font-weight:600;border:none;padding:15px 32px;border-radius:50px;cursor:pointer;font-size:15px;transition:all .2s;font-family:var(--font-poppins,'Poppins',sans-serif);letter-spacing:.01em}`,
  `.btng:hover:not(:disabled){background:#fff8b8;box-shadow:0 4px 20px rgba(254,242,114,0.35)}`,
  `.btng:disabled{opacity:.35;cursor:not-allowed;transform:none;box-shadow:none}`,

  // Secondary outlined button
  `.btnout{background:transparent;border:1.5px solid rgba(255,255,255,0.25);color:rgba(255,255,255,0.7);padding:11px 22px;border-radius:50px;cursor:pointer;font-size:13px;transition:all .18s;font-family:var(--font-urbanist,'Urbanist',sans-serif)}`,
  `.btnout:hover{border-color:rgba(255,255,255,0.5);color:#ffffff}`,

  // Input — dark glass
  `.inp{background:rgba(255,255,255,0.07);border:1.5px solid rgba(255,255,255,0.18);color:#ffffff;padding:14px 18px;border-radius:10px;font-size:15px;outline:none;width:100%;font-family:var(--font-urbanist,'Urbanist',sans-serif);box-sizing:border-box;transition:border-color .2s}`,
  `.inp::placeholder{color:rgba(255,255,255,0.35)}`,
  `.inp:focus{border-color:rgba(98,150,117,0.8)}`,
  `.inp option{background:#013E37;color:#ffffff}`,

  // Card — dark glass
  `.ccard{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:14px;padding:18px 16px;display:flex;flex-direction:column;gap:6px;transition:all .2s;backdrop-filter:blur(10px)}`,
  `.ccard:hover{background:rgba(255,255,255,0.10);border-color:rgba(255,255,255,0.2)}`,

  // Section divider
  `.sec{padding:28px 0;border-top:1px solid rgba(255,255,255,0.1)}`,

  // Sticky CTA bar — dark pine
  `.sticky-cta{position:fixed;bottom:0;left:0;right:0;background:rgba(1,62,55,0.92);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,0.1);padding:14px 20px;display:flex;align-items:center;justify-content:space-between;gap:14px;z-index:100;animation:slideUp .4s cubic-bezier(.22,1,.36,1)}`,

  // Toggle buttons
  `.toggle-btn{padding:8px 16px;border-radius:50px;border:1.5px solid rgba(255,255,255,0.2);background:transparent;color:rgba(255,255,255,0.6);font-size:13px;cursor:pointer;font-family:var(--font-urbanist,'Urbanist',sans-serif);transition:all .17s;-webkit-tap-highlight-color:transparent}`,
  `.toggle-btn:hover{border-color:rgba(255,255,255,0.4);color:#ffffff}`,
  `.toggle-btn.active{background:#FEF272;color:#013E37;border-color:#FEF272;font-weight:600}`,
].join("");
