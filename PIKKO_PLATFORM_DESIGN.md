# Pikko — Complete Design System

**Scope:** Landing page (existing) + Parent Dashboard + Child App + Profile Avatars
**Stack target:** Next.js 15 + React + Tailwind + Framer Motion + pure SVG illustrations
**Audience:** Claude Code as the implementer

---

## TABLE OF CONTENTS

1. [Landing Page Design System (existing — preserved)](#1-landing-page-design-system)
2. [Platform Design System (extension for app)](#2-platform-design-system)
3. [Profile Avatars (child profile picker)](#3-profile-avatars)
4. [Story Characters (in-book illustrations)](#4-story-characters)
5. [Child App — Screens & UX](#5-child-app)
6. [Parent Dashboard — Screens & UX](#6-parent-dashboard)
7. [Gamification System](#7-gamification-system)
8. [Quiz System](#8-quiz-system)
9. [Mini-games](#9-mini-games)
10. [Animations & Sound Specs](#10-animations--sound-specs)
11. [Component Library Index](#11-component-library-index)

---

# 1. LANDING PAGE DESIGN SYSTEM

> **PRESERVED — do not modify.** All landing page tokens, gradients, animations, and patterns from the original DESIGN.md are kept as-is. The platform design (Sections 2+) extends this without breaking it.

## Palette

### Brand (Pikko)
| Token | Value | Usage |
|---|---|---|
| `--p-orange` | `#FF6635` | Primary CTA, accents |
| `--p-orange-lt` | `#FF9060` | Hover states |
| `--p-yellow` | `#FFD23F` | Highlights |
| `--p-blue` | `#3BAFDA` | Secondary accent |
| `--p-green` | `#4CC97C` | Success, "save" badge |
| `--p-purple` | `#9B74E8` | Feature tabs |
| `--p-navy` | `#1A2B3C` | Body text, dark elements |
| `--p-muted` | `#6B7A8D` | Subtitles, captions |

### Dark hero palette
| Stop | Value |
|---|---|
| 0% | `#1A0845` |
| 40% | `#2D1278` |
| 80% | `#5B20CC` |
| 100% | `#7C2DFF` |

Direction: `linear-gradient(150deg, …)`

### Section backgrounds
| Section | Background |
|---|---|
| Hero | dark purple gradient |
| TrustBar | `#F7F5FF` |
| FeaturesTab | `linear-gradient(150deg,#100030,#1E0860,#0A1840)` |
| HowItWorks | white |
| WhySection | `#F7F5FF` |
| FontsSection | dark purple gradient |
| LevelsSection | dark purple gradient |
| PricingSection | `#F8F5FF` |
| FinalCTA | dark purple gradient |

## Typography

- **Body / sans**: Mitr (Thai sans-serif) — `var(--font-thai-sans)`
- **Serif / reading**: Noto Serif Thai — `var(--font-thai-serif)`
- **School print**: Sarabun — `var(--font-thai-school)`

### Scale
| Role | Size |
|---|---|
| Hero h1 | `clamp(2.6rem, 5.5vw, 4.2rem)` — JA/KO: `clamp(1.9rem, 3.6vw, 3rem)` |
| Section h2 | `clamp(1.75rem, 4vw, 2.5rem)` |
| Card title | `20px` |
| Body | `16–17px` |
| Small / label | `12–14px` |
| Micro | `10px` |

All headings: `font-black` (900). Section h2s always have **1–3 gradient words** highlighted.

## Gradient Text

```css
.text-gradient      { background: linear-gradient(135deg,#FFD60A,#FF8C35); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.text-gradient-pink { background: linear-gradient(135deg,#FF4C91,#FF6B35); … }
.text-gradient-f0   { background: linear-gradient(135deg,#FF6635,#FF4090); … }
.text-gradient-f1   { background: linear-gradient(135deg,#3BAFDA,#00D2CC); … }
.text-gradient-f2   { background: linear-gradient(135deg,#4CC97C,#00AEEF); … }
```

## Floating orbs, sparkle crosses, radial blobs — same as original DESIGN.md

(See landing page DESIGN.md for full specs of orbs, sparkles, blobs.)

## Animations

| Class | Keyframe | Usage |
|---|---|---|
| `float-animate` | `translateY(0→-14px)` 5s | Orbs, badges |
| `wiggle` | `rotate(-4→4deg)` 3s | Book SVGs |
| `btn-bounce` | `translateY(0→-7px) scale(1→1.03)` 2.4s | Primary CTAs |
| `wave-bar` | `scaleY(0.3→1)` 0.8s | Audio wave bars |
| `anim-slide-up` | `opacity 0→1, translateY 40→0` 0.6s | Section titles |
| `anim-pop-in` | `opacity 0→1, scale 0.82→1` 0.55s | Cards on scroll |
| `anim-slide-in-left` | `translateX -48→0` 0.65s | Left cards |
| `anim-slide-in-right` | `translateX 48→0` 0.65s | Right cards |
| `anim-grow-line` | `scaleX(0→1)` 0.5s | HowItWorks connectors |
| `menu-item-in` | `translateY 36→0` 0.6s | Burger menu items |

## i18n

6 languages: `en`, `th`, `fr`, `zh`, `ja`, `ko`.
French tone: **always "tu" form**.

---

# 2. PLATFORM DESIGN SYSTEM

> The app (logged-in experience) has a different feel from the landing page: warmer, friendlier, more playful, less "marketing dark mode". Children spend hours here — it must feel **safe, soft, and exciting**.

## 2.1 Mode Distinction

| Surface | Mode | Why |
|---|---|---|
| Landing page | Dark hero + light sections (mixed) | Sales/conversion theatre |
| **Child App** | **Always light + colorful** | Eye comfort, kid-friendly, hours of use |
| **Parent Dashboard** | **Light, clean, slightly tech** | Quick scan, data clarity |

## 2.2 Extended Color Tokens (App-specific)

Add these to `:root` alongside existing tokens:

```css
/* App-mode warm palette */
--app-cream:        #FFF9EE;   /* main app bg */
--app-cream-deep:   #FFF4DC;   /* card bg on cream */
--app-sky:          #E8F4FF;   /* secondary bg */
--app-sage:         #E8F5E9;   /* success bg */
--app-coral-soft:   #FFE5DD;   /* warning soft */
--app-pink-soft:    #FFE0EC;   /* fun bg */
--app-purple-soft:  #F0E8FF;   /* premium bg */

/* Biome colors (for path/levels) */
--biome-meadow:     #B8E5C8;   /* level 1-2 */
--biome-forest:     #4CAF50;   /* level 3-4 */
--biome-beach:      #FFE082;   /* level 5-6 */
--biome-mountain:   #B39DDB;   /* level 7-8 */
--biome-sky:        #81D4FA;   /* level 9-10 */
--biome-cosmos:     #5C6BC0;   /* level 11+ */

/* Status / feedback */
--star-gold:        #FFD23F;
--star-locked:      #D4D8DE;
--xp-purple:        #9B74E8;
--streak-fire:      #FF6635;
--heart-red:        #FF4D6D;
```

## 2.3 Child App Backgrounds

| Screen | Background |
|---|---|
| Home (book library) | `linear-gradient(180deg,#FFF9EE 0%,#FFE0EC 100%)` |
| Path / journey | `linear-gradient(180deg,#E8F4FF 0%,#E8F5E9 100%)` (sky → meadow) |
| Reader (book open) | `var(--app-cream)` clean |
| Quiz | `linear-gradient(180deg,#F0E8FF,#FFE0EC)` festive |
| Mini-game | varies per game (see Section 9) |

## 2.4 Parent Dashboard Backgrounds

Single neutral: `#F8F9FB` with white cards. Clean, "Apple Health"-style.

## 2.5 Component Spacing & Radii

| Element | Radius | Shadow |
|---|---|---|
| Big book card (home) | `rounded-[32px]` | `0 12px 40px rgba(255,102,53,0.18)` |
| Avatar tile (profile) | `rounded-[28px]` | `0 8px 24px rgba(0,0,0,0.08)` |
| Quiz card | `rounded-[24px]` | `0 8px 28px rgba(155,116,232,0.22)` |
| Star/badge | `rounded-full` | `0 4px 12px rgba(255,210,63,0.45)` |
| Parent stat card | `rounded-2xl` (16px) | `0 4px 12px rgba(0,0,0,0.04)` |

---

# 3. PROFILE AVATARS

> **Distinct from story characters.** These are the avatars children pick when creating/switching their profile. Should feel like a fun cast they can identify with.

## 3.1 Avatar Picker — Concept

12 unique profile avatars, organized in 3 themes:

- **Animals (4):** Tiger cub, Elephant calf, Cat, Owl
- **Kids (4):** 2 boys + 2 girls, varied skin tones and hairstyles
- **Fantasy (4):** Robot, Astronaut kid, Wizard kid, Dragon hatchling

Each avatar is a **circular SVG, viewBox 0 0 200 200**, designed to crop nicely as a circle (face/head only, slight shoulders).

## 3.2 Common Avatar Specs

```markdown
TECHNICAL CONSTANTS — apply to all 12 avatars:
- viewBox: "0 0 200 200"
- Output: single SVG file
- File size: < 6KB each
- Style: flat vector, soft rounded edges, NO harsh outlines
- Stroke weight: 2-3px max, only where definition is needed
- Pure SVG, no external dependencies
- Layered groups for animation:
    <g id="avatar-bg">    background circle
    <g id="avatar-body">  shoulders/neck
    <g id="avatar-head">  main head
    <g id="avatar-eyes">  eyes (animatable for blinking)
    <g id="avatar-mouth"> mouth (animatable for talking)
    <g id="avatar-extras">accessories (hat, glasses, etc.)

PALETTE — only use these:
- Skin tones: #FFE0BD, #F5D5B0, #E8B98A, #C99670, #A0673E
- Brand: #FF6635, #FFD23F, #3BAFDA, #4CC97C, #9B74E8, #1A2B3C
- Backgrounds: #FFE0EC, #E8F4FF, #E8F5E9, #FFF4DC, #F0E8FF, #FFE5DD

EXPRESSION:
- Always smiling or neutral-friendly
- Eyes large (15-18% of face), expressive
- One subtle "personality cue" per avatar (winking, sticking tongue, peace sign, etc.)
```

## 3.3 The 12 Avatars — Prompts for Claude Code

> Give the **Common Avatar Specs** above ONCE to Claude Code, then drop each prompt below for individual generation.

### 🐯 Avatar 1 — Tiger Cub ("Nong Suea")

```markdown
Create circular profile avatar SVG named "tiger-cub".

Character:
- Tiger cub face, front-facing, slightly tilted right
- Orange fur (#FF8C42) with darker stripes (#C0541A) — 4-5 visible stripes on face
- White muzzle area, white inner ears
- Big round black eyes with white highlight, pink small nose
- Closed-mouth smile showing one tiny fang
- Two pointy ears with pink inside (#FFB5A0)
- Background circle: #FFE5DD soft coral

Personality cue: One ear slightly bent forward (curious cub).

viewBox 0 0 200 200, layered groups, < 6KB.
```

### 🐘 Avatar 2 — Elephant Calf ("Chang Noi")

```markdown
Create circular profile avatar SVG named "elephant-calf".

Character:
- Baby Asian elephant face, front-facing
- Soft grey-purple body (#B8A8C9), lighter inside ears (#E0D0E8)
- Trunk curled up at the front making a little heart shape (subtle, not too cartoonish)
- Large floppy ears, slightly forward
- Small black eyes (closed crescents = happy expression), long lashes
- Tiny white tusks barely peeking
- Background circle: #E8F4FF soft sky

Personality cue: Trunk forming a heart curl.

viewBox 0 0 200 200, layered groups, < 6KB.
```

### 🐱 Avatar 3 — Cat ("Maew")

```markdown
Create circular profile avatar SVG named "cat".

Character:
- Cute kitten face, front-facing
- Soft cream/beige fur (#F5D5B0) with slight orange patches (#FFB591) on top of head and one cheek
- Big round green eyes (#4CC97C) with vertical pupils, white highlight
- Pink small triangular nose
- Tiny smiling mouth with whisker dots (3 each side)
- Pointed ears with pink inside
- Background circle: #FFF4DC warm cream

Personality cue: One eye winking (closed crescent), other open.

viewBox 0 0 200 200, layered groups, < 6KB.
```

### 🦉 Avatar 4 — Owl ("Nok Hook")

```markdown
Create circular profile avatar SVG named "owl".

Character:
- Round owl face, front-facing
- Brown-purple gradient feathers (#9B74E8 mixed with #6B5B95)
- Big circular yellow eyes (#FFD23F) with black pupils, white highlights
- Small orange triangular beak (#FF6635)
- Feather tufts on top of head (small "ear" peaks)
- Subtle feather pattern on chest area visible
- Background circle: #F0E8FF soft purple

Personality cue: Both eyes wide-open in alert curiosity.

viewBox 0 0 200 200, layered groups, < 6KB.
```

### 👦 Avatar 5 — Boy 1 ("Ploy")

```markdown
Create circular profile avatar SVG named "boy-1".

Character:
- Thai boy, age 6, light skin tone (#F5D5B0)
- Short black hair, straight bowl-cut style with a slight cowlick
- Big brown eyes (#6B4423), small smile
- Wearing yellow t-shirt (#FFD23F) with white star on chest
- Light blush on cheeks (#FFB5A0 at 30% opacity)
- Background circle: #FFE0EC soft pink

Personality cue: Tongue slightly sticking out playfully.

viewBox 0 0 200 200, layered groups, < 6KB.
```

### 👦 Avatar 6 — Boy 2 ("Beam")

```markdown
Create circular profile avatar SVG named "boy-2".

Character:
- Thai boy, age 7, deeper skin tone (#C99670)
- Curly dark brown hair, slightly messy
- Big dark eyes (#1A2B3C), wide smile showing teeth
- Wearing blue striped t-shirt (#3BAFDA + white)
- Round glasses (#1A2B3C frame)
- Background circle: #E8F4FF soft sky

Personality cue: Doing a peace sign with one hand peeking from bottom of frame.

viewBox 0 0 200 200, layered groups, < 6KB.
```

### 👧 Avatar 7 — Girl 1 ("Nam")

```markdown
Create circular profile avatar SVG named "girl-1".

Character:
- Thai girl, age 6, medium skin tone (#E8B98A)
- Black hair in two side pigtails with pink ribbons (#FFD23F + #FF6635)
- Big curious dark brown eyes, wide open smile
- Wearing pink t-shirt (#FF8C9F) with small white flower
- Light cheek blush
- Background circle: #FFE0EC soft pink

Personality cue: Hands holding the side of cheeks (kawaii pose, hands peeking up).

viewBox 0 0 200 200, layered groups, < 6KB.
```

### 👧 Avatar 8 — Girl 2 ("Ploy-Mai")

```markdown
Create circular profile avatar SVG named "girl-2".

Character:
- Thai girl, age 7, light skin tone (#F5D5B0)
- Long black hair flowing down sides, with a yellow flower clip on left side (#FFD23F)
- Big almond-shaped eyes (#6B4423), gentle smile
- Wearing green t-shirt (#4CC97C) with subtle pattern
- Tiny ear studs
- Background circle: #E8F5E9 soft sage

Personality cue: One hand giving a gentle wave from bottom-right of frame.

viewBox 0 0 200 200, layered groups, < 6KB.
```

### 🤖 Avatar 9 — Robot ("Booky-bot")

```markdown
Create circular profile avatar SVG named "robot".

Character:
- Friendly retro robot face
- Metallic blue-grey body (#5B7B9C) with white chest area
- Big rectangular screen-eyes (one cyan #00D2CC, one yellow #FFD23F) — looks like LED displays
- Small antenna with glowing orange tip on top of head
- Tiny smile mouth as a glowing line (#4CC97C)
- Headphones/ear protrusions on sides
- Background circle: #E8F4FF soft sky

Personality cue: Antenna tip is glowing/animated dot — emoji-like (#FF6635 pulsing).

viewBox 0 0 200 200, layered groups, < 6KB.
```

### 🚀 Avatar 10 — Astronaut Kid ("Ploy in Space")

```markdown
Create circular profile avatar SVG named "astronaut".

Character:
- Kid wearing astronaut helmet, front-facing
- Helmet: white (#FFFFFF) with gold visor reflection (#FFD23F semi-transparent)
- Through visor: smiling kid face with brown skin (#C99670), big eyes
- Subtle visor reflections (small white shapes)
- Spacesuit collar visible with red+blue Pikko patch
- Tiny stars (#FFD23F) twinkling around helmet edge
- Background circle: #1A0845 deep space (with 4-5 tiny stars dotted)

Personality cue: Visor reflection shows tiny rocket icon.

viewBox 0 0 200 200, layered groups, < 6KB.
```

### 🧙 Avatar 11 — Wizard Kid ("Mali-Mage")

```markdown
Create circular profile avatar SVG named "wizard".

Character:
- Kid wearing oversized wizard hat, front-facing
- Tall pointy purple wizard hat (#7C4DFF) with gold star (#FFD23F) and tiny sparkles
- Hat slightly tilted, brim partially covering one eye (peeking through)
- Visible eye is big and curious (#4CC97C green)
- Light skin (#F5D5B0), small smile, freckles dotted on cheeks
- Subtle magic sparkles around hat (#FFD23F dots)
- Background circle: #F0E8FF soft purple

Personality cue: A tiny magic spark floating from hat tip.

viewBox 0 0 200 200, layered groups, < 6KB.
```

### 🐲 Avatar 12 — Dragon Hatchling ("Naga")

```markdown
Create circular profile avatar SVG named "dragon".

Character:
- Baby dragon face inspired by Thai naga (long-bodied dragon)
- Soft jade green scales (#4CC97C) with slightly darker accents
- Big golden eyes (#FFD23F) with friendly expression
- Tiny golden horns on top of head
- Small smiling mouth with one little fang and tiny puff of smoke (#E8F4FF) coming out
- Soft scale pattern visible on cheeks
- Background circle: #E8F5E9 soft sage

Personality cue: Tiny smoke puff escaping from mouth corner (could animate as exhale).

viewBox 0 0 200 200, layered groups, < 6KB.
```

## 3.4 Avatar Picker UI

```
┌─────────────────────────────────┐
│  Choose your hero! 🎯           │
│                                 │
│  [grid 3 cols × 4 rows]         │
│  🐯  🐘  🐱                     │
│  🦉  👦  👦                     │
│  👧  👧  🤖                     │
│  🚀  🧙  🐲                     │
│                                 │
│  [Continue] (disabled until     │
│  one is selected)               │
└─────────────────────────────────┘
```

- Each avatar tile: `rounded-[28px]`, p-3, hover scale 1.06, selected = ring-4 ring-orange + scale-110
- On select: `anim-pop-in` on the chosen one
- Below grid: text input "What's your name?" (Thai or English)
- Floating Pikko mascot in corner: "I can't wait to read with you!"

---

# 4. STORY CHARACTERS (in-book illustrations)

> These are the characters that appear **inside the books**. Different from profile avatars (which represent the user). Reuse the previous Pikko Design System Bible — recap below.

## 4.1 Story Character Roster

| Character | Role | Reuse Across Books |
|---|---|---|
| **Nong** | Main Thai boy, 6 yo | Yes — recurring |
| **Ploy** | Friend, 6 yo | Yes — recurring |
| **Yaa Mali** | Grandmother, wisdom figure | Yes — appears at end of books |
| **Ngoh** | Soi dog mascot | Yes — comic relief |
| **Pikko Walker** | Genderless travel character (path map) | Yes — gamification |

## 4.2 Story Character Color Palette

Same as Section 2.2 (`--app-*` tokens), with skin tones from Section 3.2.

## 4.3 Story Character Prompts

(Reused from earlier conversation — preserved here for completeness)

### Nong — Thai boy, 6 yo, main character

```markdown
Create SVG character "Nong" — Pikko story protagonist.
- Round friendly face, medium skin (#E8B98A)
- Short black hair with cowlick on right
- Big warm brown eyes (#1A2B3C), small smiling mouth
- Yellow t-shirt (#FFD23F) with white elephant patch
- Blue shorts (#3BAFDA), brown sandals
- Light cheek blush (#FFB5A0 30% opacity)

Pose: Standing, slight smile, hands at sides.

viewBox 0 0 200 300. Layered groups: head, body, left-arm, right-arm, left-leg, right-leg, accessories. Class on root: "pikko-character pikko-nong". Under 8KB.

Reference: Todo Math kid characters, Khan Academy Kids mascots.
```

### Ploy — Thai girl, 6 yo, Nong's friend

```markdown
Create SVG character "Ploy" — Nong's friend.
- Round face, light skin (#F5D5B0)
- Black hair in two high pigtails with pink ribbons (#FFB5A0)
- Big curious dark eyes, open smile (two visible teeth)
- Pink t-shirt (#FF8C9F) with small jasmine flower
- White skirt with sage trim (#E8F5E9)
- White sneakers, light blush

Pose: Standing slightly turned, one hand waving, other holding small book.

Same SVG specs as Nong. Same head proportions and scale (must look like friends).
```

### Yaa Mali — Grandmother

```markdown
Create SVG character "Yaa Mali" — wise grandmother.
- Soft round face with gentle smile lines (NOT harsh wrinkles)
- Skin (#E8B98A)
- Silver-grey hair in low neat bun
- Half-moon reading glasses (#1A2B3C frame)
- Warm crinkled eyes (closed crescents = happy), peaceful smile
- Soft sage blouse (#B8E5C8) with subtle floral embroidery
- Dark navy long skirt (#1A2B3C)
- Simple gold dot earrings (#FFD23F)

Pose: Sitting slightly leaning forward, holding open book, welcoming gesture.

Role: Appears at end of each book — congratulates child ("เก่งมากลูก!"). Mouth in <g id="mouth"> separate for talk animation. Eyes optionally close for blink.
```

### Ngoh — Soi dog mascot

```markdown
Create SVG character "Ngoh" — Pikko's mascot dog.
- Cartoon Thai street dog (soi dog), small breed
- Warm caramel body (#E8A598 + cream)
- White muzzle, paws, tail tip
- Floppy ears, one slightly perked
- Big black eyes with white highlight
- Pink tongue (#FFB5A0) sticking out side
- Red collar with gold tag (#FFD23F) showing star icon
- Stubby happy tail mid-wag

Pose: Sitting facing forward, head tilted right, paws together.

Role: Sidekick on path map, quiz wins, loading screens.

viewBox 0 0 200 200. Tail in <g id="tail">, ears in <g id="ear-left"> and <g id="ear-right"> for animation.
```

### Pikko Walker — Path traveler

```markdown
Create SVG character "Pikko Walker" — small path-map traveler.
- Genderless simplified kid (could be Nong, could be anyone)
- Same skin and palette as design system
- Sage green backpack (#B8E5C8)
- Tiny book in one hand
- Cheerful expression

Pose: Mid-walk (one leg forward, slight forward lean, arm swing).

Role: Moves along the gamified progress path between books — like Duolingo's owl traveling, or Todo Math's character moving through stages.

viewBox 0 0 100 150. MUST work clearly at 40x60px minimum on small screens.

Legs in <g id="legs"> with TWO states (walking-1, walking-2) for CSS animation. Backpack in <g id="backpack"> for slight bounce. Under 4KB.
```

---

# 5. CHILD APP

## 5.1 Information Architecture

```
[Splash] → [Profile picker] → HOME
                                ├── Library (book grid)
                                ├── Path / Journey (gamified map)
                                ├── Reader (when book opened)
                                │     ├── Pages (1..N)
                                │     ├── End → Quiz
                                │     └── Quiz result → Reward animation
                                ├── Mini-games hub
                                └── Settings (parent-gate locked)
```

## 5.2 Splash Screen

- Full-screen `--app-cream` background
- Big animated Pikko logo (mascot waving, `wiggle` animation)
- Below: "Loading…" + bouncing dots
- 1.5–2s before transitioning to profile picker
- Background: subtle floating orbs (smaller than landing, more pastel)

## 5.3 Profile Picker

(See Section 3.4 for layout.)

## 5.4 Home — Book Library

```
┌──────────────────────────────────────────┐
│ [avatar] Hi Mali! 🌟 12     🔥 5  💖 8 │  ← header bar
├──────────────────────────────────────────┤
│                                          │
│   [BIG CARD — Continue Reading]          │  ← if book in progress
│   📕 "หมาน้อยของฉัน"                      │
│   ━━━━━━━━━━━━━━━ 60%                   │
│   [Resume ▶]                             │
│                                          │
├──────────────────────────────────────────┤
│  📚 Your books                           │
│                                          │
│  [book] [book] [book] [book]            │
│  [book] [book] [book] [book]            │
│                                          │
│  🔒 [book locked]  🔒 [book locked]      │
│                                          │
├──────────────────────────────────────────┤
│  [🏠 Home] [🗺 Journey] [🎮 Games]      │  ← bottom nav
└──────────────────────────────────────────┘
```

### Header bar specs
- Avatar circle (60px), tap → profile switcher
- "Hi {name}!" in `font-bold`, 18px
- Stars count (gold star icon + number), Streak fire (orange fire icon + days), Hearts (red heart + lives)
- Background: white with `0 2px 8px rgba(0,0,0,0.04)`

### Book card specs
- `rounded-[24px]` cover with book illustration
- Title overlay at bottom on gradient fade
- Lock overlay with greyscale + 🔒 icon if locked
- Star indicator (1/2/3 ⭐) showing prior performance
- Tap → opens reader with page-flip transition
- Hover/press: scale 1.05, `0 12px 32px rgba(...)` shadow

### Bottom nav
- 3 tabs: Home / Journey / Games
- Active tab: orange (#FF6635) with bouncing dot below
- Inactive: muted (#6B7A8D)
- 70px height, white bg, top shadow

## 5.5 Path / Journey View

The signature Todo Math-style **gamified path**.

```
              🏔  Cosmos
             ╱
            🏔  Mountain  ← unlocked next
           ╱    ⭐⭐⭐
          ⭐    
        ⭐
      ⭐  Beach  ← current biome
     ╱    📕📕📕
    ⭐
  ⭐
 🌳🌳  Forest  ← completed (greyscale check)
 ╱
🌳  Meadow  ← completed
```

### Visual specs
- SVG path that winds organically through the screen
- Each "node" = a book, drawn as a colored circle on the path
- Walker (Pikko Walker SVG) sits on the current/next node
- Already-completed: faded but still colorful, with star count
- Locked: silhouette with lock icon
- Biome boundaries: subtle background color shifts (use `--biome-*` tokens)

### Interactions
- Tap unlocked book node → opens reader
- Tap locked node → bounce + "Finish [previous] first!" tooltip
- Long press completed node → stats popup (best score, attempts, time)
- Pinch-zoom to see whole journey or focus zoom

### Animations
- Walker: `bounce` slightly on idle (every 4s, slight up-down)
- Path line: `anim-grow-line` when newly unlocked
- New biome unlock: full-screen confetti + biome name reveal

## 5.6 Reader (book open)

```
┌──────────────────────────────────┐
│ ← back        page 3/8       ⚙  │
├──────────────────────────────────┤
│                                  │
│      [ILLUSTRATION]              │
│                                  │
│                                  │
├──────────────────────────────────┤
│                                  │
│       นี่คือหมาของฉัน             │  ← Thai text
│       (karaoke highlighted)      │
│                                  │
│       [ ▶ play ]  [ 🔊 volume ] │
│                                  │
│  [ ◀ prev ]            [ next ▶ ]│
└──────────────────────────────────┘
```

### Specs
- Top bar: back arrow + page indicator + settings (parent-gated)
- Illustration area: 50% of screen, centered, no clutter
- Text area below: large readable Thai (min 36pt), serif option toggleable
- Karaoke highlighting: each syllable gains an orange underline + slight scale-up as it's spoken
- Audio button: big circular play, pulses when audio playing
- Page navigation: large arrow buttons at edges + swipe gestures
- Optional auto-advance: after audio finishes + 2s pause, auto-flip to next page

### Page transitions
- Default: realistic page flip (CSS 3D rotateY)
- Reduced motion: simple fade
- 0.5s duration, ease-out

### End of book
After last page → automatic transition → Quiz screen.

## 5.7 Mini-games Hub

```
┌────────────────────────────┐
│  🎮 Games                  │
├────────────────────────────┤
│                            │
│  [Card] [Card] [Card]      │
│  Tap   Match  Memory       │
│  cards  pairs  cards       │
│                            │
│  [Card] [Card] [Card]      │
│  Word   Letter Star        │
│  hunt   trace  catcher     │
│                            │
└────────────────────────────┘
```

(See Section 9 for full game specs.)

---

# 6. PARENT DASHBOARD

> Different design language: clean, data-clear, slightly tech. Think Apple Health for kids' reading.

## 6.1 Access

- Parent-gate (math problem) before entering
- Once unlocked, accessible 30 minutes before re-prompting
- Available on web (responsive) and inside child app (locked behind gate)

## 6.2 Dashboard Layout

```
┌─────────────────────────────────────────────────────┐
│ Pikko Parent · [Mali ▼] · This week  [⚙][↗]       │  ← header
├─────────────────────────────────────────────────────┤
│                                                     │
│  📚 12 books    ⭐ 86 stars    🔥 5-day streak     │  ← KPI tiles
│                                                     │
├─────────────────────────────────────────────────────┤
│  Reading time this week                             │
│  [bar chart Mon..Sun]                               │
├─────────────────────────────────────────────────────┤
│  Vocabulary mastered                                │
│  [progress: 124 / 250 words at level 3]             │
│  Recent: หมา (mastered) · บ้าน (familiar) · …       │
├─────────────────────────────────────────────────────┤
│  Recent activity                                    │
│  • Mon 14:20  Finished "หมาน้อย" — quiz 3/3 ⭐⭐⭐ │
│  • Sun 09:15  Started "ผลไม้อร่อย"                 │
│  • Sat 18:00  Earned "Forest Explorer" badge       │
├─────────────────────────────────────────────────────┤
│  Recommendations                                    │
│  [book] [book] [book]                              │
└─────────────────────────────────────────────────────┘
```

## 6.3 KPI Tile

```css
.kpi-tile {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);
  display: flex; align-items: center; gap: 16px;
}
```

Inside: emoji icon (40px) + big number (`font-black`, 32px) + small label (`text-muted`, 13px).

## 6.4 Reading Time Chart

- Horizontal bars (one per day, Mon..Sun)
- Bar color: `--p-orange` for goal-met days, `--p-yellow` for partial, `--p-muted` for zero
- Goal line at 15min/day (configurable)
- Hover/tap → tooltip with exact minutes

## 6.5 Vocabulary Tracker

- Master list of all words from completed books
- Mastery levels: New (grey) → Seen (yellow) → Familiar (green) → Mastered (gold star)
- Mastery rule:
  - Seen = appeared in 1 book
  - Familiar = passed quiz with this word ≥2 times
  - Mastered = passed quiz ≥4 times AND not failed in last 30 days
- Searchable, filterable by level

## 6.6 Recent Activity Feed

- Chronological list, last 30 days
- Icons by event type (book finished, quiz, badge, level-up, streak)
- Color-coded left-border: green for achievement, orange for milestone, blue for activity

## 6.7 Settings

- Child profile management (rename, change avatar, delete)
- Daily goal (10 / 15 / 20 / 30 min)
- Audio speed (0.75x / 1x / 1.25x)
- Bedtime mode (no notifications after 8pm)
- Subscription management (Free / Standard / Family / Premium)
- Email reports (weekly / monthly / off)

---

# 7. GAMIFICATION SYSTEM

## 7.1 Currencies

| Currency | Earned by | Spent on |
|---|---|---|
| ⭐ Stars | Completing books, quiz scores | Cosmetics (avatar items) |
| 🔥 Streak days | Reading 1+ book/day | Streak rewards (cosmetics) |
| 💖 Hearts | Daily login (max 5) | Retry quiz attempts |
| 💎 Gems (Premium only) | Premium subscription perks | Special biomes, custom avatars |

## 7.2 Stars Distribution

| Action | Stars |
|---|---|
| Finish a book (any quality) | 1⭐ |
| Pass quiz (≥60% correct) | +1⭐ |
| Pass quiz with perfect score | +1⭐ extra |
| First-attempt perfect quiz | +1 streak point |
| Daily streak 7-day milestone | 5⭐ bonus |
| Complete a biome (all books in level) | 10⭐ bonus + new avatar item unlocked |

Max stars per book: 3. Visualized as 3 small stars below the book card and on the path node.

## 7.3 Biome Progression

```
Meadow  → Forest → Beach → Mountain → Sky → Cosmos
Lvl 1-2   3-4      5-6     7-8         9-10  11+
```

Each biome:
- 4–6 books
- Final book = boss-level quiz with mini-game
- Completing biome = animated cutscene + new background unlocked + new avatar item

## 7.4 Streak System

- Reading any book counts (free or paid)
- Streak resets at midnight if no book read
- Visual: flame icon next to header, days count, fire grows bigger at 7/30/100 days
- Streak milestones:
  - Day 3: bronze flame badge
  - Day 7: silver flame badge + 5⭐
  - Day 30: gold flame badge + new avatar background
  - Day 100: legendary flame badge + premium feature unlock

## 7.5 Hearts System

- Start day with 5 hearts
- Lose 1 heart on quiz failure
- 0 hearts = wait for next day OR watch "ad" (read a free bonus book) to refill
- Hearts NOT shown for first 7 days of new user — onboarding grace period

## 7.6 Avatar Cosmetics

Earnable items the child unlocks via progression:
- Hats (10+ unlockable)
- Glasses (5+)
- Backgrounds (1 per biome completed)
- Special: animated effects (sparkles around avatar) for premium

Cosmetics displayed in profile picker preview. Optional but addictive layer.

---

# 8. QUIZ SYSTEM

## 8.1 Quiz Trigger

After last page of any book → automatic transition with 1-second "Quiz time!" splash.

## 8.2 Quiz Format

3–5 questions per book (depends on level):

| Level | Questions |
|---|---|
| 1 (beginner) | 3 |
| 2–3 | 4 |
| 4+ | 5 |

## 8.3 Question Types

### Type A: Image recognition
"Which one is หมา?" → 4 image cards, tap correct one.

### Type B: Word recognition
"Which word means 'dog' (chien)?" → 4 Thai words, tap correct one.

### Type C: Audio matching
[plays Thai audio] → 4 image cards, tap matching one.

### Type D: Sentence completion
"นี่คือ ___" → 3 word options, tap to fill.

### Type E (Level 4+): Comprehension
"Did Nong eat mango or banana?" → 2 options.

## 8.4 Quiz UX

```
┌────────────────────────────────┐
│ Question 2 of 4         💖💖💖💖│
│                                │
│   Which one is "หมา"?           │
│                                │
│   ┌────┐  ┌────┐               │
│   │ 🐶 │  │ 🐱 │               │
│   └────┘  └────┘               │
│   ┌────┐  ┌────┐               │
│   │ 🐦 │  │ 🐰 │               │
│   └────┘  └────┘               │
│                                │
│  ▓▓▓▓░░░░ progress             │
└────────────────────────────────┘
```

### Feedback
- Correct: green burst + "✓ Yes!" + ding sound + auto-advance after 1s
- Wrong: gentle red shake (no harsh red flash) + "Try again!" + no heart loss on first attempt → after 2nd wrong attempt, lose 1 heart and reveal correct answer + soft sad-but-friendly sound
- NEVER use scary/punitive feedback. Pikko is encouraging.

### Retry rules
- Per question: 2 attempts allowed
- Per quiz: if quiz fails (less than 60% on first complete pass), child can retry — gets new randomized question order
- Maximum frustration cap: after 3 quiz failures, system auto-suggests a refresher (re-read previous book)

## 8.5 Quiz Result Screen

```
┌────────────────────────────────┐
│       🎉  GREAT JOB!            │
│                                │
│       ⭐  ⭐  ⭐                │
│      (animated reveal)         │
│                                │
│   You earned 3 stars!          │
│   New words: หมา, แมว, นก      │
│                                │
│   [Read again]  [Next book ▶]  │
└────────────────────────────────┘
```

- Star reveal: 1 by 1 with `anim-pop-in`, 0.4s apart
- Confetti burst on 3-star
- Yaa Mali appears at corner with speech bubble: "เก่งมากลูก!"
- Pikko mascot does happy dance animation

---

# 9. MINI-GAMES

> Short, energetic, replayable. Each game uses vocabulary from books the child has read. NEVER introduces unknown vocab in games — games are reinforcement, not learning.

## 9.1 Game Index (6 games for MVP)

| Game | Mechanic | Duration | Reinforces |
|---|---|---|---|
| **Tap Cards** | Match Thai word to image, tap fast | 60s | Word recognition |
| **Match Pairs** | Memory game, 8 pairs | 90s | Visual+word memory |
| **Word Hunt** | Find word in word grid | 60s | Letter recognition |
| **Letter Trace** | Trace Thai letter with finger | 30s/letter | Handwriting muscle memory |
| **Star Catcher** | Falling stars with words, tap correct ones | 60s | Speed reading |
| **Audio Sprint** | Hear word, tap matching image fast | 60s | Listening |

## 9.2 Common Game UX

- Big pre-game splash: rules in 1 sentence + animated demo (3s loop)
- Tap "Start!" → 3-2-1 countdown → game begins
- Always end-screen with score + stars earned + replay button
- No high-score boards visible to child (avoid pressure) — only personal best
- Hearts NOT lost in mini-games (low-stakes practice zone)

## 9.3 Game 1 — Tap Cards

```
60-second timer.
6 cards displayed at a time.
Word shown at top: "หมา"
Child taps the matching image card.
Correct: card flips with star, +1 point, new card appears.
Wrong: card shakes red, no penalty, just no points.
End: how many in 60s.
```

Visual style: cards are big, colorful, rounded, with shadow. On correct tap, the card flips with a satisfying "whoosh" sound.

## 9.4 Game 2 — Match Pairs

Classic memory game with Thai twist:
- 8 pairs (16 cards) on a 4×4 grid
- Each pair = a Thai word + matching image
- Tap two cards to flip; match = stay open + sparkle
- Time tracked, but no fail state — child completes at own pace
- Reward: stars based on time (under 60s = 3⭐)

## 9.5 Game 3 — Word Hunt

- 6×6 grid of Thai consonants
- Word target shown at top: "หมา"
- Child taps consonants in correct order
- Wrong tap = letter shakes, no penalty
- Find 5 words to win
- Best for level 2+ (requires letter awareness)

## 9.6 Game 4 — Letter Trace

- One Thai consonant shown big in dotted outline (e.g., ก)
- Animated arrow shows correct stroke order
- Child traces with finger; line follows path with sparkles
- Forgiving: small deviations OK
- Complete = full color reveal + sound effect
- 10 letters per session

## 9.7 Game 5 — Star Catcher

- Pikko character at bottom of screen, moves left-right with finger drag
- Stars fall from top, each labeled with a Thai word
- Target word shown at top: "หมา"
- Catch only matching stars; ignore others
- Wrong star = small "oof" sound + miss point
- Increasingly fast — 60s sprint
- Music: upbeat looping track

## 9.8 Game 6 — Audio Sprint

- Audio plays a Thai word
- 4 images shown
- Tap correct one within 5 seconds
- Correct = +1, fast tap (under 2s) = +2 (combo)
- 60-second sprint
- Combo streak indicator at top

## 9.9 Mini-game Visual Specs

- Bright, saturated backgrounds (NOT app cream — these are "energetic" zones)
- Each game has unique color theme:
  - Tap Cards: `#FFE0EC` pink
  - Match Pairs: `#E8F4FF` blue
  - Word Hunt: `#FFF4DC` cream
  - Letter Trace: `#E8F5E9` sage
  - Star Catcher: `#1A0845` deep purple (space theme)
  - Audio Sprint: `#F0E8FF` light purple
- Big buttons, finger-friendly targets (min 64×64px)
- Sound effects on every interaction (turnable off in parent settings)

---

# 10. ANIMATIONS & SOUND SPECS

## 10.1 Animation Library Extension

Add to existing animations from landing page:

```css
/* App-specific animations */

@keyframes star-burst {
  0%   { transform: scale(0) rotate(0deg);   opacity: 0; }
  60%  { transform: scale(1.3) rotate(180deg); opacity: 1; }
  100% { transform: scale(1) rotate(360deg);   opacity: 1; }
}
.anim-star-burst { animation: star-burst 0.6s cubic-bezier(0.34,1.56,0.64,1) both; }

@keyframes confetti-fall {
  0%   { transform: translateY(-100vh) rotate(0deg);   opacity: 1; }
  100% { transform: translateY(110vh) rotate(720deg);  opacity: 0; }
}
.anim-confetti { animation: confetti-fall 2.5s linear forwards; }

@keyframes page-flip {
  0%   { transform: perspective(1200px) rotateY(0deg); }
  100% { transform: perspective(1200px) rotateY(-180deg); }
}
.anim-page-flip { animation: page-flip 0.5s ease-out forwards; transform-origin: left center; }

@keyframes walker-bounce {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}
.anim-walker { animation: walker-bounce 0.6s ease-in-out infinite; }

@keyframes shake-soft {
  0%, 100% { transform: translateX(0); }
  25%      { transform: translateX(-6px); }
  75%      { transform: translateX(6px); }
}
.anim-shake-soft { animation: shake-soft 0.4s ease-in-out; }

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255,210,63,0.7); }
  50%      { box-shadow: 0 0 0 16px rgba(255,210,63,0); }
}
.anim-pulse-glow { animation: pulse-glow 1.6s ease-out infinite; }

@keyframes karaoke-highlight {
  0%   { background-size: 0% 100%; }
  100% { background-size: 100% 100%; }
}
/* applied to syllable spans during audio playback */
```

## 10.2 Sound Effects (audio file specs)

All effects: `.opus` 24kbps, mono, < 30KB each.

| Effect | When | Vibe |
|---|---|---|
| `tap-soft.opus` | Any UI tap | Soft button click |
| `tap-bounce.opus` | Big CTA tap | Bouncy positive |
| `correct.opus` | Quiz/game correct | Bright ding |
| `wrong-soft.opus` | Quiz/game wrong | Gentle low note (NOT harsh buzzer) |
| `star-earn.opus` | Star awarded | Magic chime |
| `level-up.opus` | Biome unlocked | Triumphant fanfare (3s) |
| `book-open.opus` | Open book | Page rustle |
| `page-turn.opus` | Page swipe | Whoosh |
| `streak-up.opus` | Streak milestone | Fire crackle + ding |
| `confetti-pop.opus` | 3-star reward | Pop+sparkle |

## 10.3 Background Music (looping ambience)

| Screen | Music | Loop |
|---|---|---|
| Home / library | Soft ukulele bossa | 60s |
| Path / journey | Gentle adventure theme | 90s |
| Reader | OFF (audio is the narration) | — |
| Quiz | Light upbeat | 30s |
| Mini-games | Game-specific upbeat | 45s |

All background music: 22kHz mp3, < 200KB each, can be muted in settings.

## 10.4 Audio Specs (story narration)

- Voice: Azure Neural TTS Thai — Premwadee (warm female) primary
- Speed: 0.85× natural (slow for early readers)
- Pause between syllables: 150ms
- Format: Opus 24kbps mono, ~12-20KB per page audio
- Karaoke timestamps generated alongside audio for syllable highlighting

---

# 11. COMPONENT LIBRARY INDEX

> Quick reference for Claude Code: all components needed for the app, with file paths.

## 11.1 Shared Components

```
/components/
├── shared/
│   ├── PikkoLogo.tsx
│   ├── Avatar.tsx              (renders SVG profile avatar by id)
│   ├── StarRating.tsx          (1-3 stars filled/empty)
│   ├── StreakBadge.tsx
│   ├── HeartCounter.tsx
│   ├── ParentGate.tsx          (math problem modal)
│   └── LoadingSplash.tsx
```

## 11.2 Child App Components

```
/components/
├── child/
│   ├── ProfilePicker.tsx       (12-avatar grid)
│   ├── HomeHeader.tsx          (avatar + stars + streak + hearts)
│   ├── BookCard.tsx
│   ├── ContinueReadingCard.tsx (big "resume" card)
│   ├── BottomNav.tsx
│   ├── PathView.tsx            (the journey map)
│   ├── PathNode.tsx            (single book node on path)
│   ├── BiomeBackground.tsx
│   ├── PikkoWalker.tsx         (animated walker SVG)
│   ├── Reader.tsx              (the book reader)
│   ├── ReaderPage.tsx
│   ├── KaraokeText.tsx         (syllable-highlighted Thai text)
│   ├── AudioPlayer.tsx
│   ├── PageNav.tsx
│   ├── QuizSplash.tsx
│   ├── QuizQuestion.tsx
│   ├── QuizResult.tsx
│   ├── ConfettiBurst.tsx
│   ├── BiomeUnlockCutscene.tsx
│   ├── games/
│   │   ├── TapCards.tsx
│   │   ├── MatchPairs.tsx
│   │   ├── WordHunt.tsx
│   │   ├── LetterTrace.tsx
│   │   ├── StarCatcher.tsx
│   │   └── AudioSprint.tsx
│   └── GamesHub.tsx
```

## 11.3 Parent Dashboard Components

```
/components/
├── parent/
│   ├── DashboardHeader.tsx
│   ├── ChildSwitcher.tsx
│   ├── KpiTile.tsx
│   ├── ReadingTimeChart.tsx
│   ├── VocabularyTracker.tsx
│   ├── ActivityFeed.tsx
│   ├── RecommendationCarousel.tsx
│   └── SettingsPanel.tsx
```

## 11.4 SVG Asset Library

```
/public/
├── avatars/                 (12 profile avatars)
│   ├── tiger-cub.svg
│   ├── elephant-calf.svg
│   ├── cat.svg
│   ├── owl.svg
│   ├── boy-1.svg
│   ├── boy-2.svg
│   ├── girl-1.svg
│   ├── girl-2.svg
│   ├── robot.svg
│   ├── astronaut.svg
│   ├── wizard.svg
│   └── dragon.svg
├── characters/              (story characters)
│   ├── nong.svg
│   ├── ploy.svg
│   ├── yaa-mali.svg
│   ├── ngoh.svg
│   └── pikko-walker.svg
├── icons/
│   ├── star-earned.svg
│   ├── star-locked.svg
│   ├── star-celebrating.svg
│   ├── streak-fire.svg
│   ├── heart-full.svg
│   ├── heart-empty.svg
│   └── lock.svg
├── biomes/                  (background illustrations)
│   ├── meadow.svg
│   ├── forest.svg
│   ├── beach.svg
│   ├── mountain.svg
│   ├── sky.svg
│   └── cosmos.svg
└── audio/
    ├── effects/             (UI sounds)
    └── music/               (background loops)
```

---

# QUICK START FOR CLAUDE CODE

When implementing, follow this order:

1. **Setup design tokens** — paste Section 2.2 into `globals.css`
2. **Generate the 12 profile avatars** — Section 3.3 prompts
3. **Generate the 5 story characters** — Section 4.3 prompts
4. **Build the Avatar.tsx component** — generic loader with ID prop
5. **Build profile picker** — Section 3.4
6. **Build home + book card + reader** — Section 5
7. **Build path view + walker animation** — Section 5.5
8. **Build quiz system** — Section 8
9. **Build first mini-game (Tap Cards)** — Section 9.3
10. **Build parent dashboard** — Section 6
11. **Layer in animations and sounds** — Section 10
12. **Iterate per child user testing**

---

**End of design document.**
