# Pikko Landing Page — Design System

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

### Dark hero palette (used in Hero, FeaturesTab, FinalCTA)
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
| Hero | dark purple gradient (above) |
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

Never use inline React styles for gradient text — use CSS classes.

```css
/* globals.css */
.text-gradient      { background: linear-gradient(135deg,#FFD60A,#FF8C35); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.text-gradient-pink { background: linear-gradient(135deg,#FF4C91,#FF6B35); … }
.text-gradient-f0   { background: linear-gradient(135deg,#FF6635,#FF4090); … }
.text-gradient-f1   { background: linear-gradient(135deg,#3BAFDA,#00D2CC); … }
.text-gradient-f2   { background: linear-gradient(135deg,#4CC97C,#00AEEF); … }
```

Pattern for highlighted section title:
```tsx
const word = TITLE_HIGHLIGHT[lang] ?? TITLE_HIGHLIGHT.en;
const idx  = title.indexOf(word);
// split around word → <span className="text-gradient">{word}</span>
```

## Floating orbs (dark sections)

6 orbs with `float-animate`, positioned absolutely:
```tsx
{ top:'14%', left:'5%',  size:52, color:'#FFD60A', opacity:0.9,  delay:'0s'   }
{ top:'68%', left:'3%',  size:24, color:'#FF5757', opacity:0.85, delay:'1.2s' }
{ top:'42%', left:'1.5%',size:16, color:'#00D2AA', opacity:0.75, delay:'2.4s' }
{ top:'8%',  right:'4%', size:20, color:'#FF4C91', opacity:0.8,  delay:'0.6s' }
{ top:'78%', right:'6%', size:38, color:'#FFD60A', opacity:0.7,  delay:'1.8s' }
{ top:'30%', right:'2%', size:14, color:'#00D2AA', opacity:0.65, delay:'3s'   }
```

## Sparkle crosses (dark sections)

4 SVG `+` shapes with `float-animate`, `opacity:0.55`:
```tsx
{ top:'22%', left:'12%',  size:24, delay:0   }
{ top:'55%', left:'20%',  size:16, delay:0.5 }
{ top:'18%', right:'12%', size:20, delay:1   }
{ top:'72%', right:'18%', size:14, delay:1.5 }
```
SVG: `<path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="white" strokeWidth="2.5" strokeLinecap="round" />`

## Radial blobs (dark sections)

Background texture (no filter blur, just radial-gradient divs):
- Pink: `rgba(255,87,87,0.18)` top-left, 500×500
- Teal: `rgba(0,209,167,0.15)` bottom-right, 420×420
- Yellow: `rgba(255,214,10,0.08)` center, 300×300

Light sections (white / #F8F5FF) use smaller purple/green blobs with `filter:blur(48px)`.

## Animations

| Class | Keyframe | Usage |
|---|---|---|
| `float-animate` | `translateY(0→-14px)` 5s ease-in-out | Orbs, badges, sparkles |
| `wiggle` | `rotate(-4→4deg)` 3s | Book SVGs |
| `btn-bounce` | `translateY(0→-7px) scale(1→1.03)` 2.4s | Primary CTA buttons |
| `wave-bar` | `scaleY(0.3→1)` 0.8s | Audio wave bars |
| `anim-slide-up` | `opacity 0→1, translateY 40px→0` 0.6s | Section titles on scroll |
| `anim-pop-in` | `opacity 0→1, scale 0.82→1` 0.55s | Cards on scroll |
| `anim-slide-in-left` | `opacity 0→1, translateX -48→0` 0.65s | Left cards |
| `anim-slide-in-right` | `opacity 0→1, translateX 48→0` 0.65s | Right cards |
| `anim-grow-line` | `scaleX(0→1)` 0.5s | HowItWorks connectors |
| `menu-item-in` | `opacity 0→1, translateY 36→0` 0.6s | Burger menu items |

All scroll-triggered via `useInView(0)` → single ref on container → all children read `.inView`.

## Scroll reveal pattern

```tsx
const titleRef = useInView(0); // for h2
const section  = useInView(0); // for cards grid

// h2:
<div ref={titleRef.ref} className={titleRef.inView ? 'anim-slide-up' : ''} style={{ opacity: titleRef.inView ? undefined : 0 }}>

// card n:
<div className={section.inView ? 'anim-pop-in' : ''} style={{ opacity: section.inView ? undefined : 0, animationDelay: `${i * 0.1}s` }}>
```

## Cards

- **Border radius**: `rounded-3xl` (24px) standard; `rounded-[32px]` for mockup frames; `28px` for pricing
- **Gradient border frame**: outer div `padding:2–3px, background:gradient, borderRadius:28`, inner div solid background
- **Glass reflection strip**: `position:absolute, top:0, height:45%, background:linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)`
- **Box shadow light**: `0 8px 32px rgba(0,0,0,0.08)`
- **Box shadow dark/glow**: `0 28px 64px rgba(124,77,255,0.42)`

## CTA Buttons

| Style | Background | Color | Usage |
|---|---|---|---|
| Primary | `linear-gradient(135deg,#FFD60A,#FF8C35)` | `#1A0845` | Hero, FinalCTA |
| Nav | `linear-gradient(135deg,#FF6635,#FF4C91)` | white | Nav bar |
| Purple | `linear-gradient(135deg,#7C4DFF,#9B6DFF)` | white | Pricing highlight |
| Ghost purple | `#F0EAFF` | `#7C4DFF` | Pricing free plan |
| Ghost white | white | `#7C4DFF` | Pricing family |
| Orange | `linear-gradient(135deg,#FF8C35,#FF6635)` | white | Pricing premium |

All primary CTAs: `font-bold`, `rounded-full`, `btn-bounce`.

## Section title pattern (every section)

```tsx
const TITLE_HIGHLIGHT: Record<string, string> = {
  en: 'word or phrase',
  th: 'คำ',
  fr: 'mot',
  zh: '词', ja: '語', ko: '단어',
};
// In JSX:
{(() => {
  const title = t.section.title;
  const word  = TITLE_HIGHLIGHT[lang] ?? TITLE_HIGHLIGHT.en;
  const idx   = title.indexOf(word);
  if (idx === -1) return <>{title}</>;
  return <>{title.slice(0, idx)}<span className="text-gradient">{word}</span>{title.slice(idx + word.length)}</>;
})()}
```

## Burger menu (desktop)

- z-index 50 (nav) / 40 (overlay)
- Clip-path circle reveal from exact burger button center: `getBoundingClientRect()`
- Opening: 0.75s `cubic-bezier(0.65,0,0.35,1)`, Closing: 0.55s same
- 4 menu items with `menu-item-in` class, `animationDelay: 0.28 + i*0.09s`
- Body scroll lock on open

## i18n

6 languages: `en`, `th`, `fr`, `zh`, `ja`, `ko`.
Shape enforced by TypeScript: `typeof en` constraint — all 6 must match EN structure exactly.
French tone: always "tu" form (commence, passe, touche, etc.).
