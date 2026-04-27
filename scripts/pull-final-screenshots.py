#!/usr/bin/env python
"""Pull rendered screenshots of the 8 Final Design pages from Figma.

Strategy:
  - Initial cooldown of 240s to fully reset rate limits.
  - Per-page: try scale 0.5 once, then 0.4, then 0.3 (smaller = less likely
    to hit Render timeout for tall frames).
  - 25s gap between successful pulls (Figma allows ~6 image renders/min).
  - On 429: backoff 75s, then 120s, then 180s.
  - Skip pages already saved with non-trivial size.
"""
import json, os, time, urllib.request, urllib.error, sys

TOKEN = os.environ.get("FIGMA_PAT")
if not TOKEN:
    sys.stderr.write("FIGMA_PAT env var not set. Export your Figma personal access token first.\n")
    sys.exit(1)
FILE = os.environ.get("FIGMA_FILE_KEY", "CrcIFtZCH8PDLyKHcQrRFZ")
PAGES = [
    ("home",           "2571:17617"),
    ("how-it-works",   "2659:277"),
    ("pathways",       "2738:43"),
    ("research-lab",   "2787:65"),
    ("virtual-clinic", "2796:2668"),
    ("metabolic",      "2748:2687"),
    ("gi",             "2776:5611"),
    ("continuity",     "2781:8314"),
]
OUT = os.path.join(os.path.dirname(__file__), "..", "figma", "final")
os.makedirs(OUT, exist_ok=True)

def req(url, headers=None):
    r = urllib.request.Request(url, headers=headers or {})
    try:
        with urllib.request.urlopen(r, timeout=180) as resp:
            return resp.status, resp.read()
    except urllib.error.HTTPError as e:
        return e.code, e.read()

def fetch_one(name, node):
    out = os.path.join(OUT, f"{name}.png")
    if os.path.exists(out) and os.path.getsize(out) > 5000:
        print(f"[skip] {name}", flush=True)
        return True
    backoffs = [75, 120, 180, 240]
    scales = ["0.5", "0.4", "0.3", "0.25"]
    bi = 0
    si = 0
    for attempt in range(1, 9):
        scale = scales[min(si, len(scales)-1)]
        url = f"https://api.figma.com/v1/images/{FILE}?ids={node}&format=png&scale={scale}"
        status, body = req(url, {"X-Figma-Token": TOKEN})
        try:
            data = json.loads(body)
        except Exception:
            print(f"[{name}] non-json status={status} body={body[:120]!r}", flush=True)
            data = {}
        err = data.get("err") or ""
        if err:
            print(f"[{name}] try {attempt} scale={scale}: {err}", flush=True)
            wait = backoffs[min(bi, len(backoffs)-1)]
            bi += 1
            if "Render timeout" in err:
                si += 1  # try smaller scale next time
            time.sleep(wait)
            continue
        img_url = list(data.get("images", {}).values() or [None])[0]
        if not img_url:
            print(f"[{name}] try {attempt}: empty image url", flush=True)
            time.sleep(30)
            continue
        s2, body2 = req(img_url)
        if s2 == 200 and body2 and len(body2) > 5000:
            with open(out, "wb") as f:
                f.write(body2)
            print(f"[{name}] saved {len(body2):,} bytes (scale={scale})", flush=True)
            return True
        print(f"[{name}] download failed status={s2} size={len(body2) if body2 else 0}", flush=True)
        time.sleep(30)
    print(f"[{name}] FAILED after retries", flush=True)
    return False

# Initial cooldown
INITIAL = int(os.environ.get("INITIAL_COOLDOWN", "240"))
print(f"cooling down {INITIAL}s before first request...", flush=True)
time.sleep(INITIAL)

for name, node in PAGES:
    ok = fetch_one(name, node)
    # gap between successful pulls so we never burn the bucket
    time.sleep(28 if ok else 5)
print("DONE", flush=True)
