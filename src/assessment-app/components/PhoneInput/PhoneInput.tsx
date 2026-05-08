import { useState, useRef, useEffect, useMemo } from "react";
import { GOLD, INK, INK3, FONT_BODY } from "../../constants/theme";

/* ─── Country list ────────────────────────────────────────────────────────
   Curated set covering NewME's primary markets (India, US, UK, AU, GCC,
   SE Asia) plus all other ITU dialing plans. Flag is rendered as the
   regional-indicator emoji which works on every modern OS without an
   image asset. To add a country, append a row — order doesn't matter
   except for the first three, which are pinned to the top of the list.
*/
type Country = { code: string; dial: string; name: string; flag: string };

const PINNED: Country[] = [
  { code: "IN", dial: "+91",  name: "India",          flag: "🇮🇳" },
  { code: "US", dial: "+1",   name: "United States",  flag: "🇺🇸" },
  { code: "GB", dial: "+44",  name: "United Kingdom", flag: "🇬🇧" },
];

const REST: Country[] = [
  { code: "AE", dial: "+971", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "AF", dial: "+93",  name: "Afghanistan",          flag: "🇦🇫" },
  { code: "AR", dial: "+54",  name: "Argentina",            flag: "🇦🇷" },
  { code: "AT", dial: "+43",  name: "Austria",              flag: "🇦🇹" },
  { code: "AU", dial: "+61",  name: "Australia",            flag: "🇦🇺" },
  { code: "BD", dial: "+880", name: "Bangladesh",           flag: "🇧🇩" },
  { code: "BE", dial: "+32",  name: "Belgium",              flag: "🇧🇪" },
  { code: "BH", dial: "+973", name: "Bahrain",              flag: "🇧🇭" },
  { code: "BR", dial: "+55",  name: "Brazil",               flag: "🇧🇷" },
  { code: "CA", dial: "+1",   name: "Canada",               flag: "🇨🇦" },
  { code: "CH", dial: "+41",  name: "Switzerland",          flag: "🇨🇭" },
  { code: "CL", dial: "+56",  name: "Chile",                flag: "🇨🇱" },
  { code: "CN", dial: "+86",  name: "China",                flag: "🇨🇳" },
  { code: "CO", dial: "+57",  name: "Colombia",             flag: "🇨🇴" },
  { code: "CZ", dial: "+420", name: "Czech Republic",       flag: "🇨🇿" },
  { code: "DE", dial: "+49",  name: "Germany",              flag: "🇩🇪" },
  { code: "DK", dial: "+45",  name: "Denmark",              flag: "🇩🇰" },
  { code: "EG", dial: "+20",  name: "Egypt",                flag: "🇪🇬" },
  { code: "ES", dial: "+34",  name: "Spain",                flag: "🇪🇸" },
  { code: "FI", dial: "+358", name: "Finland",              flag: "🇫🇮" },
  { code: "FR", dial: "+33",  name: "France",               flag: "🇫🇷" },
  { code: "GR", dial: "+30",  name: "Greece",               flag: "🇬🇷" },
  { code: "HK", dial: "+852", name: "Hong Kong",            flag: "🇭🇰" },
  { code: "ID", dial: "+62",  name: "Indonesia",            flag: "🇮🇩" },
  { code: "IE", dial: "+353", name: "Ireland",              flag: "🇮🇪" },
  { code: "IL", dial: "+972", name: "Israel",               flag: "🇮🇱" },
  { code: "IT", dial: "+39",  name: "Italy",                flag: "🇮🇹" },
  { code: "JP", dial: "+81",  name: "Japan",                flag: "🇯🇵" },
  { code: "KE", dial: "+254", name: "Kenya",                flag: "🇰🇪" },
  { code: "KR", dial: "+82",  name: "South Korea",          flag: "🇰🇷" },
  { code: "KW", dial: "+965", name: "Kuwait",               flag: "🇰🇼" },
  { code: "LK", dial: "+94",  name: "Sri Lanka",            flag: "🇱🇰" },
  { code: "MX", dial: "+52",  name: "Mexico",               flag: "🇲🇽" },
  { code: "MY", dial: "+60",  name: "Malaysia",             flag: "🇲🇾" },
  { code: "NG", dial: "+234", name: "Nigeria",              flag: "🇳🇬" },
  { code: "NL", dial: "+31",  name: "Netherlands",          flag: "🇳🇱" },
  { code: "NO", dial: "+47",  name: "Norway",               flag: "🇳🇴" },
  { code: "NP", dial: "+977", name: "Nepal",                flag: "🇳🇵" },
  { code: "NZ", dial: "+64",  name: "New Zealand",          flag: "🇳🇿" },
  { code: "OM", dial: "+968", name: "Oman",                 flag: "🇴🇲" },
  { code: "PH", dial: "+63",  name: "Philippines",          flag: "🇵🇭" },
  { code: "PK", dial: "+92",  name: "Pakistan",             flag: "🇵🇰" },
  { code: "PL", dial: "+48",  name: "Poland",               flag: "🇵🇱" },
  { code: "PT", dial: "+351", name: "Portugal",             flag: "🇵🇹" },
  { code: "QA", dial: "+974", name: "Qatar",                flag: "🇶🇦" },
  { code: "RO", dial: "+40",  name: "Romania",              flag: "🇷🇴" },
  { code: "RU", dial: "+7",   name: "Russia",               flag: "🇷🇺" },
  { code: "SA", dial: "+966", name: "Saudi Arabia",         flag: "🇸🇦" },
  { code: "SE", dial: "+46",  name: "Sweden",               flag: "🇸🇪" },
  { code: "SG", dial: "+65",  name: "Singapore",            flag: "🇸🇬" },
  { code: "TH", dial: "+66",  name: "Thailand",             flag: "🇹🇭" },
  { code: "TR", dial: "+90",  name: "Turkey",               flag: "🇹🇷" },
  { code: "TW", dial: "+886", name: "Taiwan",               flag: "🇹🇼" },
  { code: "TZ", dial: "+255", name: "Tanzania",             flag: "🇹🇿" },
  { code: "UA", dial: "+380", name: "Ukraine",              flag: "🇺🇦" },
  { code: "VN", dial: "+84",  name: "Vietnam",              flag: "🇻🇳" },
  { code: "ZA", dial: "+27",  name: "South Africa",         flag: "🇿🇦" },
];

const COUNTRIES: Country[] = [...PINNED, ...REST.sort((a, b) => a.name.localeCompare(b.name))];

/* ─── Timezone → country detection ─────────────────────────────────────────
   Uses `Intl.DateTimeFormat().resolvedOptions().timeZone` — no API call, no
   geolocation prompt, works offline. Right ~95% of the time; user can change
   it via the dropdown if the guess is wrong. Fallback chain: TZ map → IN. */
const TZ_TO_COUNTRY: Record<string, string> = {
  "Asia/Kolkata": "IN", "Asia/Calcutta": "IN",
  "America/New_York": "US", "America/Chicago": "US", "America/Denver": "US",
  "America/Los_Angeles": "US", "America/Phoenix": "US", "America/Anchorage": "US",
  "America/Detroit": "US", "America/Indiana/Indianapolis": "US",
  "Europe/London": "GB", "Europe/Belfast": "GB",
  "Australia/Sydney": "AU", "Australia/Melbourne": "AU", "Australia/Brisbane": "AU",
  "Australia/Perth": "AU", "Australia/Adelaide": "AU",
  "America/Toronto": "CA", "America/Vancouver": "CA", "America/Montreal": "CA",
  "Asia/Dubai": "AE",
  "Asia/Singapore": "SG",
  "Asia/Hong_Kong": "HK",
  "Asia/Tokyo": "JP",
  "Asia/Shanghai": "CN", "Asia/Beijing": "CN",
  "Asia/Karachi": "PK",
  "Asia/Dhaka": "BD",
  "Asia/Kathmandu": "NP",
  "Asia/Colombo": "LK",
  "Asia/Bangkok": "TH",
  "Asia/Jakarta": "ID",
  "Asia/Manila": "PH",
  "Asia/Kuala_Lumpur": "MY",
  "Asia/Ho_Chi_Minh": "VN",
  "Asia/Seoul": "KR",
  "Asia/Riyadh": "SA",
  "Asia/Qatar": "QA",
  "Asia/Kuwait": "KW",
  "Asia/Bahrain": "BH",
  "Asia/Muscat": "OM",
  "Asia/Jerusalem": "IL",
  "Africa/Cairo": "EG",
  "Africa/Lagos": "NG",
  "Africa/Nairobi": "KE",
  "Africa/Johannesburg": "ZA",
  "Europe/Paris": "FR",
  "Europe/Berlin": "DE",
  "Europe/Madrid": "ES",
  "Europe/Rome": "IT",
  "Europe/Amsterdam": "NL",
  "Europe/Brussels": "BE",
  "Europe/Zurich": "CH",
  "Europe/Vienna": "AT",
  "Europe/Stockholm": "SE",
  "Europe/Oslo": "NO",
  "Europe/Helsinki": "FI",
  "Europe/Copenhagen": "DK",
  "Europe/Dublin": "IE",
  "Europe/Lisbon": "PT",
  "Europe/Athens": "GR",
  "Europe/Warsaw": "PL",
  "Europe/Prague": "CZ",
  "Europe/Bucharest": "RO",
  "Europe/Moscow": "RU",
  "Europe/Kiev": "UA", "Europe/Kyiv": "UA",
  "Europe/Istanbul": "TR",
  "America/Mexico_City": "MX",
  "America/Sao_Paulo": "BR",
  "America/Buenos_Aires": "AR", "America/Argentina/Buenos_Aires": "AR",
  "America/Santiago": "CL",
  "America/Bogota": "CO",
  "Pacific/Auckland": "NZ",
};

function detectCountry(): Country {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const code = TZ_TO_COUNTRY[tz];
    if (code) {
      const found = COUNTRIES.find(c => c.code === code);
      if (found) return found;
    }
  } catch {
    /* Intl not available — fall through */
  }
  return PINNED[0]; // India default
}

/* Parse an existing combined string back into { country, local }.
   Accepts "+91 9876543210", "+1 555 123 4567", "9876543210" (no code). */
function parsePhone(value: string): { country: Country; local: string } {
  const trimmed = (value || "").trim();
  if (!trimmed) return { country: detectCountry(), local: "" };

  // Try matching the longest prefix first (e.g. +971 before +97).
  const sortedByDialDesc = [...COUNTRIES].sort((a, b) => b.dial.length - a.dial.length);
  for (const c of sortedByDialDesc) {
    if (trimmed.startsWith(c.dial)) {
      return { country: c, local: trimmed.slice(c.dial.length).replace(/\D/g, "") };
    }
  }
  return { country: detectCountry(), local: trimmed.replace(/\D/g, "") };
}

/* ─── Component ────────────────────────────────────────────────────────── */
export function PhoneInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (combined: string) => void;
  placeholder?: string;
}) {
  // Initialize from incoming value (so resuming a saved profile works).
  const initial = useMemo(() => parsePhone(value), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [country, setCountry] = useState<Country>(initial.country);
  const [local, setLocal] = useState<string>(initial.local);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

  // Push combined value upward whenever either piece changes.
  useEffect(() => {
    onChange(local ? `${country.dial} ${local}` : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, local]);

  // Close dropdown on outside click.
  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      {/* Combined trigger: country chip on the left, number input on the right.
          Visually one input thanks to a shared border + matched height. */}
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          background: "rgba(255,255,255,0.06)",
          border: "1.5px solid rgba(255,255,255,0.15)",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          aria-label="Select country code"
          style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "transparent", border: "none",
            padding: "0 10px 0 14px",
            color: INK, fontFamily: FONT_BODY, fontSize: 14,
            cursor: "pointer", whiteSpace: "nowrap",
            borderRight: "1.5px solid rgba(255,255,255,0.12)",
          }}
        >
          <span style={{ fontSize: 18, lineHeight: 1 }}>{country.flag}</span>
          <span style={{ fontWeight: 600 }}>{country.dial}</span>
          <span style={{ opacity: 0.7, fontSize: 10, marginLeft: 2 }}>▾</span>
        </button>
        <input
          type="tel"
          autoComplete="tel-national"
          inputMode="numeric"
          value={local}
          onChange={e => setLocal(e.target.value.replace(/[^\d\s-]/g, ""))}
          placeholder={placeholder || "9876543210"}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: INK,
            fontFamily: FONT_BODY,
            fontSize: 14,
            padding: "12px 14px",
            minWidth: 0,
          }}
        />
      </div>

      {/* Dropdown panel */}
      {open && (
        <div
          style={{
            position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
            zIndex: 50,
            background: "rgba(1,30,28,0.98)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 12,
            boxShadow: "0 20px 60px rgba(0,0,0,0.55)",
            overflow: "hidden",
            maxHeight: 280,
            display: "flex", flexDirection: "column",
          }}
        >
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search country or code…"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "none",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              outline: "none",
              padding: "10px 14px",
              color: INK,
              fontSize: 13,
              fontFamily: FONT_BODY,
            }}
          />
          <div style={{ overflowY: "auto", flex: 1 }}>
            {filtered.length === 0 ? (
              <p style={{ padding: 14, color: INK3, fontSize: 13, fontFamily: FONT_BODY }}>
                No matches.
              </p>
            ) : (
              filtered.map(c => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => { setCountry(c); setOpen(false); setQuery(""); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    width: "100%", textAlign: "left",
                    background: c.code === country.code ? "rgba(254,242,114,0.10)" : "transparent",
                    border: "none",
                    padding: "9px 14px",
                    color: INK,
                    fontFamily: FONT_BODY,
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"; }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      c.code === country.code ? "rgba(254,242,114,0.10)" : "transparent";
                  }}
                >
                  <span style={{ fontSize: 16 }}>{c.flag}</span>
                  <span style={{ flex: 1 }}>{c.name}</span>
                  <span style={{ color: INK3, fontWeight: 600 }}>{c.dial}</span>
                  {c.code === country.code && (
                    <span style={{ color: GOLD, fontSize: 14 }}>✓</span>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
