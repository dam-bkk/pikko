{\rtf1\ansi\ansicpg1252\cocoartf2869
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 # ROLE\
You are four experts working together:\
1. A senior Thai children's literacy specialist (early readers, age 5\'967)\
2. A native Thai linguist (tones, consonant classes, beginner phonetics)\
3. An expert children's book illustrator (10+ years designing for ages 3\'968, knows what visually engages young kids)\
4. A pragmatic full-stack developer (builds simple, low-maintenance personal apps)\
\
# CONTEXT \'97 IMPORTANT\
This is a **personal project for ONE child** (the developer's son, learning Thai).\
- NOT a business, NOT a SaaS, NOT for sale.\
- No monetization, no multi-user, no marketing features.\
- Goal: the BEST possible learning experience for one kid, easy for one parent to maintain.\
- Optimize for: pedagogical quality, illustration quality, audio quality, simplicity of deployment.\
\
# OBJECTIVE\
Generate:\
1. 2 complete original Thai books (Level 1) with rich illustration prompts\
2. A minimal personal-app architecture (no business bloat)\
\
---\
\
# PART 1 \'97 BOOK CONTENT RULES\
\
## Originality\
100% original stories. Warm, familiar, culturally Thai.\
\
## Target\
One Thai-learning child, age 5\'967, absolute beginner reader.\
\
## Language constraints (Thai-specific)\
- Each page: ONE short Thai sentence, **3\'966 syllables (\uc0\u3614 \u3618 \u3634 \u3591 \u3588 \u3660 )** max.\
  (Thai has no spaces between words \'97 count syllables, not words.)\
- Use **mid-class consonants (\uc0\u3629 \u3633 \u3585 \u3625 \u3619 \u3585 \u3621 \u3634 \u3591 )** primarily, plus high-frequency low-class.\
- **No consonant clusters** (no \uc0\u3585 \u3619 , \u3611 \u3621 , \u3586 \u3623 , etc.) at Level 1.\
- Prefer **live syllables (\uc0\u3588 \u3635 \u3648 \u3611 \u3655 \u3609 )**.\
- Clear short vs long vowels (\uc0\u3632  vs \u3634 , \u3636  vs \u3637 ).\
- Tone marks (\uc0\u3656  \u3657  \u3658  \u3659 ) allowed but minimal.\
- Heavy pattern repetition: "\uc0\u3609 \u3637 \u3656 \u3588 \u3639 \u3629 ___", "\u3593 \u3633 \u3609 \u3594 \u3629 \u3610 ___", "\u3648 \u3586 \u3634 ___".\
- Reuse 5\'968 core words across all 8 pages of a book.\
\
## Definition of "Level 1"\
- 5\'968 unique words per book\
- 3\'966 syllables per sentence\
- No clusters, no silent letters (\uc0\u3585 \u3634 \u3619 \u3633 \u3609 \u3605 \u3660 ), no complex tone rules\
- Each core word repeated 3+ times in the book\
\
---\
\
# PART 2 \'97 BOOK STRUCTURE (per book)\
\
## Metadata\
- `title_thai`, `title_english`, `title_romanization` (RTGS)\
- `level`: "Level 1"\
- `theme`\
- `core_vocabulary`: 5\'968 objects with:\
  - `thai`, `romanization`, `english`, `part_of_speech`, `tone` (mid/low/falling/high/rising)\
\
## Character Sheet (CRITICAL \'97 written by the illustrator expert)\
A detailed, fixed visual identity to copy into EVERY image prompt:\
- `character_name`\
- `physical_description` \'97 be specific:\
  - age, gender, ethnicity (Thai)\
  - hair (color, length, style)\
  - face shape, eye shape/color\
  - skin tone\
  - exact outfit (colors, items, shoes) \'97 never changes across pages\
  - height/build\
- `personality` (2\'963 traits \'97 affects facial expressions)\
- `recurring_objects` (e.g. red backpack with a star patch, stuffed elephant)\
- `art_style_reference`: e.g. "Oliver Jeffers meets Thai illustrator Pomme Chan \'97 gentle linework, generous white space, slightly muted pastels with one accent color"\
\
## Illustration Style Bible (applies to ALL pages of the book)\
Defined ONCE and copied into each image prompt:\
- `medium`: "flat digital illustration with subtle paper grain texture"\
- `palette`: specify a 5-color palette (hex or descriptive) \'97 e.g. "warm cream background #FDF6E8, soft sage #B8D4B0, dusty coral #E8A598, deep navy accents #2D3E5C, golden highlight #F4C95D"\
- `linework`: "soft, hand-drawn, slightly imperfect lines, no harsh black outlines"\
- `composition`: "generous white space, character centered or rule-of-thirds, no clutter"\
- `lighting`: "soft natural light, gentle shadows"\
- `mood`: "warm, calm, inviting, slightly cozy"\
- `forbidden`: "no text in image, no logos, no scary elements, no sharp contrast, no 3D rendering, no anime style, no generic stock illustration look"\
\
## Pages \'97 EXACTLY 8\
- Pages 1\'962: introduce character + setting\
- Pages 3\'966: repetition with small variations\
- Pages 7\'968: warm resolution\
\
For EACH page:\
- `page_number`\
- `thai_text` (3\'966 syllables)\
- `romanization` (RTGS)\
- `ipa`\
- `english_translation`\
- `syllable_breakdown` (e.g. "\uc0\u3609 \u3637 \u3656  / \u3588 \u3639 \u3629  / \u3627 \u3617 \u3634 ")\
- `new_vocabulary`\
- `repeated_pattern`\
- `image_prompt` \'97 must include, in this order:\
  1. The full character sheet (copy-paste, identical every page)\
  2. The full illustration style bible (copy-paste, identical every page)\
  3. **This page's specific scene**: action, emotion, setting, camera angle, what's in the foreground/background, the Thai cultural detail if any (e.g. a Thai-style wooden house, a bowl of mango with sticky rice, a soi dog)\
  4. Composition note: where the empty space is (so text could be added later if needed)\
- `audio_specs`:\
  - `voice`: "native Thai female, warm and gentle, age 25\'9635"\
  - `speed`: "0.85x natural pace"\
  - `pause_after_each_syllable`: true (small 150ms pauses)\
  - `format`: "mp3, 22kHz mono"\
  - `karaoke_timestamps`: array of `\{syllable, start_ms, end_ms\}` (placeholder values OK)\
\
---\
\
# PART 3 \'97 TWO BOOKS\
\
## Book 1: "\uc0\u3627 \u3617 \u3634 \u3586 \u3629 \u3591 \u3593 \u3633 \u3609 " (My Dog)\
- Child + pet dog\
- Theme: friendship, daily life\
- Patterns: "\uc0\u3609 \u3637 \u3656 \u3588 \u3639 \u3629 ___", "\u3627 \u3617 \u3634 \u3594 \u3629 \u3610 ___"\
\
## Book 2: "\uc0\u3612 \u3621 \u3652 \u3617 \u3657 \u3629 \u3619 \u3656 \u3629 \u3618 " (Yummy Fruit)\
- Child eating Thai fruits\
- Theme: food, family, taste\
- Patterns: "\uc0\u3593 \u3633 \u3609 \u3585 \u3636 \u3609 ___", "\u3629 \u3619 \u3656 \u3629 \u3618 "\
- Include 3 distinctly Thai fruits: pick from \uc0\u3617 \u3632 \u3617 \u3656 \u3623 \u3591 , \u3585 \u3621 \u3657 \u3623 \u3618 , \u3648 \u3591 \u3634 \u3632 , \u3621 \u3635 \u3652 \u3618 , \u3617 \u3633 \u3591 \u3588 \u3640 \u3604 \
\
**Continuity bonus**: the same character can appear in both books (same character sheet) \'97 builds emotional attachment for the child.\
\
---\
\
# PART 4 \'97 PERSONAL APP ARCHITECTURE\
\
Keep it MINIMAL. This runs for one kid, on a tablet at home.\
\
## 4.1 Database (SQLite \'97 simplest possible)\
Just enough tables to track learning, nothing more.\
\
```\
books\
  id, title_thai, title_english, level, theme, cover_image_path\
\
pages\
  id, book_id (FK), page_number, thai_text, romanization,\
  english, syllable_breakdown, image_path, audio_path,\
  karaoke_timestamps (JSON)\
\
vocabulary\
  id, thai, romanization, english, tone, level\
\
reading_sessions\
  id, book_id (FK), started_at, finished_at, completed (bool),\
  pages_read, total_time_seconds\
\
vocabulary_exposure\
  id, vocabulary_id (FK), session_id (FK), exposure_count\
  \uc0\u8594  used to compute mastery (0=new, 1=seen, 2=familiar, 3=mastered)\
\
streaks\
  id, current_streak, longest_streak, last_active_date\
  (single row \'97 only one child)\
```\
\
No `users` table. No `children_profiles`. No `subscriptions`.\
\
## 4.2 UX (Child)\
- **Home**: grid of book covers, big tap zones, no menu\
- **Reader**: \
  - Fullscreen page (illustration + Thai text below)\
  - Big audio button (auto-plays on page load \'97 toggleable)\
  - Karaoke syllable highlighting synced to audio\
  - Big text: min 36pt, high contrast, generous spacing\
  - Swipe or large arrows to navigate\
  - "Read again" button at end (loops the book)\
- **Reward**: simple animation on book completion (stars, gentle confetti, a "well done" voice line in Thai: "\uc0\u3648 \u3585 \u3656 \u3591 \u3617 \u3634 \u3585 !")\
- **No text input ever**, no settings menu visible to the child\
\
## 4.3 UX (Parent \'97 you)\
A simple `/parent` page (PIN-protected, e.g. 4 digits):\
- Books read this week\
- Total reading time this week\
- Vocabulary status: list of all words with mastery level (0\'963)\
- Current streak\
- Button: "Add a new book" (drops a JSON file into a folder, app picks it up)\
\
## 4.4 Core Features\
- Per-page audio with karaoke highlighting\
- Auto-track which pages were viewed and for how long\
- Vocabulary exposure auto-counted\
- Streak counter (one read per day = streak +1)\
- Favorite books (heart icon)\
- Offline-first (everything runs locally)\
\
## 4.5 Tech Stack (PERSONAL \'97 easy to deploy and maintain)\
\
**Recommended: a local PWA on a tablet**\
\
- **Frontend**: Next.js + React + TailwindCSS, deployed as a PWA (works offline, installs to tablet home screen like a native app)\
- **Backend**: none needed \'97 Next.js API routes only if necessary\
- **Database**: SQLite (file-based, zero config) via better-sqlite3, OR just JSON files in `/data` folder for ultimate simplicity\
- **Storage**: local `/public/books/\{book_id\}/` folders containing images + audio (no cloud)\
- **Hosting**: \
  - Easiest: deploy to Vercel free tier (works great for one kid)\
  - Or: run locally on a Raspberry Pi / old laptop on home WiFi\
  - Or: package with Tauri/Electron as a desktop app\
\
**Audio generation (one-time, offline tooling)**:\
- Use **Microsoft Azure Neural TTS** with Thai voice "Premwadee" or "Achara" \'97 sounds genuinely warm and natural\
- Alternative: **ElevenLabs** Thai (costs more but very expressive)\
- Generate once, save as mp3, ship with the app \'97 no API calls at runtime\
\
**Image generation (one-time)**:\
- **Midjourney v6** or **Flux** for production-quality illustrations\
- Generate each page, pick the best, store as PNG/WebP\
- Use the character sheet as a `--cref` (Midjourney) for character consistency\
- Manually retouch in Photoshop/Procreate if needed\
\
## 4.6 Learning Logic\
- **Repetition**: each core word seen 3+ times per book \uc0\u8594  moves from "new" \u8594  "seen" \u8594  "familiar"\
- **Cross-book reinforcement**: words from Book 1 reappear in Book 2 (cumulative vocab)\
- **Mastery**: 5+ exposures across different sessions = "mastered"\
- **Level unlock**: when 80% of Level 1 vocab is "familiar" (level 2+), suggest Level 2 books\
- **Daily target**: 1 book per day (low pressure, builds habit)\
\
---\
\
# OUTPUT FORMAT (STRICT)\
\
Return ONE valid JSON object, nothing else:\
\
```json\
\{\
  "books": [\
    \{\
      "title_thai": "...",\
      "title_english": "...",\
      "title_romanization": "...",\
      "level": "Level 1",\
      "theme": "...",\
      "core_vocabulary": [...],\
      "character_sheet": \{...\},\
      "illustration_style_bible": \{...\},\
      "pages": [ /* 8 pages */ ]\
    \}\
    /* 2 books total */\
  ],\
  "app_architecture": \{\
    "database": \{...\},\
    "ux": \{ "child": \{...\}, "parent": \{...\} \},\
    "features": [...],\
    "tech_stack": \{...\},\
    "learning_logic": \{...\}\
  \}\
\}\
```\
\
# QUALITY CHECKLIST (self-verify before responding)\
- [ ] All Thai sentences are 3\'966 syllables\
- [ ] No consonant clusters\
- [ ] Character sheet copied identically across all 8 image prompts of a book\
- [ ] Illustration style bible copied identically across all 8 image prompts\
- [ ] Each core word appears 3+ times per book\
- [ ] All 8 pages present per book\
- [ ] RTGS romanization on every page\
- [ ] Output is valid JSON, no markdown fences, no trailing commas}