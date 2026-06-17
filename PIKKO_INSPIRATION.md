# PIKKO — Inspiration Todo Math (analyse vidéo)

> **For Claude Code:** This document is the **practical implementation spec** derived from a frame-by-frame analysis of 5 Todo Math gameplay videos (~125s total). It complements `PIKKO_PLATFORM_DESIGN.md` and `DESIGN.md`. Use it as the **visual & UX reference** when building Pikko's child app.

---

## 📋 TABLE OF CONTENTS

1. [Executive Summary — 8 Key Patterns to Copy](#1-executive-summary)
2. [Visual Style System (extracted from Todo Math)](#2-visual-style-system)
3. [Screen-by-Screen Implementation Guide](#3-screen-by-screen) (incl. **Parent Progress Dashboard** §3.6.2)
4. [The Hub-and-Spoke Information Architecture](#4-information-architecture)
5. [Animation & Micro-Interaction Specs](#5-animations)
6. [The Parental Gate (smart implementation)](#6-parental-gate)
7. [Implementation Difficulty Matrix](#7-implementation-difficulty)
8. [Adaptation Map: Todo Math → Pikko](#8-adaptation-map)
9. [Asset Production Plan](#9-asset-production)

---

# 1. EXECUTIVE SUMMARY

After analyzing 72 frames across 5 videos showing the home screen, splash, navigation, collection system, mission map, daily goals, parental gate, and parent dashboard, here are the **8 most reusable patterns** for Pikko:

### ✅ Pattern 1 — Hub-and-spoke home screen
**One BIG primary CTA** ("Daily Adventure"), **two secondary** (Brain Power, Free Choice), **vertical sidebar** with 4 specialized modes. No bottom nav — everything fits on one screen.

### ✅ Pattern 2 — Collection with "?" silhouettes
A **grid of 11 mystery silhouettes** that the child gradually unlocks. Each unlocked item has **multiple trophies** to earn (re-playability). This drives 80% of long-term engagement.

### ✅ Pattern 3 — Multiple progression layers
- **Daily Adventure** (linear stages, the "main quest")
- **Mission** (isometric map with branching, "side quests")
- **Brain Power** (mini-games library)
- **AI Practice** (basic + timed modes)
- **Challenge** (harder mode for replay)

The child never gets bored because **each mode targets a different mood**.

### ✅ Pattern 4 — Today's Goals (3 daily challenges)
Modal popup with **3 progress bars** ("Complete 3 X", "Complete 2 Y", "Complete 2 Z") + green "Go" buttons. Ideal for daily retention without burnout.

### ✅ Pattern 5 — Path with branching map (isometric 2.5D)
**NOT a linear duolingo-style path.** It's a top-down 2.5D map (forest, mountains, dotted path) with **completed nodes (checkmark)**, **current node (highlighted)**, and **locked nodes (🔒)**.

### ✅ Pattern 6 — Parental gate by 3-second hold
"Press the number 'Zero' for 3 seconds." Genius because:
- Adults can read the digit
- Kids can't sustain a 3-second hold consciously
- 6 buttons mixed up, no rote pattern
- Way better than "what's 4+7?" (kids guess)

### ✅ Pattern 7 — Distinct child app vs parent dashboard
Child app = **bright pastel yellow-green**, rounded, playful.
Parent dashboard = **pale blue + clean white**, business-like, tabbed (Profile / Subscription / Settings / Help). Plus a dedicated **Progress Dashboard** (yellow + purple sections) showing: KPIs, recently played items with thumbnails, "Needs More Practice" red dots, and detailed tables sortable by activity or by skill. **This is the screen that justifies the subscription** for parents — see Section 3.6.2.

### ✅ Pattern 8 — Soft, never punitive paywall
Cute mascots in a bubble + single green "Membership" CTA. **No anxiety, no FOMO**. The child sees friendly characters, not a wall.

---

# 2. VISUAL STYLE SYSTEM

> Extracted directly from frame analysis. Use this as the **visual baseline** for Pikko's child app (in addition to existing DESIGN.md tokens).

## 2.1 Color palette (observed from Todo Math)

```css
/* Todo Math primary palette — adapt to Pikko warm tones */
--tm-bg-primary:    #FFE05A;   /* Main yellow background */
--tm-bg-secondary:  #FDF1A8;   /* Lighter yellow accent */
--tm-bg-deep:       #F5C842;   /* Deeper yellow shadow */

--tm-blue-card:     #5189F8;   /* Blue card (Daily Adventure) */
--tm-blue-deep:     #2E5DBE;   /* Deep blue accent */

--tm-purple-card:   #6943C9;   /* Purple card (Brain Power) */
--tm-purple-deep:   #3A1F7A;   /* Deep purple */

--tm-coral-card:    #E85D7A;   /* Coral card (Free Choice) */
--tm-coral-deep:    #B8344E;   /* Deep coral */

--tm-cream:         #FFFCF0;   /* Cards background */
--tm-text-dark:     #2D2D3F;   /* Main text */
--tm-text-light:    #8A8AA0;   /* Secondary text */

/* Status */
--tm-success:       #4FD175;   /* Green CTA */
--tm-locked-grey:   #C5C5D0;   /* Locked items */
```

### How this maps to Pikko (using your existing tokens)

```css
/* Pikko adaptation — keep YOUR brand colors but match Todo Math LIGHTNESS */
--pikko-app-bg:     var(--app-cream);   /* #FFF9EE — your existing */
--pikko-app-deep:   var(--app-cream-deep); /* #FFF4DC */

/* Use Pikko brand colors for the 3 main cards */
--pikko-card-1:     var(--p-blue);      /* #3BAFDA — for "Read a Story" */
--pikko-card-2:     var(--p-purple);    /* #9B74E8 — for "Mini Games" */
--pikko-card-3:     var(--p-orange);    /* #FF6635 — for "Free Read" */
```

## 2.2 Typography (observed)

- **Title font**: rounded sans-serif, **black weight (900)**, slight letter-spacing
- **All caps** for major buttons ("DAILY ADVENTURE", "BRAIN POWER", "FREE CHOICE", "MISSION")
- **Smaller mixed-case** for descriptions ("Level E · Stage 3")
- **Numbers** are HUGE and prominent (352 stars displayed at maybe 32-40px)

For Pikko: stick with **Mitr (Thai sans-serif)** — already in your DESIGN.md, perfect.

## 2.3 The 3D-minimal visual language

This is **Todo Math's signature look** and what makes it instantly distinctive:

- **Soft 3D objects** scattered as decoration (numbers 3, 7, 2 with gentle shadows)
- **No outlines** on illustrations — pure flat colors with **subtle gradients for depth**
- **Pastel tones with one bright accent** (the yellow background pops, everything else is muted)
- **Rounded everything** — no sharp corners anywhere
- **Floor shadows** on floating elements (gives 3D anchoring)

### How to achieve this in CSS/SVG (without 3D engine)

```css
.pikko-3d-element {
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.12));
  background: linear-gradient(135deg, var(--p-orange) 0%, var(--p-orange-lt) 100%);
  border-radius: 24px;
  /* The depth comes from gradient + shadow, NOT actual 3D */
}

.pikko-floor-shadow {
  /* Add an oval shadow on the floor below floating elements */
  position: absolute;
  bottom: -8px; left: 50%;
  width: 60%; height: 8px;
  transform: translateX(-50%);
  background: radial-gradient(ellipse, rgba(0,0,0,0.18) 0%, transparent 70%);
  filter: blur(4px);
}
```

## 2.4 Card system (the dominant UI element)

Todo Math uses **3 types of cards**:

### Type A — Hero Card (Daily Adventure)
- Full-width, rounded-3xl, ~60% screen width
- **Big mascot/illustration** on left (50% of card)
- **Title + subtitle** on right
- **Solid color** background (blue, purple, etc.)
- **Floor shadow** to lift it from background

### Type B — Secondary Cards (Brain Power, Free Choice)
- Smaller, side-by-side
- **Same blue hero** structure but smaller
- **Icon-style decoration** (butterfly, leaves, crayons) in the corner

### Type C — Sidebar Cards (Times Tables, AI, Mission, Collection)
- Vertical stack
- **Circular icon** at top, **text label** below
- **Lock icon** if not unlocked yet
- ~80px wide

---

# 3. SCREEN-BY-SCREEN IMPLEMENTATION GUIDE

> Detailed wireframes + tech notes for each key screen.

## 3.1 SPLASH SCREEN

### What Todo Math does
```
┌─────────────────────────────────────────────────┐
│ [Parents]  [↻]              [Remote Access]     │
│                                                 │
│  ╭───────╮     ╭─────────╮                      │
│  │ Cross │     │  TODO   │   [3]    🌳           │
│  │ Promo │     │  MATH   │                      │
│  │ Card  │     ╰─────────╯       🪵              │
│  ╰───────╯       (logo bubble)                  │
│                  🐛 (tiny mascot)                │
│  🪵       [7]                                   │
│                  ╭───────────╮                  │
│                  │   Enzo  ☁ │                  │
│                  ╰───────────╯       [2]         │
│                  ╭───────────╮                  │
│                  │    GO     │                  │
│                  ╰───────────╯                  │
│                                                 │
│         🌸 [XPRIZE WINNER badge] 🌿              │
└─────────────────────────────────────────────────┘
```

### Pikko adaptation

```
┌─────────────────────────────────────────────────┐
│ [Parents]  [↻]                                  │
│                                                 │
│  ╭───────╮     ╭─────────╮                      │
│  │ Why   │     │  PIKKO  │   [ก]    🌳           │
│  │ Pikko │     │  •••• │      (Thai consonant)  │
│  │ Card  │     ╰─────────╯       🪵              │
│  ╰───────╯                                      │
│                  🐯 (Pikko mascot)              │
│  🪵       [ข]                                   │
│                  ╭───────────╮                  │
│                  │  Léo  ☁  │                  │
│                  ╰───────────╯       [ค]         │
│                  ╭───────────╮                  │
│                  │    GO     │                  │
│                  ╰───────────╯                  │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Tech specs

```tsx
// SplashScreen.tsx
import { motion } from 'framer-motion';

export function SplashScreen() {
  return (
    <div className="min-h-screen bg-[var(--app-cream)] relative overflow-hidden">
      {/* 3D scattered Thai consonants/numbers */}
      <FloatingDecoration char="ก" position={{top:'15%', right:'15%'}} delay={0} />
      <FloatingDecoration char="๓" position={{top:'45%', left:'8%'}} delay={0.5} />
      <FloatingDecoration char="ข" position={{bottom:'30%', right:'8%'}} delay={1} />
      <FloatingTree position={{top:'10%', right:'5%'}} />
      <FloatingTreeStump position={{top:'40%', right:'3%'}} />

      {/* Cross-promo card top-left, rotates every 4s */}
      <CrossPromoCard rotateInterval={4000} />

      {/* Logo bubble in center */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="absolute top-[20%] left-1/2 -translate-x-1/2"
      >
        <PikkoLogo />
      </motion.div>

      {/* Tiny mascot bouncing on the floor */}
      <motion.div
        animate={{ y: [0, -8, 0], x: [0, 12, 0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[55%] left-1/2"
      >
        <PikkoMascot size={48} />
      </motion.div>

      {/* Profile name + GO button */}
      <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 flex flex-col gap-3 items-center">
        <ProfilePill name={name} />
        <button className="btn-primary btn-bounce text-2xl px-12 py-4 rounded-full">
          GO
        </button>
      </div>
    </div>
  );
}

function FloatingDecoration({ char, position, delay }) {
  return (
    <motion.div
      style={position}
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 5, repeat: Infinity, delay, ease: 'easeInOut' }}
      className="absolute text-7xl font-black text-[var(--p-purple)]"
      style={{
        filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.15))',
      }}
    >
      {char}
    </motion.div>
  );
}
```

### Difficulty: ⭐⭐ (medium)
- Decorations: easy (CSS + Framer Motion)
- Logo bubble: easy (SVG)
- Cross-promo rotation: easy (setInterval + key prop)
- Tiny bouncing mascot: medium (looped sequence animation)

## 3.2 HOME / DASHBOARD

### What Todo Math does
```
┌─────────────────────────────────────────────────────┐
│ [←] [👤] Enzo        🪙 ⭐352 [PARENTS] [UPGRADE]    │
├─────────────────────────────────────────────────────┤
│           ┌─────────────────────────┐  ┌──────┐    │
│           │   Today's Goals  ⬇      │  │   3  │ 🔒  │
│           └─────────────────────────┘  └──────┘    │
│                                       Times Tables  │
│  ┌────────────────────────────────┐  Master         │
│  │   🤖                            │                 │
│  │  (mascot       DAILY ADVENTURE │  ┌──────┐       │
│  │   on car)        Level E · 3   │  │  🎯  │       │
│  │                                 │  └──────┘       │
│  │                            ──→ │  AI PRACTICE    │
│  └────────────────────────────────┘                 │
│                                       ┌──────┐       │
│  ┌─────────────┐ ┌──────────────┐    │  🏔️  │       │
│  │ 🦋 BRAIN    │ │ 🌱 FREE      │    └──────┘       │
│  │    POWER    │ │    CHOICE    │  MISSION & CHALL  │
│  └─────────────┘ └──────────────┘                   │
│                                       ┌──────┐       │
│                                       │  👻  │       │
│                                       └──────┘       │
│                                       COLLECTION     │
└─────────────────────────────────────────────────────┘
```

### Pikko adaptation

```
┌─────────────────────────────────────────────────────┐
│ [←] [🐯] Léo         🪙 ⭐12 [PARENTS] [UPGRADE]     │
├─────────────────────────────────────────────────────┤
│           ┌─────────────────────────┐  ┌──────┐    │
│           │   Today's Goals  ⬇      │  │ ABC  │ 🔒  │
│           └─────────────────────────┘  └──────┘    │
│                                       Letters Master│
│  ┌────────────────────────────────┐                 │
│  │   📖                            │  ┌──────┐       │
│  │  (Nong walking  TODAY'S STORY  │  │  🎯  │       │
│  │   to school)     Level 1 · Day 3│  └──────┘       │
│  │                                 │  AI READING     │
│  │                            ──→ │                 │
│  └────────────────────────────────┘  ┌──────┐       │
│                                       │  🗺  │       │
│  ┌─────────────┐ ┌──────────────┐    └──────┘       │
│  │ 🎮 MINI     │ │ 📚 FREE      │  STORY MAP        │
│  │    GAMES    │ │    READ      │                   │
│  └─────────────┘ └──────────────┘  ┌──────┐         │
│                                       │  🃏  │       │
│                                       └──────┘       │
│                                       COLLECTION     │
└─────────────────────────────────────────────────────┘
```

### Tech specs

```tsx
// HomeScreen.tsx
export function HomeScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--app-cream)] to-[var(--p-yellow-50)]">
      {/* Header bar */}
      <HeaderBar avatar="tiger-cub" name="Léo" stars={12} />

      {/* Today's Goals pill (clickable) */}
      <TodaysGoalsPill onClick={openGoalsModal} />

      <div className="grid grid-cols-[1fr_auto] gap-6 px-6">
        {/* Left column: main cards */}
        <div className="flex flex-col gap-4">
          <HeroCard
            illustration={<NongOnPath />}
            title="TODAY'S STORY"
            subtitle="Level 1 · Day 3"
            color="--p-blue"
            onClick={() => openTodaysStory()}
          />

          <div className="grid grid-cols-2 gap-4">
            <SecondaryCard
              icon="🎮"
              title="MINI GAMES"
              color="--p-purple"
              decoration={<ButterflyDecoration />}
            />
            <SecondaryCard
              icon="📚"
              title="FREE READ"
              color="--p-coral"
              decoration={<LeavesDecoration />}
            />
          </div>
        </div>

        {/* Right sidebar */}
        <Sidebar>
          <SidebarItem icon="ABC" label="Letters Master" locked={true} />
          <SidebarItem icon="🎯" label="AI READING" />
          <SidebarItem icon="🗺" label="STORY MAP" />
          <SidebarItem icon="🃏" label="COLLECTION" />
        </Sidebar>
      </div>
    </div>
  );
}
```

### Components needed

```
/components/child/home/
├── HomeScreen.tsx
├── HeaderBar.tsx          // avatar + name + stars + parent btn
├── TodaysGoalsPill.tsx    // clickable pill that opens modal
├── HeroCard.tsx           // big colored card with mascot
├── SecondaryCard.tsx      // smaller side cards
├── Sidebar.tsx            // right column container
└── SidebarItem.tsx        // circular icon + label
```

## 3.3 TODAY'S GOALS MODAL

### What Todo Math does

```
┌─────────────────────────────────────┐
│ Today's Goals                  [×]  │
├─────────────────────────────────────┤
│                                     │
│ [🎮] Complete 3 Daily Adventures    │
│      ━━━━━━━━━━━━━━━━━━━━ 0/3 [▶]  │
│                                     │
│ [🏔️] Complete 2 Missions             │
│      ━━━━━━━━━━━━━━━━━━━━ 0/2 [▶]  │
│                                     │
│ [🎨] Complete 2 Free Mode           │
│      ━━━━━━━━━━━━━━━━━━━━ 0/2 [▶]  │
│                                     │
└─────────────────────────────────────┘
```

### Pikko adaptation

```
┌─────────────────────────────────────┐
│ Today's Goals                  [×]  │
├─────────────────────────────────────┤
│                                     │
│ [📖] Read 3 Stories                 │
│      ━━━━━━━━━━━━━━━━━━━━ 0/3 [▶]  │
│                                     │
│ [🃏] Collect 5 Word Cards           │
│      ━━━━━━━━━━━━━━━━━━━━ 0/5 [▶]  │
│                                     │
│ [🎮] Win 2 Mini Games               │
│      ━━━━━━━━━━━━━━━━━━━━ 0/2 [▶]  │
│                                     │
└─────────────────────────────────────┘
```

### Tech specs

```tsx
// TodaysGoalsModal.tsx
import { motion, AnimatePresence } from 'framer-motion';

export function TodaysGoalsModal({ open, onClose, goals }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div className="bg-white rounded-3xl p-6 w-[90%] max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-black text-2xl">Today's Goals</h2>
                <CloseButton onClick={onClose} />
              </div>
              {goals.map(g => <GoalRow key={g.id} {...g} />)}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function GoalRow({ icon, label, current, total, onGo }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--app-cream)] mb-2">
      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl">
        {icon}
      </div>
      <div className="flex-1">
        <div className="font-bold text-sm">{label}</div>
        <ProgressBar current={current} total={total} />
      </div>
      <button onClick={onGo} className="w-12 h-12 rounded-full bg-[var(--p-yellow)]">
        ▶
      </button>
    </div>
  );
}
```

### Difficulty: ⭐ (easy) — pure Framer Motion modal + progress bars

## 3.4 STORY MAP (Mission-style isometric)

### What Todo Math does

```
┌──────────────────────────────────────────────────┐
│ [←] MISSION                  🪙 ⭐352 [UPGRADE]   │
├──────────────────────────────────────────────────┤
│ [E] Addition within 20 with Regrouping       ☰  │
├──────────────────────────────────────────────────┤
│                                                  │
│       🌲                       🏔️                │
│         🌲     ✓        ✓         👆            │
│            ━━━━━━━━━━━━━━━ 🎯 ──── (current)    │
│      🌲                                          │
│                          🪨    🔒                │
│      🏠     🌲                                   │
│                          🌲       🔒             │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Pikko adaptation — "Pikko Valley Map"

This is THE most important screen for engagement. Adapt as the **Pikko Valley overworld** with biomes (Meadow → Forest → Beach → Mountain → Sky → Cosmos):

```
┌──────────────────────────────────────────────────┐
│ [←] PIKKO VALLEY              ⭐12 [UPGRADE]      │
├──────────────────────────────────────────────────┤
│ Meadow Biome · Story 4 of 6                      │
├──────────────────────────────────────────────────┤
│                                                  │
│         🌲   🌲                  🏔️ (Forest      │
│                  ✓        ✓        biome locked) │
│       🌳    ━━━━━━━━━━━━━━ 🎯  👆               │
│                                  ↘               │
│      🏠 (your house)            🌳    🔒          │
│       Pikko Walker here                          │
│           🌾                     🌲    🔒        │
│                                                  │
│      🐶 (your pet)                               │
└──────────────────────────────────────────────────┘
```

### Tech specs

```tsx
// PikkoValleyMap.tsx
import { motion } from 'framer-motion';

export function PikkoValleyMap({ stages, currentStageId, biome }) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Biome-themed background gradient */}
      <BiomeBackground biome={biome} />

      {/* SVG layer for the dotted path */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600">
        <DottedPath stages={stages} />
      </svg>

      {/* Decorative trees, rocks, houses (positioned absolutely) */}
      <Decoration type="house" position={{x: 100, y: 400}} />
      <Decoration type="tree" position={{x: 200, y: 250}} delay={0.3} />
      <Decoration type="tree" position={{x: 300, y: 300}} delay={0.6} />
      <Decoration type="rock" position={{x: 500, y: 350}} delay={0.9} />

      {/* Stage nodes — completed, current, locked */}
      {stages.map((stage, i) => (
        <StageNode
          key={stage.id}
          stage={stage}
          x={stage.x}
          y={stage.y}
          isCurrent={stage.id === currentStageId}
          isCompleted={stage.completed}
          isLocked={stage.locked}
        />
      ))}

      {/* Pikko Walker (the moving character) */}
      <PikkoWalker
        x={getCurrentStagePosition().x}
        y={getCurrentStagePosition().y}
      />

      {/* Companion pet that follows the walker */}
      <CompanionPet
        targetX={getCurrentStagePosition().x - 30}
        targetY={getCurrentStagePosition().y + 10}
      />
    </div>
  );
}

function StageNode({ stage, x, y, isCurrent, isCompleted, isLocked }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: stage.id * 0.1 }}
      style={{ left: x, top: y, position: 'absolute' }}
      className="w-16 h-16"
    >
      <div className={`
        w-full h-full rounded-full flex items-center justify-center text-3xl
        ${isCompleted ? 'bg-[var(--p-blue)]' : ''}
        ${isCurrent ? 'bg-[var(--p-orange)] animate-pulse-glow' : ''}
        ${isLocked ? 'bg-[var(--star-locked)]' : ''}
        shadow-[0_8px_16px_rgba(0,0,0,0.15)]
      `}>
        {isCompleted && '✓'}
        {isCurrent && '🎯'}
        {isLocked && '🔒'}
      </div>
    </motion.div>
  );
}

function DottedPath({ stages }) {
  // Generate SVG path connecting all stages with dotted line
  const pathD = stages.map((s, i) =>
    i === 0 ? `M ${s.x} ${s.y}` : `L ${s.x} ${s.y}`
  ).join(' ');

  return (
    <path
      d={pathD}
      stroke="rgba(0,0,0,0.2)"
      strokeWidth="3"
      strokeDasharray="6 8"
      fill="none"
      strokeLinecap="round"
    />
  );
}
```

### Difficulty: ⭐⭐⭐ (advanced)
- Isometric look: medium (CSS transforms or pre-baked tile illustrations)
- Path generation: easy (SVG path)
- Walker animation: medium (Framer Motion follow point)
- Pet AI follow: easy (lerp toward walker)

## 3.5 COLLECTION (Word Cards instead of Monsters)

### What Todo Math does

```
┌──────────────────────────────────────────────────┐
│ [←] COLLECTION              🪙 ⭐352 [UPGRADE]    │
├──────────────────────────────────────────────────┤
│ [Mission]                                        │
│ [LEVEL A]              LEVEL E              2/11│
│ [LEVEL B]                                        │
│ [LEVEL C]   ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ │
│ [LEVEL D]   │  🦠  │ │  🦠  │ │  ?   │ │  ?   │ │
│ [✓ LEVEL E] │      │ │      │ │      │ │      │ │
│ [LEVEL F]   │Mons1 │ │Mons2 │ │Mons3 │ │Mons4 │ │
│ [LEVEL G]   └──────┘ └──────┘ └──────┘ └──────┘ │
│ [LEVEL H]   ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ │
│             │  ?   │ │  ?   │ │  ?   │ │  ?   │ │
│ [A.I.]      │      │ │      │ │      │ │      │ │
│ [BRAIN]     │Mons5 │ │Mons6 │ │Mons7 │ │Mons8 │ │
│             └──────┘ └──────┘ └──────┘ └──────┘ │
└──────────────────────────────────────────────────┘
```

### Pikko adaptation — "Word Card Collection"

```
┌──────────────────────────────────────────────────┐
│ [←] WORD COLLECTION           ⭐12 [UPGRADE]      │
├──────────────────────────────────────────────────┤
│ [Family]                                         │
│ [Animals]              ANIMALS              3/12 │
│ [Food]                                           │
│ [Nature]   ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│ [✓ Animals]│ 🐶   │ │ 🐱   │ │ 🐦   │ │  ?   │  │
│ [Body]     │      │ │      │ │      │ │      │  │
│ [Verbs]    │ หมา  │ │ แมว  │ │ นก   │ │  ?   │  │
│ [School]   └──────┘ └──────┘ └──────┘ └──────┘  │
│ [Numbers]  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│             │  ?   │ │  ?   │ │  ?   │ │  ?   │  │
│             │      │ │      │ │      │ │      │  │
│             │  ?   │ │  ?   │ │  ?   │ │  ?   │  │
│             └──────┘ └──────┘ └──────┘ └──────┘  │
└──────────────────────────────────────────────────┘
```

### Tech specs

```tsx
// CollectionScreen.tsx
export function CollectionScreen() {
  const [activeCategory, setActiveCategory] = useState('animals');
  const cards = getCardsByCategory(activeCategory);
  const collected = cards.filter(c => c.collected).length;

  return (
    <div className="min-h-screen bg-[var(--p-purple)]">
      <Header title="WORD COLLECTION" />

      <div className="grid grid-cols-[180px_1fr] gap-6 p-6">
        {/* Sidebar with categories */}
        <div className="flex flex-col gap-2">
          {CATEGORIES.map(cat => (
            <CategoryButton
              key={cat.id}
              active={cat.id === activeCategory}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </CategoryButton>
          ))}
        </div>

        {/* Cards grid */}
        <div>
          <div className="flex justify-between mb-4">
            <h2 className="text-3xl font-black text-white">
              {activeCategory.toUpperCase()}
            </h2>
            <span className="text-2xl font-bold text-white">
              {collected}/{cards.length}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {cards.map(card => (
              <WordCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WordCard({ card }) {
  if (!card.collected) {
    return (
      <div className="aspect-[3/4] rounded-2xl bg-[#5A4A8A] flex flex-col items-center justify-center">
        <span className="text-4xl">?</span>
        <span className="text-xs text-white/50 mt-2">{card.label}</span>
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="aspect-[3/4] rounded-2xl bg-white p-3 flex flex-col items-center justify-center"
      onClick={() => openCardDetail(card)}
    >
      <CardIllustration src={card.illustration} />
      <span className="text-xl font-bold mt-2">{card.thai}</span>
      <span className="text-xs text-gray-500">{card.romanization}</span>
    </motion.button>
  );
}
```

### Card detail view (when tapping a collected card)

```
┌──────────────────┐
│   ⭐⭐⭐          │ ← trophies earned (3 total per word)
│                  │
│      🐶          │ ← big illustration
│                  │
│     หมา         │
│      mǎa        │
│                  │
│    [▶ Hear it]   │ ← play audio
│                  │
│   "Found in:     │
│   La maison de   │
│   Nong" (book #1)│
│                  │
│   [Try Again!]   │ ← replay the lesson for more trophies
└──────────────────┘
```

### Difficulty: ⭐⭐ (medium)
- Grid: easy
- Locked silhouettes: easy (just grayscale + ?)
- Trophy system: medium (state management)
- Card detail modal: easy

## 3.6 PARENT DASHBOARD

> **Updated from analysis of IMG_5521**: this section now includes the **Parent Progress Dashboard** (Section 3.6.2 below) — a detailed pedagogical view that is separate from the basic Profile/Subscription tabs. Critical for parental retention.

### Top-level structure (4 tabs)

```
┌──────────────────────────────────────────────────┐
│ [←] Parents      Remote Access  v8.10  Key:XXX   │
├──────────────────────────────────────────────────┤
│ [Profile] [Subscription] [Settings] [Help]       │
├──────────────────────────────────────────────────┤
│                                                  │
│ My Account            ┌────────────────────┐    │
│ daniel@gmail.com      │ SUBSCRIBE NOW [YES]│    │
│                       └────────────────────┘    │
│ My Purchase Summary                              │
│ Usage period has ended.    [SUBSCRIBE NOW]       │
│                                                  │
│                                                  │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ ▌ Learner's Progress                             │
│ ▌                                                │
│ ▌ ┌─────────────────┐ ┌─────────────────┐       │
│ ▌ │ Enzo ☁           │ │  ⊕  Add new user│       │
│ ▌ │ Level E          │ └─────────────────┘       │
│ ▌ │ [Level E][Progress]                          │
│ ▌ └─────────────────┘                            │
└──────────────────────────────────────────────────┘
```

### Settings tab observed

```
[Settings]
┌─────────────────────────────────────────────┐
│ Main Settings                                │
│   Language          [English ▼]              │
│   Data Collection   [ON  ●]                  │
│   Timer                                      │
│     Play Time       [Unlimited]              │
│     Rest Time       [None]                   │
│   Parental Gate     [Medium]                 │
│                                              │
│ Volume                                       │
│   Background Music  [━━━━━●─]                │
│   Sound Effects     [━━━━━━●]                │
└─────────────────────────────────────────────┘
```

### Pikko adaptation

Use the **same 4-tab structure** but adapt the content:

```tsx
// ParentDashboard.tsx
export function ParentDashboard() {
  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <Header title="Parents" backTo="/" />

      <Tabs defaultTab="profile">
        <TabList>
          <Tab id="profile" icon="👤">Profile</Tab>
          <Tab id="subscription" icon="💳">Subscription</Tab>
          <Tab id="settings" icon="⚙️">Settings</Tab>
          <Tab id="help" icon="❓">Help</Tab>
        </TabList>

        <TabPanel id="profile">
          <AccountInfo />
          <PurchaseSummary />
          <LearnersList />
        </TabPanel>

        <TabPanel id="subscription">
          <PlansComparison />
          <BillingHistory />
        </TabPanel>

        <TabPanel id="settings">
          <SettingRow label="Language">
            <LanguageDropdown />
          </SettingRow>
          <SettingRow label="Data Collection">
            <Toggle defaultOn />
          </SettingRow>
          <SettingGroup label="Timer">
            <SettingRow label="Play Time">
              <SelectBox options={['10min', '15min', '20min', '30min', 'Unlimited']} />
            </SettingRow>
            <SettingRow label="Rest Time">
              <SelectBox options={['None', '5min', '10min', '15min']} />
            </SettingRow>
          </SettingGroup>
          <SettingRow label="Parental Gate">
            <SelectBox options={['Easy', 'Medium', 'Hard']} />
          </SettingRow>
          <SettingGroup label="Volume">
            <SettingRow label="Background Music">
              <Slider />
            </SettingRow>
            <SettingRow label="Sound Effects">
              <Slider />
            </SettingRow>
          </SettingGroup>
        </TabPanel>

        <TabPanel id="help">
          <CuteOctopusMascot />
          <Text>Still need help? We are here to support you.</Text>
          <Button>Need help? Contact us!</Button>
        </TabPanel>
      </Tabs>
    </div>
  );
}
```

### ADD on top of Todo Math (Pikko-specific)

Add **detailed reading analytics** that Todo Math doesn't show:
- Reading time chart (this week)
- Vocabulary mastered counter (with breakdown by category)
- Reading streak (days)
- Recent activity feed
- Recommended next stories
- Email reports settings

### Difficulty: ⭐⭐ (medium) — mostly UI scaffolding

## 3.6.2 PARENT PROGRESS DASHBOARD (deep view — from IMG_5521)

> **The dashboard parents access from clicking "Progress" on a learner's profile.** This is the screen that **justifies the subscription** — parents see proof that the app is actually teaching their child. Mandatory for retention.

### What Todo Math does

```
┌────────────────────────────────────────────────────────────────────┐
│ [👤] Enzo  ·  Level E Curriculum 18% in progress         [CLOSE ✕] │
├────────────────────────────────────────────────────────────────────┤
│ ▌                                                                  │
│ ▌ Progress (yellow tab)                                            │
│ ▌                                                                  │
│ ▌  Description text:    [KPI 1]      [KPI 2]      [KPI 3]          │
│ ▌  "Number of           Complete     Complete     Recommended      │
│ ▌   activities          Activities   Activities   Goal             │
│ ▌   recently            Past 24h     Past 7d                       │
│ ▌   completed."         0            33           7 days / 35      │
│ ▌                                                                  │
│ ▌  Recently Played                                                 │
│ ▌  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐                              │
│ ▌  │📷 │ │📷 │ │📷 │ │📷 │ │📷 │                                  │
│ ▌  └────┘ └────┘ └────┘ └────┘ └────┘                              │
│ ▌  Multi-  Math    Number  Quick   100 Board                       │
│ ▌  Digit   Kicker  Balance Adding  Quiz                            │
│ ▌  Grid    2 days  2 days  2 days  2 days ago                      │
│ ▌  Lvl 4   Lvl 9   Lvl 1   Lvl 17  Lvl 11                          │
│ ▌                                                                  │
│ ▌  [See More ▶]                                                    │
│ ▌                                                                  │
├────────────────────────────────────────────────────────────────────┤
│ ▌ Monsters (purple tab)                                            │
│ ▌                                                                  │
│ ▌  Description:        ⊙ 18%        ┌────┐ ┌────┐                  │
│ ▌  "Mini-assessments;  Monsters of  │ 🦠 │ │ 🦠 │                  │
│ ▌  80% correct         Level E      └────┘ └────┘                  │
│ ▌  answers are needed  2 out of 11  Add a 2-     Number sequence    │
│ ▌  to 'capture' a      Captured     digit num    from 21 to 99     │
│ ▌  monster."                        & multiple   8 days ago        │
│ ▌                                   of 10                          │
│ ▌  [See More ▶]                                                    │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### Two sub-tabs: Progress (yellow) + Monsters (purple)

When parent clicks "See More", a fullscreen modal shows the detailed table.

#### Progress detailed view

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Progress▼]   [Monsters]                                       [CLOSE✕] │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ Activity         Level  Total      More Right  More Wrong  Last Time   │
│                         Completed  Answers     Answers     Played      │
│                                                                         │
│ 🖼 Multi-Digit Grid  4    3          3           0          2 days ago  │
│ 🖼 Math Kicker  ●    9    2          0           2          2 days ago  │
│ 🖼 Number Balance    1    2          2           0          2 days ago  │
│ 🖼 Quick Adding      17   2          2           0          2 days ago  │
│ 🖼 100 Board Quiz    11   2          2           0          2 days ago  │
│ 🖼 Tally Catch  ●    10   1          0           1          2 days ago  │
│ 🖼 Rocket Launch     12   1          1           0          2 days ago  │
│                                                                         │
│ ● Needs More Practice                                                   │
└─────────────────────────────────────────────────────────────────────────┘
```

**Key UX elements:**
- Each row has a **thumbnail screenshot** of the activity (very visual)
- Level shown in a **red circle with number** (clear visual hierarchy)
- **Red dot indicator** on left of activities where wrong > right (= "Needs More Practice")
- Last column has a **circular play button** to launch the activity directly
- Footer legend explains the red dot

#### Monsters detailed view

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Progress]    [Monsters▼]                                      [CLOSE✕] │
├─────────────────────────────────────────────────────────────────────────┤
│ Monster Quizzes              Attempted  Captured  Missed  Last Played   │
│                                                                         │
│ 🦠 Number sequence from 21 to 99    5      4        1     2 days ago    │
│ 🦠 Add a two-digit number ...        2      2        0     2 days ago    │
│ 🦠 Addition within 20                0      0        0     —             │
│ 🦠 Identify 2D shapes...             0      0        0     —             │
│ 🦠 Order two-digit numbers...        0      0        0     —             │
│ 🦠 Solve addition word problems      0      0        0     —             │
│ 🦠 Express length with measur.       0      0        0     —             │
│                                                                         │
│ ● Needs More Practice                                                   │
└─────────────────────────────────────────────────────────────────────────┘
```

**Key UX elements:**
- Each monster has a **thumbnail of the monster character** (collection identity)
- **3 numbers per row**: Attempted, Captured, Missed (color-coded would be ideal)
- Dash "—" for monsters never attempted
- Each row has the **specific pedagogical objective** as the title

### Pikko adaptation — "Reading Progress Dashboard"

Same structure, but for reading progress instead of math:

```
┌────────────────────────────────────────────────────────────────────┐
│ [👤] Léo  ·  Level 1 Curriculum 35% in progress         [CLOSE ✕]  │
├────────────────────────────────────────────────────────────────────┤
│ ▌ Reading Progress                                                 │
│ ▌                                                                  │
│ ▌  Description text:     [KPI 1]      [KPI 2]      [KPI 3]         │
│ ▌  "Number of stories    Stories      Stories      Daily Goal      │
│ ▌  read and quizzes      Read Past    Read Past    Streak           │
│ ▌  passed."              24h          7d                            │
│ ▌                        2            12           5 days           │
│ ▌                                                                  │
│ ▌  Recently Read                                                   │
│ ▌  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐                              │
│ ▌  │📚 │ │📚 │ │📚 │ │📚 │ │📚 │                                  │
│ ▌  └────┘ └────┘ └────┘ └────┘ └────┘                              │
│ ▌  Le chien  La maison Le marché  Yaa Mali  Songkran               │
│ ▌  perdu     de Nong   du dimanche raconte   2 days ago            │
│ ▌  Lvl 1     Lvl 1     Lvl 2      Lvl 2     Lvl 1                  │
│ ▌                                                                  │
│ ▌  [See More ▶]                                                    │
│ ▌                                                                  │
├────────────────────────────────────────────────────────────────────┤
│ ▌ Word Mastery                                                     │
│ ▌                                                                  │
│ ▌  Description:        ⊙ 35%        ┌────┐ ┌────┐                  │
│ ▌  "Quizzes need 80%   Words of     │ 🐶 │ │ 🐱 │                  │
│ ▌  to 'master' a word. Level 1      └────┘ └────┘                  │
│ ▌  Mastered words      14 out of    หมา       แมว                  │
│ ▌  build vocabulary."  40 mastered  3 days   2 days ago            │
│ ▌                                                                  │
│ ▌  [See More ▶]                                                    │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### Detailed Reading Progress table (Pikko)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Story Title              Level  Times Read  Quiz Score  Last Time      │
│                                                                         │
│ 🖼 Le chien perdu          1     2           3/3 ⭐      2 days ago      │
│ 🖼 La maison de Nong  ●    1     1           1/3        2 days ago      │
│ 🖼 Le marché du dim.       2     1           2/3 ⭐      3 days ago      │
│ 🖼 Yaa Mali raconte        2     1           3/3 ⭐⭐     3 days ago      │
│ 🖼 Songkran                1     3           3/3 ⭐⭐⭐    yesterday       │
│                                                                         │
│ ● Quiz Score Below 60% — Re-read recommended                            │
└─────────────────────────────────────────────────────────────────────────┘
```

### Detailed Word Mastery table (Pikko)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Word              Cat.       Encounters  Quizzes Right  Mastered        │
│                                                                         │
│ 🖼 หมา (chien)     Animals    8           5/5            ✓ Yes          │
│ 🖼 แมว (chat)      Animals    6           4/5            ✓ Yes          │
│ 🖼 นก (oiseau)     Animals    3           2/3            Almost         │
│ 🖼 ปลา (poisson)   Animals    1           0/1            New            │
│                                                                         │
│ Mastery: 80%+ correct quiz answers OR 4+ correct encounters             │
└─────────────────────────────────────────────────────────────────────────┘
```

### Tech specs

```tsx
// ParentProgressDashboard.tsx
export function ParentProgressDashboard({ childId }) {
  const [activeView, setActiveView] = useState<'overview' | 'progress' | 'mastery'>('overview');
  const child = useChildData(childId);

  if (activeView === 'overview') {
    return <ProgressOverview child={child} onSeeMore={(view) => setActiveView(view)} />;
  }
  if (activeView === 'progress') {
    return <DetailedReadingProgress childId={childId} onClose={() => setActiveView('overview')} />;
  }
  if (activeView === 'mastery') {
    return <DetailedWordMastery childId={childId} onClose={() => setActiveView('overview')} />;
  }
}

function ProgressOverview({ child, onSeeMore }) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] p-6">
      <Header
        title={`${child.name} · Level ${child.level} Curriculum ${child.progress}% in progress`}
        onClose={() => router.back()}
      />

      {/* Section 1: Reading Progress (yellow accent) */}
      <ProgressSection
        title="Reading Progress"
        accent="--p-yellow"
        description="Number of stories read and quizzes passed."
        kpis={[
          { label: 'Stories Read Past 24h', value: child.storiesPast24h },
          { label: 'Stories Read Past 7d', value: child.storiesPast7d },
          { label: 'Daily Goal Streak', value: `${child.streak} days` },
        ]}
        recentItems={child.recentlyReadStories}
        onSeeMore={() => onSeeMore('progress')}
      />

      {/* Section 2: Word Mastery (purple accent) */}
      <MasterySection
        title="Word Mastery"
        accent="--p-purple"
        description="Quizzes need 80% to 'master' a word. Mastered words build vocabulary."
        progressPercent={child.masteryPercent}
        progressLabel={`${child.wordsMastered} out of ${child.wordsTotal} mastered`}
        recentItems={child.recentlyMasteredWords}
        onSeeMore={() => onSeeMore('mastery')}
      />
    </div>
  );
}

function ProgressSection({ title, accent, description, kpis, recentItems, onSeeMore }) {
  return (
    <div className="bg-white rounded-3xl mb-6 overflow-hidden flex">
      {/* Left side: colored bar with description and "See More" */}
      <div className={`w-48 p-6 flex flex-col justify-between bg-[var(${accent})]`}>
        <div>
          <h2 className="font-black text-xl mb-2">{title}</h2>
          <p className="text-sm">{description}</p>
        </div>
        <button
          onClick={onSeeMore}
          className="bg-white rounded-full px-4 py-2 font-bold text-sm self-start"
        >
          See More ▶
        </button>
      </div>

      {/* Right side: KPIs and recent items */}
      <div className="flex-1 p-6">
        {/* KPI row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {kpis.map(kpi => (
            <div key={kpi.label} className="text-center">
              <div className="text-3xl font-black">{kpi.value}</div>
              <div className="text-sm text-gray-500">{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* Recently played row */}
        <div className="text-sm text-gray-500 mb-2">Recently Read</div>
        <div className="flex gap-3 overflow-x-auto">
          {recentItems.map(item => (
            <RecentItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function RecentItemCard({ item }) {
  return (
    <div className="flex-shrink-0 w-32">
      <div className="aspect-video rounded-xl bg-gray-100 mb-2 overflow-hidden">
        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
      </div>
      <div className="text-xs font-bold truncate">{item.title}</div>
      <div className="text-[10px] text-gray-500">
        {formatRelative(item.lastReadAt)} · Lvl {item.level}
      </div>
    </div>
  );
}

function DetailedReadingProgress({ childId, onClose }) {
  const stories = useStoriesByChild(childId);

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Tab switcher */}
      <div className="flex gap-2 mb-4">
        <Tab active>Progress</Tab>
        <Tab>Word Mastery</Tab>
        <CloseButton onClick={onClose} />
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-left text-xs text-gray-500 border-b">
            <th className="py-2">Story Title</th>
            <th>Level</th>
            <th>Times Read</th>
            <th>Quiz Score</th>
            <th>Last Time</th>
            <th>Read Now</th>
          </tr>
        </thead>
        <tbody>
          {stories.map(story => (
            <tr key={story.id} className="border-b">
              <td className="py-3 flex items-center gap-3">
                {/* Red dot if quiz score < 60% */}
                {story.quizScore < 0.6 && <span className="text-red-500">●</span>}
                <img src={story.thumbnail} className="w-12 h-12 rounded-lg" />
                <span className="font-bold">{story.title}</span>
              </td>
              <td>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-100 text-red-700 text-sm font-bold">
                  {story.level}
                </span>
              </td>
              <td>{story.timesRead}</td>
              <td>
                {story.quizScore !== null ? (
                  <span>
                    {Math.round(story.quizScore * story.quizTotal)}/{story.quizTotal}
                    <StarRating value={story.quizScore} max={1} count={3} />
                  </span>
                ) : '—'}
              </td>
              <td>{formatRelative(story.lastReadAt)}</td>
              <td>
                <button className="w-8 h-8 rounded-full bg-[var(--p-orange)] text-white">
                  ▶
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-xs text-gray-500 mt-4">
        ● Quiz Score Below 60% — Re-read recommended
      </div>
    </div>
  );
}
```

### Why this dashboard is critical

The Parent Progress Dashboard is **the single feature most justifying the subscription** for parents. Without it, the parent thinks "is this app actually teaching my child anything?" and cancels after 1 month.

With this dashboard, the parent:
- **Sees concrete proof** of progress (stories read, words mastered, time spent)
- **Identifies weaknesses** (red dots = need more practice)
- **Can re-launch activities directly** (the ▶ button per row)
- **Tracks long-term mastery** (Word Mastery section)
- **Feels in control** as the parent-coach

### Difficulty: ⭐⭐ (medium)
- Layout: medium (table + cards)
- Data viz: easy (basic KPIs, no complex charts needed)
- Thumbnails: requires generating preview images per story (can be auto-generated from book covers)
- Backend: requires tracking `read events`, `quiz events`, `word encounters` per child

### What backend events are needed

To populate this dashboard, the app must log:

```typescript
// Events to track per child
interface ReadEvent {
  childId: string;
  storyId: string;
  startedAt: Date;
  finishedAt: Date | null;
  timeSpentSeconds: number;
}

interface QuizEvent {
  childId: string;
  storyId: string;
  questionsTotal: number;
  questionsCorrect: number;
  starsEarned: 0 | 1 | 2 | 3;
  takenAt: Date;
}

interface WordEncounterEvent {
  childId: string;
  word: string;          // Thai word
  context: 'story' | 'quiz' | 'minigame' | 'collection';
  contextId: string;     // story id, quiz id, etc.
  wasCorrect: boolean | null; // null if just seen, true/false if tested
  encounteredAt: Date;
}
```

These events feed:
- **Stories Read Past 24h/7d** → COUNT(ReadEvent WHERE finishedAt > X)
- **Quiz scores** → AVG(QuizEvent.starsEarned) per story
- **Word mastery** → "mastered" if encountered ≥4 times AND ≥80% correct
- **Streak days** → days where ≥1 ReadEvent exists

### Recommended add-ons (Pikko-specific, beyond Todo Math)

These are pedagogically valuable for reading specifically:

1. **Reading time chart** — bar chart Mon..Sun (Apple Health style)
2. **Pronunciation difficulties** — list of Thai sounds the child consistently confuses (requires audio quiz tracking)
3. **Tone mastery indicator** — separate progress bar for the 5 Thai tones
4. **Weekly email recap** — auto-sent Sunday: "This week Léo read 5 stories, mastered 12 new words..."

These create even stronger emotional ROI for parents than Todo Math's pure activity tracking.

---

## 3.7 PAYWALL (soft, non-aggressive)

### What Todo Math does

```
┌──────────────────────────────────────────────────┐
│                                                  │
│              🌷  📚  📖                          │
│                                                  │
│          You need to purchase a membership      │
│                  to continue to play.            │
│         Check all the options for your purchase! │
│                                                  │
│            [3]  👹     🤖     👻     [A+]        │
│                  (cute mascots in a line)        │
│                                                  │
│              ╭────────────────╮                  │
│              │   Membership   │                  │
│              ╰────────────────╯                  │
│                                                  │
│  If you see this page even after purchasing...   │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Pikko adaptation

Same structure, Pikko mascots:

```tsx
// PaywallScreen.tsx
export function PaywallScreen() {
  return (
    <div className="min-h-screen bg-[var(--p-blue)] flex flex-col items-center justify-center p-8">
      {/* Subtle background math/letter symbols */}
      <BackgroundDecorations />

      <div className="text-center mb-12">
        <BookIcon className="mx-auto mb-4" />
        <h1 className="text-3xl font-black text-white mb-2">
          You need a membership to continue reading.
        </h1>
        <p className="text-white/80">
          Check all the options for your purchase!
        </p>
      </div>

      {/* Row of mascots */}
      <div className="flex items-end gap-4 mb-8">
        <PikkoMascot variant="boy" size={80} />
        <PikkoMascot variant="elephant" size={100} />
        <PikkoMascot variant="dragon" size={90} />
        <PikkoMascot variant="cat" size={80} />
      </div>

      <button className="bg-[var(--p-green)] text-white text-2xl font-bold px-12 py-4 rounded-full btn-bounce">
        Membership
      </button>
    </div>
  );
}
```

### Difficulty: ⭐ (easy)

---

# 4. INFORMATION ARCHITECTURE

> The home screen has 7 entry points. This is **a lot** but Todo Math handles it elegantly with the **hub-and-spoke** layout.

## 4.1 Pikko's 7 entry points (adapted from Todo Math)

```
                  ┌─────────┐
                  │  HOME   │
                  └─────────┘
                       │
       ┌───────────────┼───────────────┬─────────────┐
       │               │               │             │
   ┌───────┐    ┌──────────┐    ┌──────────┐  ┌──────────┐
   │TODAY'S│    │MINI GAMES│    │ FREE READ│  │SIDEBAR×4 │
   │ STORY │    │          │    │          │  │          │
   └───────┘    └──────────┘    └──────────┘  └──────────┘
                                                     │
                              ┌──────────────────────┼──────────────────────┐
                              │                      │                      │
                          ┌──────────┐         ┌──────────┐           ┌──────────┐
                          │ LETTERS  │         │AI READING│           │STORY MAP │
                          │ MASTER   │         │  PRACTICE│           │          │
                          └──────────┘         └──────────┘           └──────────┘
                                                                            │
                                                                       ┌──────────┐
                                                                       │COLLECTION│
                                                                       │          │
                                                                       └──────────┘
```

## 4.2 Mode purposes (each has a distinct vibe)

| Mode | Purpose | When child uses it |
|---|---|---|
| **Today's Story** (BIG) | The "main quest" — daily progression | Default daily activity, 10-15 min |
| **Mini Games** | Pure fun, no pressure | When tired of reading |
| **Free Read** | Browse & re-read favorites | Comfort/cozy mode |
| **Letters Master** | Drill specific Thai letters | When parent suggests focused practice |
| **AI Reading Practice** | Personalized challenges | For motivated kids who finish goals |
| **Story Map** | Visual progression overview | Weekly check, "where am I going?" |
| **Collection** | Card collecting motivation | Long-term retention engine |

The genius: **a child opens the app and feels they have CHOICES**, not "homework to do."

---

# 5. ANIMATIONS & MICRO-INTERACTIONS

> All these are 100% achievable with **Framer Motion + CSS** (no Lottie needed for MVP).

## 5.1 Observed in Todo Math (priority list)

### A. Hero card bounce (idle)
The mascot on the Daily Adventure card has a **subtle bounce loop** that signals "I'm waiting for you to tap me."

```css
@keyframes hero-mascot-idle {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%      { transform: translateY(-6px) rotate(-2deg); }
}
.hero-mascot { animation: hero-mascot-idle 3s ease-in-out infinite; }
```

### B. Floating decorations
The 3D numbers/trees in the splash screen all **float gently** at different rates.

```tsx
// FloatingDecoration.tsx
<motion.div
  animate={{ y: [0, -14, 0] }}
  transition={{
    duration: 4 + Math.random() * 2,  // randomize 4-6s
    repeat: Infinity,
    delay: Math.random() * 2,         // stagger start
    ease: 'easeInOut'
  }}
>
```

### C. Card press feedback
Every card press gives a **squish** feel.

```tsx
<motion.button
  whileTap={{ scale: 0.94 }}
  whileHover={{ scale: 1.02 }}
  transition={{ type: 'spring', stiffness: 400 }}
>
```

### D. Stage node unlock animation
When a new stage unlocks on the map, it **pops in with a glow**.

```tsx
<motion.div
  initial={{ scale: 0, rotate: -180 }}
  animate={{ scale: 1, rotate: 0 }}
  transition={{
    type: 'spring',
    stiffness: 200,
    damping: 12,
  }}
>
  {/* Star burst SVG behind */}
</motion.div>
```

### E. Walker step bounce
The character on the path **bobs slightly** to convey life.

```css
@keyframes walker-bob {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-4px); }
}
.walker { animation: walker-bob 0.8s ease-in-out infinite; }
```

### F. Cross-promo card rotation
The corner card rotates between 2-3 messages every 4 seconds with a smooth crossfade.

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={currentCardId}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.5 }}
  >
    {currentCard}
  </motion.div>
</AnimatePresence>
```

## 5.2 Sound design (observed)

Todo Math has **distinct sounds** for:
- Tap (soft pop)
- Card flip (whoosh)
- Star earned (magical chime)
- Stage complete (triumphant 3-note)
- Background music (looping ambient)

For Pikko, **license royalty-free packs** from:
- Pixabay Music (free)
- Freesound.org (free)
- Or premium: **Soundsnap** ($30 for educational pack)

---

# 6. PARENTAL GATE (the smart 3-second hold)

This is the **best parental gate I've seen**. Let's implement it exactly.

## 6.1 Spec

```
"Press the number 'Zero' for 3 seconds"

[1]  [0]  [2]
[7]  [6]  [3]
```

### Why it works

1. **Adults can read** "Zero" instantly
2. **Children can read** but can't hold for 3s without help
3. **6 numbers** mixed prevent muscle memory
4. **Random target** each time (could be Three, Seven, etc.)
5. **3-second hold** is too patient for a 5-7 year old

## 6.2 Implementation

```tsx
// ParentalGate.tsx
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const NUMBER_NAMES = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five',
                      'Six', 'Seven', 'Eight', 'Nine'];

export function ParentalGate({ open, onSuccess, onCancel }) {
  const [target, setTarget] = useState(() => Math.floor(Math.random() * 10));
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const numbers = useMemo(() => generateRandomGrid(target), [target]);

  const startHolding = (n) => {
    if (n !== target) {
      // Wrong number — no penalty, just nothing happens
      return;
    }
    intervalRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(intervalRef.current);
          onSuccess();
          return 100;
        }
        return p + (100 / 30); // 3 seconds = 30 ticks at 100ms
      });
    }, 100);
  };

  const stopHolding = () => {
    clearInterval(intervalRef.current);
    setProgress(0);
  };

  return (
    <Modal open={open} onClose={onCancel}>
      <h2 className="text-2xl font-black mb-2">For Parents</h2>
      <p className="mb-4">
        Press the number "<strong>{NUMBER_NAMES[target]}</strong>" for 3 seconds
      </p>

      {/* Progress bar */}
      <div className="w-full h-1 bg-gray-200 rounded-full mb-4">
        <div
          className="h-full bg-[var(--p-orange)] rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {numbers.map(n => (
          <button
            key={n}
            onPointerDown={() => startHolding(n)}
            onPointerUp={stopHolding}
            onPointerLeave={stopHolding}
            className="w-20 h-20 rounded-full bg-[var(--p-yellow)]
                       text-3xl font-black flex items-center justify-center"
          >
            {n}
          </button>
        ))}
      </div>
    </Modal>
  );
}

function generateRandomGrid(target) {
  // Always include target + 5 others
  const others = [];
  while (others.length < 5) {
    const n = Math.floor(Math.random() * 10);
    if (n !== target && !others.includes(n)) others.push(n);
  }
  return shuffle([target, ...others]);
}
```

### Settings option

In the parent settings, add:

```
Parental Gate Difficulty:
  ○ Easy   — Tap target once
  ● Medium — Hold target 3 seconds (recommended)
  ○ Hard   — Hold target 5 seconds + math problem
```

### Difficulty: ⭐⭐ (medium) — pointer events + interval logic

---

# 7. IMPLEMENTATION DIFFICULTY MATRIX

> Honest assessment of each feature's complexity for Claude Code.

| Feature | Difficulty | Tech | Time est. (Claude Code) |
|---|---|---|---|
| Splash screen with floating decorations | ⭐⭐ | Framer Motion + SVG | 2-4 hours |
| Home dashboard layout | ⭐⭐ | React + Tailwind grid | 3-5 hours |
| Hero card with mascot | ⭐⭐ | SVG + CSS animations | 2-4 hours |
| Today's Goals modal | ⭐ | Framer Motion modal | 1-2 hours |
| Sidebar navigation | ⭐ | React + Tailwind | 1-2 hours |
| Story Map (isometric path) | ⭐⭐⭐ | SVG path + Framer | 8-12 hours |
| Walker animation on path | ⭐⭐ | Framer Motion path follow | 3-5 hours |
| Companion pet AI (follow walker) | ⭐⭐ | Lerp toward target | 2-3 hours |
| Collection grid | ⭐⭐ | Grid + state management | 3-5 hours |
| Word card with trophies | ⭐⭐ | Modal + state | 2-3 hours |
| Parental gate (3-sec hold) | ⭐⭐ | Pointer events | 2-3 hours |
| Parent dashboard (4 tabs) | ⭐⭐ | Tabs + forms | 6-10 hours |
| **Parent Progress Dashboard (overview + 2 detailed tables)** | ⭐⭐⭐ | Tables + thumbnails + state + backend events | 12-18 hours |
| Settings panel | ⭐⭐ | Form components | 4-6 hours |
| Soft paywall | ⭐ | Static page | 1-2 hours |
| Sound effects integration | ⭐⭐ | Howler.js | 2-3 hours |
| Background music with toggle | ⭐ | HTML5 audio | 1-2 hours |
| Card press / hover feedback | ⭐ | Framer Motion whileTap | 1 hour |
| Floating idle animations | ⭐ | CSS keyframes | 1-2 hours |
| **Total estimated MVP build** | — | — | **~65-100 hours** |

### What requires HUMAN designer help (not Claude Code)

- Custom Pikko mascot illustrations (3-5 main characters with multiple poses)
- Background scenes for each biome (Meadow, Forest, etc.)
- Polished UI icons (could use Heroicons + customize)
- Sound effects pack (license royalty-free)
- Animated mascot sequences (Lottie file from animator)

**Estimated cost for human help (Phase 2, after MVP traction):** ~$2,000-4,000 one-time
- Illustrator: $1,500-2,500 for character set + biomes
- Sound designer or licensed pack: $200-500
- Optional Lottie animator: $300-1,000 for 5 key animations

---

# 8. ADAPTATION MAP: TODO MATH → PIKKO

| Todo Math element | Pikko equivalent |
|---|---|
| Daily Adventure (math problems) | Today's Story (Thai reading) |
| Brain Power (logic mini-games) | Mini Games (word recognition, audio match) |
| Free Choice (open math) | Free Read (browse story library) |
| Times Tables Master | Letters Master (44 Thai consonants) |
| AI Daily Practice | AI Reading Practice (adaptive level) |
| Mission & Challenge | Story Map (Pikko Valley with biomes) |
| Collection (monsters) | Word Card Collection (Thai vocabulary cards) |
| 11 monsters per level | 12 cards per category (animals, food, etc.) |
| Multiple trophies per monster | Multiple stars per word (read once = ⭐, quiz pass = ⭐⭐, mastery = ⭐⭐⭐) |
| Today's Goals (3 challenges) | Today's Goals (3 reading challenges) |
| Parental gate (digit hold) | Same — exact copy of mechanic |
| Yellow-green cream palette | Cream + Pikko brand colors (orange, blue, purple) |
| Robot mascot "Tally" | Pikko mascot (your existing Pikko character) |
| 3D-minimal visual language | Same — adapt with Thai cultural elements |

---

# 9. ASSET PRODUCTION PLAN

## 9.1 What to make first (MVP minimum)

### Essential illustrations (Phase 1)
1. **Pikko mascot** (your hero character, 1 design + 4 poses)
2. **Companion pet** (1 evolving creature, 5 stages)
3. **5 secondary characters** (Nong, Ploy, Yaa Mali, Ngoh, walker)
4. **Hero card decorations** (3 variants: book, butterfly, leaves)

### Essential UI elements (Phase 1)
1. **48 Thai consonants** rendered as clickable cards
2. **5 biome backgrounds** (Meadow, Forest, Beach, Mountain, Sky)
3. **24 word card illustrations** (12 animals + 12 food for first launch)
4. **Sidebar icons** (5 mode icons)
5. **Stage node** SVG (3 states: completed, current, locked)

### Essential animations (Phase 1)
- Hero mascot idle bounce (CSS)
- Floating decorations (CSS + Framer)
- Walker step (CSS)
- Card press feedback (Framer)
- Stage unlock pop (Framer)
- Today's goals modal slide-in (Framer)

## 9.2 Production approach

```
Phase 1 (MVP, 0-3 months) — ~$0-200 cost
├─ All UI built by Claude Code (SVG + CSS)
├─ Mascot designs: Claude Code generates (you iterate)
├─ Sound effects: free Pixabay packs
├─ Music: 1-2 royalty-free tracks
└─ Result: 70-80% of Todo Math quality

Phase 2 (post-launch, 3-6 months) — ~$2,000-4,000 cost
├─ Hire illustrator for mascot polish (Fiverr/Upwork)
├─ Custom Lottie animations for key moments (5-10)
├─ Premium sound pack
└─ Result: 90-95% of Todo Math quality

Phase 3 (year 2+, post-traction) — ongoing budget
├─ Part-time motion designer
├─ More biomes, mini-games, characters
└─ Result: matches or exceeds Todo Math
```

---

# 🎯 RECOMMENDED IMPLEMENTATION ORDER

For Claude Code, build in this order to maximize early validation:

1. **Splash + profile picker** (existing in PIKKO_PLATFORM_DESIGN.md)
2. **Home dashboard** (this doc, Section 3.2)
3. **Today's Goals modal** (Section 3.3)
4. **Today's Story flow** (build the simplest case: tap → read → quiz → reward)
5. **Word Card Collection** (Section 3.5) — the long-term retention engine
6. **Story Map / Pikko Valley** (Section 3.4) — the spatial overview
7. **Mini Games hub** (1-2 games to start)
8. **Parental Gate** (Section 6)
9. **Parent Dashboard** (Section 3.6) + **Progress Dashboard** (Section 3.6.2) — critical for retention
10. **Paywall** (Section 3.7)
11. **Sound + music integration**
12. **Polish: animations, sound feedback, transitions**

---

# 📌 FINAL NOTES

- **Don't try to copy Todo Math 1:1** — adapt the patterns, but make Pikko's identity distinct (Thai cultural elements, your brand colors, your mascots)
- **Start ugly, iterate** — Claude Code can generate functional UI in days; polish comes later
- **Test with your son first** — he's your best beta tester for the child experience
- **Skip what you don't need** — for MVP, you can skip "AI Practice" and "Letters Master" sidebars. They're nice-to-have, not core
- **The 80/20 rule applies brutally**: Hero card + Today's Goals + Word Collection + Story Map = 80% of the value of Todo Math's UX

**End of inspiration document.**
