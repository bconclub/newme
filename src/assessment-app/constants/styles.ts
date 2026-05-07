import { GRN, GRN_L, GRN_M, WHITE, INK, INK2 } from "./theme";

export const globalCss = [
  "@keyframes fu{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}",
  "@keyframes spin{to{transform:rotate(360deg)}}",
  "@keyframes countPop{0%{transform:scale(.92)}60%{transform:scale(1.04)}100%{transform:scale(1)}}",
  "@keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}",
  ".fu{animation:fu .42s cubic-bezier(.22,1,.36,1) both}",
  `.opt{width:100%;padding:15px 20px;border-radius:12px;border:1.5px solid #e2e8df;background:${WHITE};color:${INK2};font-size:15px;text-align:left;cursor:pointer;transition:all .17s;display:flex;align-items:center;gap:12px;font-family:inherit;line-height:1.4;box-sizing:border-box;-webkit-tap-highlight-color:transparent;outline:none;-webkit-appearance:none;appearance:none}`,
  `.opt.s{border-color:${GRN};background:${GRN_L};color:${INK}}`,
  `.btng{background:${GRN};color:${WHITE};font-weight:700;border:none;padding:15px 32px;border-radius:50px;cursor:pointer;font-size:15px;transition:all .2s;font-family:inherit;letter-spacing:.01em}`,
  `.btng:disabled{opacity:.35;cursor:not-allowed;transform:none;box-shadow:none}`,
  `.btnout{background:transparent;border:1.5px solid ${GRN_M};color:${INK2};padding:11px 22px;border-radius:50px;cursor:pointer;font-size:13px;transition:all .18s;font-family:inherit}`,
  `.inp{background:${WHITE};border:1.5px solid #e2e8df;color:${INK};padding:14px 18px;border-radius:10px;font-size:15px;outline:none;width:100%;font-family:inherit;box-sizing:border-box;transition:border-color .2s}`,
  `.inp:focus{border-color:${GRN}}`,
  `.ccard{background:${WHITE};border:1px solid #e8ede6;border-radius:14px;padding:18px 16px;display:flex;flex-direction:column;gap:6px;transition:box-shadow .2s}`,
  `.ccard:hover{box-shadow:0 4px 20px rgba(45,74,40,.10)}`,
  `.sec{padding:28px 0;border-top:1px solid #e8ede6}`,
  `.sticky-cta{position:fixed;bottom:0;left:0;right:0;background:${WHITE};border-top:1px solid #e8ede6;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;gap:14px;z-index:100;animation:slideUp .4s cubic-bezier(.22,1,.36,1)}`,
  `.toggle-btn{padding:8px 16px;border-radius:50px;border:1.5px solid ${GRN_M};background:transparent;color:${INK2};font-size:13px;cursor:pointer;font-family:inherit;transition:all .17s;-webkit-tap-highlight-color:transparent}`,
  `.toggle-btn.active{background:${GRN};color:${WHITE};border-color:${GRN}}`,
].join("");
