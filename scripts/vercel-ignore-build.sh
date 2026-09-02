#!/usr/bin/env bash
# Vercel → Settings → Git → "Ignored Build Step": bash scripts/vercel-ignore-build.sh
# Exit 0 = Build überspringen, Exit 1 = bauen.
# Reine Inhalts-Commits (Tina Cloud schreibt content/ und public/uploads/) brauchen keinen Build:
# Inhalte kommen zur Laufzeit per ISR aus Tina Cloud, Bilder von assets.tina.io.
if git diff --quiet HEAD^ HEAD -- . ':(exclude)content/' ':(exclude)public/uploads/'; then
  echo "Nur Inhalte geändert – Build übersprungen."
  exit 0
fi
echo "Code geändert – Build läuft."
exit 1
