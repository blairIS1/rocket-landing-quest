#!/usr/bin/env python3
"""
Generate missing audio files for all UI text in the Rocket Landing Quest game.
Uses edge-tts with Microsoft AnaNeural voice (kid-friendly).
"""

import asyncio
import edge_tts
import os

# Voice: Microsoft AnaNeural (kid-friendly, same as existing files)
VOICE = "en-US-AnaNeural"
OUTPUT_DIR = "public/audio"

# All text that needs audio files
TEXTS = {
    # Quest 1: Build Rocket
    "q1_title": "Quest 1: Build the Rocket!",
    "q1_instruction": "Every rocket needs the right parts. Too few equals can't fly. Too many equals too heavy!",
    "q1_engines": "Engines",
    "q1_fins": "Fins", 
    "q1_fuel": "Fuel Tanks",
    "q1_perfect": "Perfect!",
    "q1_too_heavy": "Too heavy!",
    "q1_next": "Next Quest",
    
    # Main Menu
    "menu_title": "Rocket Landing Quest!",
    "menu_subtitle": "Collect all parts and fly to Mars!",
    "menu_parts": "parts",
    "menu_completed": "Completed times",
    "menu_mission_complete": "Mission complete! You landed on Mars!",
    
    # Quest names
    "quest_build": "Build Rocket",
    "quest_train": "Train Landing AI",
    "quest_test": "Test Landing",
    "quest_dodge": "Dodge Space Junk",
    "quest_mars": "Mission to Mars",
    
    # Part labels
    "part_rocket": "Rocket",
    "part_sensors": "Sensors",
    "part_brain": "AI Brain",
    "part_shields": "Shields",
    "part_mars": "Mars!",
    
    # Quest 2: Train Landing
    "q2_title": "Quest 2: Train the Landing AI!",
    "q2_speed": "Speed",
    "q2_obstacles": "Obstacles",
    "q2_fuel": "Fuel",
    "q2_tilt": "Tilt",
    "q2_wind": "Wind",
    "q2_safe": "Safe",
    "q2_dangerous": "Dangerous",
    "q2_labeled": "labeled",
    "q2_next": "See Training Summary",
    
    # Training Summary
    "summary_title": "Training Summary",
    "summary_confidence": "Confidence",
    "summary_low": "Low",
    "summary_medium": "Medium",
    "summary_high": "High",
    "summary_continue": "Continue to Test",
    
    # Quest 3: Test Landing
    "q3_title": "Quest 3: Test the Landing AI!",
    "q3_watching": "Watching AI decide...",
    "q3_confidence": "Confidence",
    "q3_decision": "Decision",
    "q3_safe_land": "Safe to land",
    "q3_too_dangerous": "Too dangerous",
    "q3_mistakes": "mistakes",
    "q3_perfect": "Perfect landings!",
    "q3_not_bad": "Not bad!",
    "q3_need_training": "Need more training!",
    "q3_retrain": "Retrain AI",
    "q3_next": "Next Quest",
    
    # Quest 4: Dodge Debris
    "q4_title": "Quest 4: Dodge Space Junk!",
    "q4_ai_says": "AI says",
    "q4_override": "Override AI",
    "q4_trust": "Trust AI",
    
    # Quest 5: Mars Landing
    "q5_title": "Quest 5: Mission to Mars!",
    "q5_launch": "Launch!",
    "q5_cruising": "Cruising to Mars",
    "q5_approaching": "Approaching Mars",
    "q5_landing": "Landing sequence",
    "q5_touchdown": "Touchdown!",
    "q5_success": "Mission success!",
    "q5_back_menu": "Back to Menu",
}

async def generate_audio(text: str, filename: str):
    """Generate MP3 file from text using edge-tts."""
    output_path = os.path.join(OUTPUT_DIR, filename)
    
    # Skip if file already exists
    if os.path.exists(output_path):
        print(f"⏭️  Skipping {filename} (already exists)")
        return
    
    print(f"🎙️  Generating {filename}...")
    communicate = edge_tts.Communicate(text, VOICE)
    await communicate.save(output_path)
    print(f"✅ Created {filename}")

async def main():
    """Generate all missing audio files."""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    print(f"🚀 Generating {len(TEXTS)} audio files with {VOICE}...\n")
    
    # Generate all files
    tasks = [generate_audio(text, f"{key}.mp3") for key, text in TEXTS.items()]
    await asyncio.gather(*tasks)
    
    print(f"\n✅ Done! Generated audio files in {OUTPUT_DIR}/")

if __name__ == "__main__":
    asyncio.run(main())
