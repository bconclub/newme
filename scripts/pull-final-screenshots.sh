#!/bin/bash
if [ -z "${FIGMA_PAT:-}" ]; then
  echo "FIGMA_PAT env var not set. Export your Figma personal access token first." >&2
  exit 1
fi
TOKEN="$FIGMA_PAT"
FILE="${FIGMA_FILE_KEY:-CrcIFtZCH8PDLyKHcQrRFZ}"
declare -A NODES=(
  [home]=2571:17617
  [how-it-works]=2659:277
  [pathways]=2738:43
  [metabolic]=2748:2687
  [gi]=2776:5611
  [continuity]=2781:8314
  [research-lab]=2787:65
  [virtual-clinic]=2796:2668
)
mkdir -p figma/final
for NAME in "${!NODES[@]}"; do
  ID="${NODES[$NAME]}"
  OUT="figma/final/${NAME}.png"
  if [ -f "$OUT" ] && [ -s "$OUT" ]; then echo "[skip] $NAME"; continue; fi
  for attempt in 1 2 3 4 5; do
    echo "[try $attempt] $NAME ($ID)"
    RESP=$(curl -s -H "X-Figma-Token: $TOKEN" "https://api.figma.com/v1/images/${FILE}?ids=${ID}&format=png&scale=0.5")
    if echo "$RESP" | grep -q '"err"'; then
      ERR=$(echo "$RESP" | python -c "import json,sys; print(json.load(sys.stdin).get('err',''))")
      echo "  err: $ERR — backing off 45s"
      sleep 45
      continue
    fi
    URL=$(echo "$RESP" | python -c "import json,sys; d=json.load(sys.stdin); v=list(d.get('images',{}).values()); print(v[0] if v and v[0] else '')")
    if [ -n "$URL" ]; then
      curl -s "$URL" -o "$OUT" && echo "  ✓ $NAME saved ($(stat -c %s "$OUT") bytes)"
      sleep 8
      break
    fi
    sleep 30
  done
done
echo "DONE"
