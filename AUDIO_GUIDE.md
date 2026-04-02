# Quick Reference: Adding Audio to New Text

## Pattern to Follow

Every piece of text in the UI should have a corresponding MP3 file and be clickable to play.

### 1. Add Text to Generator Script

Edit `generate_audio.py`:

```python
TEXTS = {
    # ... existing entries ...
    "new_key": "The text you want spoken",
}
```

### 2. Generate MP3

```bash
python3 generate_audio.py
```

### 3. Add to VOICE Object

Edit `app/quests/speak.ts`:

```typescript
export const VOICE = {
  // ... existing entries ...
  newKey: "new_key.mp3",
};
```

### 4. Use in Component

```tsx
import { speak, VOICE } from "./speak";

// For clickable text
<h1 onClick={() => speak(VOICE.newKey)} style={{cursor: "pointer"}}>
  Your Text Here
</h1>

// For hover (like quest buttons)
<button onMouseEnter={() => speak(VOICE.newKey)}>
  Your Text
</button>

// For automatic playback
useEffect(() => {
  speak(VOICE.newKey);
}, []);

// Chain multiple audio files
speak(VOICE.first)
  .then(() => speak(VOICE.second))
  .then(() => speak(VOICE.third));
```

## Current Coverage

✅ Main menu (title, subtitle, parts, quests)
✅ Quest 1: Build Rocket (all text)
⏳ Quest 2: Train Landing (needs component updates)
⏳ Quest 3: Test Landing (needs component updates)
⏳ Quest 4: Dodge Debris (needs component updates)
⏳ Quest 5: Mars Landing (needs component updates)

## Voice Settings

- Voice: Microsoft AnaNeural (en-US)
- Kid-friendly, clear pronunciation
- Same voice as all existing narration
- Consistent quality across all files
