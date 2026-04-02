# 🚀 Rocket Landing Quest

An interactive kids game that teaches AI/ML concepts through a rocket and space theme. Kids train an AI to land a rocket, dodge space debris, and fly to Mars!

**Play it:** https://blairis1.github.io/rocket-landing-quest/

## Quests

| Quest | AI Concept | What Kids Do |
|---|---|---|
| 🔧 Build the Rocket | Data requirements | Pick the right parts — too few or too many breaks things |
| 👁️ Train Landing AI | Labeling training data | Label landing conditions as safe/dangerous across 5 categories |
| 🚀 Test Landing | Model evaluation | Watch AI attempt landings with confidence meters + feature reasoning |
| 🛰️ Dodge Space Junk | Collision avoidance | Override AI mistakes before debris hits — like real Starlink satellites |
| 🪐 Mission to Mars | Autonomous deployment | AI flies itself using training data, kid monitors from mission control |

## AI Concepts Taught

- **Training data → model accuracy**: More labeled data = smarter AI
- **Bias detection**: Warning when training data is skewed toward one category
- **Confidence scores**: AI shows how sure it is (25%–90%) based on training
- **Feature reasoning**: AI shows which sensors it used to decide
- **Retrain loop**: If AI fails, go back and add more training data
- **Human-in-the-loop**: Even smart AI needs human oversight (collision avoidance)

## Features

- 🚀 **Blaze** — animated SVG rocket character with 5 moods (idle, happy, thinking, scared, celebrate)
- 🔊 Neural voice narration (Microsoft AnaNeural — kid-friendly)
- 🎵 Background music + sound effects on every interaction
- 🎉 Confetti on correct answers and quest completions
- 🧠 Training summary with per-category confidence bars + bias warning
- 🔄 Retrain loop when AI scores poorly
- ⏰ 12-minute session timer (cognitive load research)
- 🏆 Persistent progress via localStorage
- 🔧 Parts collection tracker (5 parts to build the rocket)
- 😅 Gentle failure — no harsh sounds or red X symbols

## Tech Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4
- Web Audio API (sfx + music)
- edge-tts (voice generation)
- Static export → GitHub Pages

## Run Locally

```bash
npm install
npm run dev
# Open http://localhost:3000/rocket-landing-quest
```

## Part of the AI Adventures Series

- [🐾 Animal Sorter Quest](https://github.com/blairIS1/animal-sorter-quest) — image classification
- [🛻 Robot Car Quest](https://github.com/blairIS1/robot-car-quest) — self-driving cars
- 🚀 Rocket Landing Quest — rocket AI + collision avoidance
