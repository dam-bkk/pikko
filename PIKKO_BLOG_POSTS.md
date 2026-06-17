# PIKKO BLOG — Authentic SEO Posts Specification

**For:** Claude Code
**Goal:** Generate 38 blog post versions (10 posts × multiple languages) for the Pikko platform blog
**Tone target:** Authentic personal writing, NOT marketing — but with SEO discipline
**Stack:** MDX or Markdown files, deployed alongside Pikko platform (`/blog/[lang]/[slug].mdx`)

---

## TABLE OF CONTENTS

1. [Authorship & Voice Rules](#1-authorship--voice-rules) — read this first
2. [Universal Post Structure](#2-universal-post-structure)
3. [SEO Discipline](#3-seo-discipline)
4. [Language Adaptation Rules](#4-language-adaptation-rules)
5. [The 10 Posts × 38 Versions Matrix](#5-the-10-posts--38-versions-matrix)
6. [Reference Posts (full text — use as templates)](#6-reference-posts)
   - 6.1 Post #4 in FR (emotional pillar reference)
   - 6.2 Post #7 in EN (utility pillar reference)
7. [Briefs for Remaining Posts](#7-briefs-for-remaining-posts)
8. [Author Personas (sign each post)](#8-author-personas)
9. [Implementation Notes for Claude Code](#9-implementation-notes-for-claude-code)

---

# 1. AUTHORSHIP & VOICE RULES

> **Read this carefully — every post must respect these rules.** A post that breaks these rules is rejected, even if SEO-perfect.

## 1.1 The "Authentic First" mandate

The reader must feel they're reading **a real parent's blog**, not a brand's content marketing. Every post:

- Starts with a **scene, a moment, or an emotion** — never with "Discover" / "Découvrez" / "ค้นพบ"
- Uses **first person singular** ("I", "je", "ฉัน", "私", "저", "我") with a real story
- Names **real-feeling places** (Lyon, Bangkok Sukhumvit, Munich Schwabing, Tokyo Setagaya, Seoul Gangnam, Singapore East Coast)
- Names **real-feeling kids** (Léo, Mali, Nong, Kenta, Min-jun, Wei) — NOT "your child" generically
- Includes **one moment of vulnerability** — admitted failure, doubt, or shame
- Mentions **specific dates or seasons** ("a Tuesday in November", "during Songkran 2024")
- Pikko mentioned **maximum twice** in body, **only after the reader is invested** (around 60-70% of the article), and never in the first 800 words

## 1.2 Banned phrases (across all languages)

Never use:
- "Discover" / "Découvrez" / "ค้นพบ" / "発見" / "발견" / "发现"
- "Revolutionary" / "Révolutionnaire" / "革新的" / "革命性"
- "Guaranteed results"
- "Best app for..."
- "Don't wait" / "Ne tardez pas" / "今すぐ"
- "Join thousands of parents"
- Excessive em-dash superlatives ("the only true Thai reading platform")

## 1.3 Required signals of authenticity

Every post must have **at least 3 of these 6 markers**:

1. **A direct quote from a child** ("*Maman, je sais pas lire.*")
2. **An EDIT update** at the bottom ("EDIT March 2025: since this article, we also tried...")
3. **A confession** ("I felt ashamed — not of him, of myself.")
4. **A digression** ("Speaking of which, this reminds me of..." / "ที่จริงนะ...")
5. **An open question to readers** at the end ("Have you been through this? Tell me in the comments.")
6. **A specific number or product comparison** ("We tried 4 apps before this one — Babbel, Lingokids, DinoLingo, and gokids.app...")

## 1.4 Pikko mention guidelines

Where to mention Pikko:
- ❌ Never in the title
- ❌ Never in the first 4 paragraphs
- ❌ Never as "the solution"
- ✅ Once around 60-70% of post, casually: *"We ended up trying Pikko, mostly for the bedtime stories. But beyond the tool, what really changed was our routine."*
- ✅ Once in a discreet footer: *"This article is part of our reading-with-kids series. Pikko is a Thai reading app for ages 5-9, free trial here."*

---

# 2. UNIVERSAL POST STRUCTURE

Every post follows this skeleton:

```
┌──────────────────────────────────────────────┐
│ FRONTMATTER (YAML)                           │
│   — title, slug, lang, author, date          │
│   — meta_description, og_image               │
│   — keywords, schema_type                    │
├──────────────────────────────────────────────┤
│ TITLE (H1)                                    │
│   — Natural keyword integration              │
│   — Question or statement, NOT command       │
├──────────────────────────────────────────────┤
│ HOOK PARAGRAPH (200-300 words)               │
│   — A scene, a moment                        │
│   — Names, places, dates                     │
│   — One emotion crystal-clear                 │
│   — NO product mention                       │
├──────────────────────────────────────────────┤
│ NARRATIVE BODY (1000-1500 words)             │
│   — 3-4 H2 sections, narrative not listy     │
│   — Personal anecdotes throughout            │
│   — Keywords integrated naturally            │
│   — Photos (real, not stock)                 │
│   — Optional dialogue with kids              │
├──────────────────────────────────────────────┤
│ SOFT MENTION OF PIKKO (100-150 words)        │
│   — At ~65% mark of article                  │
│   — In passing, not as conclusion            │
│   — Honest about limitations                 │
├──────────────────────────────────────────────┤
│ REFLECTIVE CONCLUSION (200 words)            │
│   — What I learned                           │
│   — What I'd do differently                  │
│   — Open question to readers                 │
├──────────────────────────────────────────────┤
│ FAQ (5 questions, schema.org FAQPage)        │
│   — Real questions parents Google            │
│   — Answers under 60 words each              │
├──────────────────────────────────────────────┤
│ FOOTER                                        │
│   — Author signature with photo              │
│   — Series link ("part of our X series")     │
│   — 2-3 internal links to other posts        │
│   — Edit log if applicable                   │
└──────────────────────────────────────────────┘
```

## 2.1 Frontmatter template

```yaml
---
title: "À quel âge un enfant doit savoir lire le thaï ?"
slug: "age-enfant-lire-thai"
lang: "fr"
author: "som-mom"
date: "2026-05-15"
meta_description: "Mon fils a appris à lire le thaï à 7 ans, plus tard que ses cousins. Voici ce que j'ai compris sur les vrais repères de lecture chez les enfants bilingues."
og_image: "/blog/og/age-enfant-lire-thai.jpg"
keywords: ["apprendre thaï enfant", "lire thaï âge", "enfant bilingue", "lukkrueng éducation"]
schema_type: "Article"
reading_time_min: 8
series: "raising-thai-readers"
---
```

---

# 3. SEO DISCIPLINE

## 3.1 Keyword density (CRITICAL)

| Element | Frequency |
|---|---|
| Primary keyword in title | 1× |
| Primary keyword in H2 | 1-2 sections (out of 3-4) |
| Primary keyword in body | 5-7× **MAX** in entire post |
| Primary keyword in meta description | 1× |
| Primary keyword in alt text | 1× (one image) |
| Secondary keywords (3-4) | Each appears 2-3× max |

**Rule of thumb:** if you read the post aloud and hear the keyword more than once per ~300 words, it's overdone.

## 3.2 Internal links

Each post must link to **2-3 other Pikko blog posts**, naturally placed:
- One in the body (relevant aside)
- One in the conclusion (related read)
- One in the footer (series navigation)

## 3.3 External links (authority signal)

Each post should link to **1-2 external authority sources** (Google appreciates this):
- UNICEF Thailand, Thailand Ministry of Education
- Academic papers on bilingualism
- Reputable parenting publications (Parents.com, NPR Life Kit, The Atlantic)

## 3.4 Schema markup

Every post must include `Article` schema. Posts with FAQ sections must add `FAQPage` schema. Use `<script type="application/ld+json">` block in MDX.

## 3.5 Featured snippet targeting

For utility posts (#1, #2, #7, #9), include in the FAQ a **direct, 40-50 word answer to a specific question**. Format the answer in 2-3 short sentences for Google's featured snippet box.

Example:
> **Q: At what age can a child read Thai fluently?**
> A: Most Thai children start recognizing consonants around age 4 and reading short sentences by age 6. Fluency, defined as reading age-appropriate stories without help, is typically reached by age 8-9 — though bilingual children often take 1-2 years longer.

---

# 4. LANGUAGE ADAPTATION RULES

> **Crucial:** these are not translations. Each language version is a **culturally-adapted retelling** of the same story.

## 4.1 Per-language voice guide

### TH — Thai
- Tone: friendly, familiar, emoji acceptable in moderation
- References: ยาย/ตา (grandparents), Songkran, Loy Krathong, Pantip culture
- Sentence length: longer is OK, Thai readers tolerate 2000+ words easily
- Honorifics: use ค่ะ/ครับ tone — feels like a peer parent talking
- Storytelling: detailed, relational, family-oriented

### EN — English
- Tone: conversational, slightly self-deprecating
- References: international, but place-specific (London, Brooklyn, Sydney)
- Sentence length: vary, with strategic shorter sentences for impact
- Format: more white space, occasional bold for scannability
- Storytelling: direct, personal, with gentle humor

### FR — French
- **Tutoiement always** ("tu" form)
- Tone: introspective, slightly literary
- References: Lyon, Paris, Brussels, Geneva, Montreal — francophone Asian diaspora
- Sentence length: longer, more flowing
- Format: less bold, more paragraph-driven
- Storytelling: reflective, philosophical undertones welcome

### JP — Japanese
- Tone: polite, indirect, humble
- References: Tokyo Setagaya, Yokohama, Osaka — Thai-Japanese mixed families
- Sentence length: short paragraphs, frequent breaks
- Format: very polite, frequent honorifics
- Storytelling: indirect ("it seems that...", "I felt that maybe..."), minimal "I"
- Avoid being too direct or boastful

### KO — Korean
- Tone: respectful but direct, focus on outcomes
- References: Seoul Gangnam, Busan, Incheon — Thai-Korean families
- Sentence length: shorter sentences, clear structure
- Format: scannable, with numbers and concrete data
- Storytelling: pragmatic, "here's what worked" energy
- Confident but never boastful

### ZH — Chinese (Simplified)
- Tone: pragmatic, data-oriented
- References: Singapore, Shanghai, Taipei, Hong Kong — overseas Chinese with Thai connections
- Sentence length: medium, well-structured
- Format: comparison tables welcomed, numbers love
- Storytelling: factual + relatable, frequent comparisons to other parents' approaches

## 4.2 What stays the same across languages

- The **emotional arc** of the post
- The **core argument** or insight
- The **author's vulnerability moment**
- The **structural skeleton** (Section 2)

## 4.3 What MUST change

- **Author name** (per-language Author Persona — see Section 8)
- **Setting/location** (Lyon → Tokyo → Seoul → Bangkok)
- **Cultural references** (foods, schools, holidays, products)
- **Specific external links** (each language gets local authoritative sources)
- **FAQ questions** (what people Google in that language varies)

---

# 5. THE 10 POSTS × 38 VERSIONS MATRIX

| # | Title (canonical) | Pillar | Persona | TH | EN | FR | JP | KO | ZH |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Lecture thaï lente — 7 méthodes | Practical | P3 | ✅ | ⚪ | ⚪ | ✅ | ✅ | ⚪ |
| 2 | À quel âge un enfant lit le thaï | Practical | P2 | ⚪ | ✅ | ✅ | ⚪ | ⚪ | ⚪ |
| 3 | Teach half-Thai kids abroad | Practical | P2 | ⚪ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 4 | The grandmother letter | Emotional | All | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 5 | My son refused Thai — 60 days | Emotional | P2 | ⚪ | ✅ | ✅ | ⚪ | ⚪ | ⚪ |
| 6 | 5 Thai mothers abroad share | Emotional | P2 | ⚪ | ✅ | ⚪ | ⚪ | ⚪ | ⚪ |
| 7 | 100 essential Thai words by age 7 | Culture | P1+P2 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 8 | Why intl school kids forget Thai | Culture | P1 | ✅ | ✅ | ⚪ | ⚪ | ⚪ | ⚪ |
| 9 | 5 Thai tones for non-Thai parents | Culture | P2 | ⚪ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 10 | 10 traditional Thai folktales | Culture | All | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| | **Total versions: 38** | | | 5 | 9 | 7 | 6 | 6 | 5 |

---

# 6. REFERENCE POSTS

> **These two posts are the gold standard.** Read them carefully. Every other version of every other post should match this voice and structure.

---

## 6.1 REFERENCE POST — Post #4, French (Emotional Pillar)

**Slug:** `lettre-de-grand-mere`
**Author:** Som (mom of Léo, 7, based in Lyon)
**Title:** Le message de ma mère que mon fils ne pouvait pas lire

---

### Frontmatter

```yaml
---
title: "Le message de ma mère que mon fils ne pouvait pas lire"
slug: "lettre-de-grand-mere"
lang: "fr"
author: "som-mom"
date: "2026-05-12"
meta_description: "Ma mère a envoyé un message à mon fils. Il a 7 ans. Il n'a pas pu le lire. Voilà ce que j'ai compris sur l'apprentissage du thaï pour les enfants lukkrueng."
og_image: "/blog/og/lettre-grand-mere.jpg"
keywords: ["enfant lukkrueng", "apprendre thaï enfant", "famille bilingue", "garder langue maternelle"]
schema_type: "Article"
reading_time_min: 9
series: "raising-thai-readers"
---
```

### Body

# Le message de ma mère que mon fils ne pouvait pas lire

Ma mère m'a envoyé un message LINE en novembre dernier. Trois lignes, en thaï, comme toujours. Elle voulait demander à mon fils Léo s'il préférerait du *moo ping* ou du *khao mun gai* pour son anniversaire — son cadeau, c'était de prendre l'avion depuis Khon Kaen jusqu'à Lyon avec une valise pleine de mangues séchées, comme chaque année.

Léo a 7 ans. Il parle thaï avec moi (mal, mais il parle). Il comprend quand sa grand-mère lui parle au téléphone. Il sait dire *sawatdee ka* en mettant les mains comme il faut. Mais ce soir-là, j'ai vu son visage se fermer quand je lui ai tendu mon écran.

« Maman, je sais pas lire. »

J'ai eu honte. Pas de lui — de moi. Comment j'avais laissé passer ça ?

## Le moment où j'ai compris ce que j'avais perdu de vue

Je suis née à Surin, dans le nord-est. Ma mère est thaï, mon père aussi. J'ai grandi en thaï, j'ai appris le français au collège, j'ai rencontré Pierre à l'université à Lyon, on s'est mariés ici, et Léo est né dans une clinique du 7ème arrondissement un matin pluvieux de mars 2018.

Pendant ses trois premières années, je lui parlais thaï tout le temps. Sa première phrase complète, c'était *« mae ja, kin khao reu yang ? »* (« Maman, t'as mangé ? »). Je rigolais avec ma mère sur Skype. *« Il sera bilingue, » disait-elle. « Il pourra parler aux gens de la famille. »*

Et puis l'école est arrivée.

À 3 ans, la maternelle française a tout aspiré. Les copains, les chansons, les dessins animés, les histoires du soir. Léo a continué à parler thaï avec moi mais c'est devenu plus mou, plus court. *« Maman, on peut parler français ? C'est plus facile. »*

J'ai cédé. Pas tout de suite, pas complètement, mais petit à petit. Le français était partout, le thaï c'était juste maman le soir. Et maman était fatiguée.

Puis vint le COVID, puis vint la rentrée en CP, puis vint le moment où on s'est rendu compte qu'il y avait une vraie différence entre **parler** une langue et **lire** une langue. Et personne ne lui avait jamais appris à lire le thaï. Pas parce qu'on avait décidé que non — juste parce qu'on n'y avait pas pensé. L'oral suffisait, croyions-nous.

Ce soir de novembre, en lui tendant mon téléphone, j'ai compris qu'on s'était trompés.

## Pourquoi les enfants lukkrueng perdent le thaï écrit en premier

J'en ai parlé avec d'autres mamans thaïlandaises à Lyon. Une dans un groupe Facebook, deux à la fête de l'école française thaïe (oui, ça existe, le samedi matin). La même histoire chez tout le monde, à quelques détails près.

Le thaï oral résiste un peu. Tant qu'il y a une grand-mère, un voyage, un appel vidéo. Mais le thaï écrit, c'est différent. Pour lire le thaï, il faut :

- Connaître **44 consonnes** (alors que le français en a 20)
- Maîtriser **5 tons** (le français n'en a aucun)
- Reconnaître les **voyelles courtes et longues** (qui changent le sens des mots)
- Lire **sans espaces entre les mots** (le thaï s'écrit en flot continu)

Apprendre tout ça demande des **heures hebdomadaires régulières** pendant des années. Or l'enfant bilingue a déjà l'école française qui réclame ses heures. Le thaï écrit devient ce qu'on remet à plus tard.

Et plus tard, ça ne vient pas.

Ma copine Aï, infirmière à Villeurbanne, mère de jumelles de 9 ans : *« Je leur ai mis un livre thaï dans les mains à 6 ans. Elles m'ont regardée comme si je leur avais donné un cours d'arabe. Elles ont refusé. J'ai pas insisté. J'aurais dû. »*

## Les trois mois suivants — ce qu'on a essayé

Après le message de ma mère, j'ai pris ça au sérieux. J'ai regardé ce qui existait. Voici ce que j'ai testé en 3 mois.

**Le cahier d'écriture thaï commandé sur Lazada.** Léo s'est ennuyé en 4 jours. Trop scolaire, trop répétitif. *« On peut faire autre chose ? »* Abandonné.

**Les vidéos YouTube en thaï pour enfants.** Bien pour l'oral et l'oreille, mais ça ne lui apprenait pas à lire. Et l'algorithme YouTube finissait toujours par le ramener vers du Pokémon en français.

**Une prof particulière de thaï** trouvée via un groupe Facebook expat. 35 €/heure, deux fois par semaine. Léo l'a aimée mais après un mois, on a arrêté — pas le budget pour tenir 2 ans à ce rythme.

**Une appli appelée Pikko**, qu'une amie m'a recommandée. C'est une app de lecture thaï pour enfants 5-9 ans avec des petits livres illustrés et de l'audio. Léo l'a trouvée pas mal — surtout les histoires courtes du soir, où il pouvait écouter en suivant le texte avec son doigt. C'est pas magique, et il y a encore beaucoup de mots qu'il ne reconnaît pas. Mais c'est devenu un rituel : 10 minutes avant de dormir, après l'histoire en français.

Ce qui a vraiment changé, je crois, c'est pas l'outil — c'est qu'on a arrêté de remettre à demain. On a accepté que ce serait long, que ça ne marcherait pas tous les jours, et qu'il y aurait des soirs où Léo dirait *« non, j'ai pas envie »* et qu'on respecterait ça.

## Trois mois après, où on en est

Léo n'est pas devenu un lecteur thaï. Soyons honnête. Mais il reconnaît son prénom écrit en thaï (เลโอ). Il sait lire *แม่* (maman) et *พ่อ* (papa). Il peut reconnaître les noms des fruits qu'il aime — *มะม่วง* (mangue), *กล้วย* (banane).

Surtout, quand ma mère lui a renvoyé un message LINE le mois dernier, il a essayé. Il a buté, il a demandé de l'aide, mais il a essayé. Il n'a pas refusé.

C'est là, je crois, le vrai début.

## Ce que je dirais à une autre maman dans ma situation

Je ne suis pas experte. Je suis juste une mère qui s'est rendu compte trop tard que je n'avais pas tout bien fait. Mais voici ce que j'aurais voulu qu'on me dise il y a 3 ans :

**Commence avant que ce soit "nécessaire".** À 4-5 ans, l'enfant est curieux et n'a pas encore l'idée que c'est "difficile". À 7 ans, il sait déjà que c'est dur, et c'est déjà un combat.

**Vise la régularité, pas la perfection.** 10 minutes par jour vaut mieux que 2 heures le dimanche. Le cerveau d'un enfant a besoin de répétition spacée.

**Trouve un rituel sensoriel.** Le moment de l'histoire du soir, le moment du goûter, le moment de la voiture. L'apprentissage colle mieux à un moment qu'à un horaire.

**Ne mets pas la pression.** Si l'enfant refuse un soir, ce n'est pas grave. Si tu mets la pression, il va associer le thaï à la frustration. Et là, c'est foutu.

**Accepte que ça ne sera pas comme un Thaï né en Thaïlande.** Léo ne lira jamais le thaï comme moi. Il lira le thaï d'un enfant lukkrueng qui vit à Lyon. C'est différent. C'est suffisant.

---

Si tu lis ça et que tu reconnais ton enfant, tu n'es pas seule. On est plein dans cette situation. Tu peux m'écrire en commentaire (ou par DM), je réponds toujours.

**Et toi, ta mère t'envoie des messages que ton enfant ne peut pas lire ?**

### FAQ

**À quel âge un enfant lukkrueng devrait-il commencer à apprendre à lire le thaï ?**
Idéalement entre 4 et 6 ans, quand l'enfant est encore curieux et n'a pas développé d'aversion pour les défis linguistiques. À partir de 7-8 ans, c'est encore possible mais demande plus de patience.

**Combien de temps faut-il pour qu'un enfant bilingue sache lire le thaï ?**
Avec une pratique régulière (10-15 minutes par jour), il faut compter environ 18-24 mois pour atteindre une lecture autonome de textes simples (5-7 ans). Pour la fluidité, comptez 3-4 ans.

**Mon enfant refuse complètement de lire en thaï. Que faire ?**
Le forcer aggrave la situation. Reprends par l'oral et l'audio (chansons, histoires racontées), introduis l'écrit par des mots qu'il connaît déjà (son prénom, des aliments aimés), et associe l'apprentissage à un moment plaisant (avant le coucher, le goûter).

**Faut-il que l'autre parent (non-thaï) apprenne aussi le thaï ?**
Pas nécessairement, mais c'est un bonus énorme. Si le parent non-thaï montre de l'intérêt et apprend même quelques mots, l'enfant comprend que le thaï a de la valeur dans la famille — pas juste avec maman.

**Est-ce que les apps de lecture thaï sont vraiment utiles pour les enfants lukkrueng ?**
Elles peuvent l'être si elles sont bien conçues — c'est-à-dire avec audio natif, niveau progressif et pas de pression. Mais aucune app ne remplace le rituel parent-enfant. Vois-les comme un outil complémentaire, pas comme une solution.

---

**À propos de l'auteur :** Som est née à Surin, en Thaïlande. Elle vit à Lyon depuis 12 ans avec son mari Pierre et leur fils Léo. Elle écrit sur le bilinguisme, l'éducation, et ce qu'on transmet à ses enfants quand on vit loin de son pays.

**Cet article fait partie de notre série [« Élever des lecteurs thaïs »](/fr/blog/series/raising-thai-readers).**

Liens internes :
- [À quel âge un enfant doit-il savoir lire le thaï ?](/fr/blog/age-enfant-lire-thai)
- [Mon fils refusait le thaï — ce qui a changé en 60 jours](/fr/blog/mon-fils-thai-60-jours)
- [Les 5 tons thaïs expliqués aux parents non-thaï](/fr/blog/5-tons-thai-parents)

**EDIT (mars 2026) :** Depuis cet article, Léo a commencé à reconnaître environ 80 mots thaïs. Il n'est pas autonome mais il essaie. Sa grand-mère lui envoie maintenant des messages plus courts et plus simples, exprès. C'est devenu un jeu. Je crois que c'est ça le bon rythme.

---

## 6.2 REFERENCE POST — Post #7, English (Utility Pillar)

**Slug:** `100-essential-thai-words-age-7`
**Author:** Anna (mom of Mali, 8, based in Brooklyn, NY)
**Title:** The 100 Thai Words I Wish My Daughter Had Learned by Age 7

---

### Frontmatter

```yaml
---
title: "The 100 Thai Words I Wish My Daughter Had Learned by Age 7"
slug: "100-essential-thai-words-age-7"
lang: "en"
author: "anna-mom"
date: "2026-05-18"
meta_description: "After three years of trying to teach my half-Thai daughter Mali to read Thai, I finally made a list of the 100 words that would have made everything easier. Free PDF."
og_image: "/blog/og/100-thai-words.jpg"
keywords: ["essential Thai words", "teach Thai to kids", "half Thai children language", "basic Thai vocabulary"]
schema_type: "Article"
reading_time_min: 11
series: "raising-thai-readers"
---
```

### Body

# The 100 Thai Words I Wish My Daughter Had Learned by Age 7

The first time I really realized Mali couldn't read Thai was at a Thai restaurant in Brooklyn last June. Pim, the owner, slid a kid's menu across the table — a folded paper with cartoon noodles and Thai script. Mali, who had just turned 8, looked at it for two seconds, then turned to me. "*Mom, what does this say?*"

I read it for her. Then we ordered. Pim smiled politely, but I caught her glance at me — that knowing look Thai aunties have. The look that says: *your kid doesn't read Thai, huh?*

I said something light. Mali went back to her drawing. But that menu has stayed in my mind for almost a year.

## Why I'm writing this list

I've spent the better part of three years trying various approaches to teach my daughter Thai. Some worked, most didn't. We tried flashcards (she hated them), Thai Saturday school (we lasted six months, the commute killed us), YouTube channels (entertaining but not progressive), and a neighborhood tutor who was lovely but expensive at $50/hour.

What I never had was a clear list of **what mattered most**.

Most resources I found online were either too academic (a list of all 44 consonants in textbook order, which is useless for a kid) or too random (a list of "fun Thai words" that mixed greetings with words for cosmic concepts). Nothing said: *"these are the 100 words that, if your child knows them, they can navigate 80% of daily Thai life as a kid."*

So I made one. Three years late, but here it is.

## How I built this list

I asked four people to help me:
- My mother, who taught Thai in primary school in Chiang Rai for 22 years
- Two Thai-American friends with kids the same age as Mali
- A linguist friend at NYU who specializes in heritage language acquisition

We started with the **frequency lists** of children's Thai books (yes, they exist — published by the Ministry of Education). Then we filtered for words a 7-year-old would actually need: family, food, body parts, common verbs, school, animals, feelings, time.

The result is the list below. I broke it into 10 categories of 10 words each.

## The 100 essential Thai words for a child by age 7

### 1. Family (10 words)

| Thai | Romanization | English |
|---|---|---|
| แม่ | mâe | mother |
| พ่อ | phâw | father |
| ยาย | yaai | grandmother (maternal) |
| ตา | taa | grandfather (maternal) |
| ย่า | yâa | grandmother (paternal) |
| ปู่ | bpùu | grandfather (paternal) |
| พี่ | phîi | older sibling |
| น้อง | náwng | younger sibling |
| ลูก | lûuk | child |
| ครอบครัว | khrâwp khrua | family |

### 2. Food (10 words)

ข้าว, น้ำ, ผลไม้, ข้าวเหนียว, มะม่วง, กล้วย, ส้มตำ, ก๋วยเตี๋ยว, ไข่, ขนม

(Rice, water, fruit, sticky rice, mango, banana, papaya salad, noodles, egg, snack/sweet)

### 3. Body parts (10 words)
หัว, ตา, ปาก, มือ, ขา, ท้อง, หู, จมูก, ผม, ฟัน

### 4. Common verbs (10 words)
กิน, นอน, อ่าน, เขียน, เล่น, รัก, ไป, มา, ทำ, อยู่

### 5. School (10 words)
โรงเรียน, ครู, นักเรียน, หนังสือ, ดินสอ, ปากกา, การบ้าน, เพื่อน, ห้อง, เรียน

### 6. Animals (10 words)
หมา, แมว, นก, ปลา, ช้าง, ม้า, วัว, ไก่, ลิง, เสือ

### 7. Feelings (10 words)
ดี, ไม่ดี, รัก, โกรธ, กลัว, ดีใจ, เสียใจ, เหนื่อย, หิว, ง่วง

### 8. Time (10 words)
วัน, เดือน, ปี, เช้า, เย็น, กลางคืน, วันนี้, พรุ่งนี้, เมื่อวาน, ตอนนี้

### 9. Numbers (10 words)
หนึ่ง, สอง, สาม, สี่, ห้า, หก, เจ็ด, แปด, เก้า, สิบ

### 10. Polite words & questions (10 words)
ครับ, ค่ะ, สวัสดี, ขอบคุณ, ขอโทษ, ใช่, ไม่ใช่, ทำไม, อะไร, ที่ไหน

## Why these 100 and not others

You'll notice this list is **boring**. Deliberately. Everyday boring.

Some lists I've seen online include words like *จิตใจ* (mind/heart) or *จักรวาล* (universe). Beautiful words, but a 7-year-old doesn't need them. Mali doesn't need to debate philosophy in Thai with her grandmother — she needs to ask if she can have more rice.

The frequency principle is simple: a child who **owns** the 100 most common words can build sentences, follow simple stories, and feel confident enough to keep going. A child who learns 100 random impressive words can recite vocabulary but freezes the moment a real conversation starts.

This is also why my list is **heavy on verbs and family terms** and light on adjectives. Kids talk to family. They eat, sleep, play. They don't yet need *magnificent* or *mysterious*.

## How we're using this list at home

I printed the 100 words on cards. Two columns: Thai script on one side, English + romanization on the other. We don't drill them. Instead:

- **One word per dinner** — Mali asks me one new word during dinner. We talk about it, use it in a few sentences, and that's it.
- **Bedtime story integration** — When I read her a Thai story (currently a slim book my mother sent), I underline any of the 100 words she encounters.
- **WhatsApp messages with Yaay** — Her grandmother now sends voice messages with at least one written word. Mali tries to read the word before the audio plays.

We also use a few apps to fill the gap. Lingokids didn't have Thai. DinoLingo had Thai but felt expensive at $19/month. We landed on Pikko, which is Thai-specific and quieter — short illustrated stories with audio. It's been fine for Mali. Not magic, but useful for the bedtime ritual. The point isn't really the app; it's that we read together every night now, even just for 8 minutes.

## What I'd do differently if I started over

If I were back at year zero — Mali at age 4 — I'd do these three things:

1. **Print this list and put it on the fridge.** Not as a goal, but as a reminder. One word per week. By age 6, that's 100 words.

2. **Stop translating immediately.** When Mali asked me what something meant in Thai, I'd say "what do you think?" and let her figure it out. Translation kills the brain's pattern-recognition.

3. **Sing more.** Songs cement vocabulary in ways flashcards never will. *Chang Chang Chang* (the elephant song) taught Mali animal names better than any drill.

I can't go back. But maybe you can.

---

**Want this list as a printable PDF?** [Download it here](/blog/downloads/100-thai-words.pdf) (free, no email required).

**Have words I missed?** Tell me in the comments. I'll add them to version 2.

### FAQ

**At what age should a child know these 100 Thai words?**
Most heritage Thai children can understand these 100 words orally by age 4-5. Reading them is a separate skill, typically reached by age 7-8 with regular practice (10-15 minutes daily over 18 months).

**Are these the same words used in Thai schools?**
Yes — about 70 of these words are in the standard Thai Grade 1 curriculum. The other 30 are everyday family/food words that schools assume kids already know orally.

**My child speaks Thai but doesn't read it. Where do I start?**
Start with this list, but in reverse: pick 5 words your child already says aloud, then introduce them in written form. Rebuilding orality-to-text is faster than starting from scratch.

**Should I teach Thai script (consonants/vowels) before words?**
No. Teach whole words first. Children learn to read in patterns, not in alphabetic sequence. The script awareness comes naturally as they recognize more words.

**How many of these words does an adult Thai speaker know?**
A native Thai adult uses these 100 words probably 200-300 times a day. They are the bedrock of daily life. That's why mastering them gives a child enormous functional confidence.

---

**About the author:** Anna is a Thai-American mother of one, living in Brooklyn. She works as a UX designer and writes about heritage language, parenting, and the messy beautiful work of raising bilingual kids in America.

**This post is part of our [Raising Thai Readers](/en/blog/series/raising-thai-readers) series.**

Related reading:
- [How to Teach Thai Reading to Half-Thai Kids Living Abroad](/en/blog/teach-thai-half-thai-kids)
- [The 5 Thai Tones, Explained for Non-Thai Parents](/en/blog/5-thai-tones-non-thai-parents)
- [10 Traditional Thai Folktales Every Child Should Know](/en/blog/10-thai-folktales)

**EDIT (May 2026):** A few readers asked why I didn't include words for school subjects. Honest answer: my own Thai school vocabulary is rusty, and Mali's school is American. If your child attends a Thai-language program, you'll need to add about 20 subject-specific words.

---

# 7. BRIEFS FOR REMAINING POSTS

> Each brief below tells Claude Code: **canonical title**, **per-language adaptations**, **persona target**, **keywords**, **unique narrative hook**, and **FAQ seeds**. Use the reference posts (Section 6) for tone and structure.

## 7.1 Post #1 — Lecture thaï lente — 7 méthodes

**Pillar:** Practical | **Persona:** P3 (Thai mass market, mothers worried about their child's reading speed)

### Canonical premise
A Thai mom realizes her child is reading Thai slower than peers in Prathom 2. After consulting teachers and experimenting, she shares 7 methods that worked.

### Versions to generate

#### TH version
- **Slug:** `lukkok-an-thai-cha-7-witi`
- **Title:** "ลูกของคุณอ่านภาษาไทยช้ากว่าเพื่อนหรือเปล่า? 7 วิธีฝึกที่ใช้ได้จริง"
- **Author:** Khun Ploy (Bangkok Nonthaburi mom, civil servant)
- **Setting:** Public school in Nonthaburi, daughter Nam in P2
- **Hook:** Parent-teacher meeting where the teacher says "Nam reads, but slowly compared to her classmates"
- **Keywords:** ฝึกอ่านภาษาไทย, ลูกอ่านช้า, สอนลูกอ่านไทย
- **Unique elements:** Reference Pantip parenting threads, Thai school context, มาตรฐานการอ่าน Prathom 2, ครู feedback

#### JP version
- **Slug:** `tai-go-yomi-osoi-7-houhou`
- **Title:** "子どもがタイ語を読むのが遅い?7つの方法を試してみた話"
- **Author:** Yuki (Thai mom married to Japanese, lives in Yokohama, daughter Hana in Japanese school)
- **Setting:** Yokohama, daughter attending Japanese local school + Saturday Thai class
- **Hook:** Hana's frustration during Saturday Thai class compared to Tokyo Thai community kids
- **Keywords:** タイ語学習, バイリンガル子育て, タイ語読み聞かせ
- **Unique elements:** Thai-Japanese mixed family dynamics, weekend Thai school context, comparison with monolingual Thai peers

#### KO version
- **Slug:** `taeguk-eo-eullik-neurin-7-bangbeob`
- **Title:** "우리 아이 태국어 읽기가 느리다면? 효과적인 7가지 방법"
- **Author:** Min-Ji (Thai mom in Seoul, married to Korean, son Joon in Korean elementary)
- **Setting:** Seoul Gangnam district, Korean primary school
- **Hook:** Korean-Thai mom realizes Joon can't keep up at the annual Thai temple gathering
- **Keywords:** 태국어 교육, 이중언어, 자녀 태국어
- **Unique elements:** Korean education pressure context, Thai temple community in Seoul, comparing to Korean reading benchmarks

### Shared 7 methods
1. Daily 10-minute reading rhythm (not duration, regularity)
2. Reading aloud together (parent reads first, child repeats)
3. Phonetic decomposition by syllable
4. Picture-word association (visual + audio + text)
5. Spaced repetition of difficult consonants
6. Audiobooks/karaoke-style apps
7. Celebrating small wins (1 page = 1 sticker)

### FAQ seeds (adapt per language)
- How long until I see improvement?
- Is my child reading-disabled or just behind?
- Should I get a tutor?
- How does Thai reading speed compare to other languages?
- What if my child refuses to practice?

---

## 7.2 Post #2 — À quel âge un enfant doit-il savoir lire le thaï?

**Pillar:** Practical | **Persona:** P2 (Lukkrueng diaspora parents)

### Canonical premise
A parent compares their bilingual child's Thai reading milestones to monolingual Thai peers, demystifying age expectations.

### Versions to generate

#### EN version
- **Slug:** `at-what-age-thai-reading`
- **Title:** "At What Age Should a Child Read Thai? A Realistic Guide for Bilingual Families"
- **Author:** Anna (Brooklyn, NY)
- **Hook:** Comparing Mali (8, half-Thai) to her cousin Pim (8, raised in Bangkok) during summer family visit
- **Keywords:** age learn Thai reading, bilingual Thai child milestones, when teach Thai

#### FR version
- **Slug:** `age-enfant-lire-thai`
- **Title:** "À quel âge un enfant doit savoir lire le thaï ? Le guide complet par niveau (5 à 9 ans)"
- **Author:** Som (Lyon)
- **Hook:** Comparing Léo (7, lukkrueng) with his cousin Aom (7, in Khon Kaen) during summer in Thailand
- **Keywords:** apprendre thaï enfant, lire thaï âge, enfant bilingue thaï

### Shared structural points
- Realistic milestones by age (4, 5, 6, 7, 8, 9)
- Difference between oral and written milestones
- Bilingual children: typical 1-2 year delay vs. monolingual peers (this is normal)
- When to worry vs. when to wait
- The "fluency" myth (defining what fluency really means)

### FAQ seeds
- My child is 8 and can't read Thai — am I too late?
- Should bilingual children attend a weekend Thai school?
- What's a realistic daily practice time?
- Is reading speed or comprehension more important?
- How do I assess my child's level?

---

## 7.3 Post #3 — Teach Thai to Half-Thai Kids Abroad

**Pillar:** Practical | **Persona:** P2 (lukkrueng diaspora)

### Canonical premise
A practical step-by-step guide based on 3 years of experimentation by a Thai parent abroad. Covers 0-to-100 from "doesn't know any Thai" to "can read short stories."

### Versions to generate (5 langs)

#### EN — `teach-thai-half-thai-kids-abroad`
- Author: Anna (Brooklyn)
- Hook: Mali at age 5, refusing to even try Thai because "no one at school speaks it"

#### FR — `apprendre-thai-enfant-lukkrueng`
- Author: Som (Lyon)
- Hook: Léo at age 4, asking Mom why he has "two languages" when his French friends only have one

#### JP — `tai-go-haafu-kodomo`
- Author: Yuki (Yokohama)
- Hook: Hana at age 6, ashamed at preschool show-and-tell when asked "what's your other language?"

#### KO — `taeguk-eo-honhyeol-jaja`
- Author: Min-Ji (Seoul)
- Hook: Joon at age 7, telling his Korean grandmother that he "doesn't speak Thai" — even though he does

#### ZH — `jiaohaizi-tai-yu-yuedu`
- Author: Wei (Singapore East Coast)
- Hook: Wei's daughter Mei in a Singapore school where Mandarin dominates, Thai considered "third language"

### Shared step-by-step framework
1. Phase 0: Preserve oral Thai (ages 0-4)
2. Phase 1: Introduce Thai script as visual (ages 4-5) — name, parents' names
3. Phase 2: First 50 words (ages 5-6)
4. Phase 3: Short sentences (ages 6-7)
5. Phase 4: Simple stories (ages 7-8)
6. Phase 5: Independent reading (ages 8+)

### FAQ seeds
- What if I don't speak fluent Thai myself?
- How important is the non-Thai parent's involvement?
- Are weekend Thai schools worth it?
- What apps actually work?
- How do I keep motivation when my child resists?

---

## 7.4 Post #4 — The Grandmother Letter (5 versions besides FR reference)

**Pillar:** Emotional | **Persona:** All

### Versions to generate (TH, EN, JP, KO, ZH — French is the reference in 6.1)

#### TH — `chotmai-yaa-luk-an-mai-dai`
- Title: "จดหมายจากคุณยายที่หลานอ่านไม่ออก"
- Author: Khun Pim (Bangkok mother, daughter Mali at international school)
- Hook: ยาย sends a Songkran video message that Mali can hear but not read alongside
- Setting: Bangkok Sukhumvit, daughter at NIST International School

#### EN — `the-message-from-grandma`
- Title: "The Message from My Mother That My Son Couldn't Read"
- Author: Anna (Brooklyn)
- Hook: A LINE message from Yaay during Mali's 8th birthday, asking what she wanted to eat when she comes
- Setting: Brooklyn, NY

#### JP — `obaachan-no-message`
- Title: "母から届いたメッセージ — 息子が読めなかった日"
- Author: Yuki (Yokohama)
- Hook: A LINE voice message Yuki's mother sends her grandson Kenta, with a written caption he can't read
- Setting: Yokohama, Japan; grandmother in Chiang Mai

#### KO — `hangugmal-eomma-ui-pyeonji`
- Title: "엄마가 보낸 태국어 메시지 — 우리 아들이 읽지 못한 그날"
- Author: Min-Ji (Seoul)
- Hook: A KakaoTalk message Min-Ji's mother sends her grandson Joon during Songkran
- Setting: Seoul, Korea; grandmother in Bangkok

#### ZH — `wai-po-de-xin`
- Title: "外婆发来的泰语信息 — 我儿子读不懂的那天"
- Author: Wei (Singapore)
- Hook: A WeChat message Wei's mother sends her grandson Ming during Chinese New Year, written half in Thai half in Chinese
- Setting: Singapore East Coast

### Shared narrative arc
1. The moment grandmother sends the message
2. The child's failure or refusal
3. The parent's shame and reflection
4. Why this happened (cultural/practical reasons)
5. What we tried over the next 3 months
6. Where we are today (honest, not victorious)
7. What I would tell another parent in this situation

### FAQ seeds
- How do I rebuild a relationship between my child and Thai grandparents?
- Should grandparents simplify their messages?
- Is it too late if my child is already 9?
- How can I introduce Thai writing without it feeling like school?
- My child says "Thai is hard" — how do I respond?

---

## 7.5 Post #5 — My Son Refused Thai — 60 Days

**Pillar:** Emotional | **Persona:** P2

### Versions: EN + FR

#### EN — `my-son-refused-thai-60-days`
- Title: "My 7-Year-Old Refused to Learn Thai. Here's What Changed in 60 Days."
- Author: Anna (Brooklyn)
- Hook: Mali shouting "I'm not Thai!" in tears after a Thai class. The moment of crisis.

#### FR — `mon-fils-refusait-thai-60-jours`
- Title: "Mon fils de 7 ans refusait le thaï. Voici ce qui a changé en 60 jours."
- Author: Som (Lyon)
- Hook: Léo crying "Je ne suis pas thaï !" after a frustrating evening with the Thai workbook

### Shared narrative
1. The crisis moment (refusal)
2. The parent's mistake (pushing too hard)
3. The 60-day experiment (no pressure approach)
4. Day-by-day milestones (week 1, week 2, week 4, week 8)
5. What worked (rituals, songs, family stories)
6. What didn't work (textbooks, drills)
7. Honest update at day 60 (not perfect, but progress)

### FAQ seeds
- How do I respond when my child says "I'm not Thai"?
- What if my child has identity confusion?
- How do I separate language from identity pressure?
- What's "good enough" Thai for a bilingual child?
- When should I bring in professional help?

---

## 7.6 Post #6 — 5 Thai Mothers Abroad Share

**Pillar:** Emotional | **Persona:** P2 (English version only)

### Version: EN only — `5-thai-mothers-abroad-share`

- **Title:** "5 Thai Mothers Living Abroad Share How Their Kids Reconnected with Thai"
- **Author:** Anna (curates 5 interviews)
- **Format:** Mini-interviews with 5 fictional but realistic Thai moms in different countries

### The 5 mothers (composite profiles)
1. **Pim** — Bangkok-born, lives in San Francisco, son aged 6
2. **Nok** — Phuket-born, lives in London, twin daughters aged 8
3. **Aom** — Khon Kaen-born, lives in Sydney, son aged 9
4. **Mali** — Chiang Mai-born, lives in Toronto, daughter aged 7
5. **Pin** — Surin-born, lives in Berlin, son aged 5

### Shared structure
- Quick intro per mom (50 words each)
- "The moment that woke me up" (one paragraph each)
- "What I tried that didn't work" (one paragraph each)
- "What finally worked" (one paragraph each)
- "What I'd tell my past self" (one sentence each)
- Pattern observations across the 5 moms (Anna's reflection)

### FAQ seeds
- Are Thai children abroad always behind in Thai literacy?
- How do these mothers handle resistance?
- What's the role of the non-Thai parent?
- Is there a "best country" for raising bilingual Thai kids?
- How do these moms find time?

---

## 7.7 Post #7 — 100 Essential Thai Words by Age 7 (5 versions besides EN reference)

**Pillar:** Culture+Utility | **Persona:** P1 + P2

### Versions to generate (TH, FR, JP, KO, ZH — EN is the reference in 6.2)

#### TH — `100-kham-thai-luk-7-khuan-ru`
- Author: Khun Pim (Bangkok)
- Setting: Mom realizing while reviewing Mali's Thai workbook that she doesn't know which words actually matter most

#### FR — `100-mots-thais-essentiels-7-ans`
- Author: Som (Lyon)
- Setting: Som realizing during summer in Thailand that Léo can name 5 things in Thai but not 50

#### JP — `7sai-made-no-tai-go-100`
- Author: Yuki (Yokohama)
- Setting: Yuki at the Bangkok airport, listening to her son Kenta interact with Thai cousins, counting how many words he uses

#### KO — `7sal-tai-eo-100-danea`
- Author: Min-Ji (Seoul)
- Setting: Annual visit to Bangkok, Min-Ji notices Joon nodding politely without understanding

#### ZH — `7sui-qian-bi-xue-tai-yu-100ci`
- Author: Wei (Singapore)
- Setting: Wei realizing her daughter Mei recognizes 100 Mandarin characters but only 20 Thai

### Shared structure
- Personal opening scene
- Why a list of "the 100" matters (vs. random teaching)
- The 10 categories with the 10 words each
- Cultural notes per category (why these matter for Thai life)
- How to use the list at home
- Free PDF download offer

### FAQ seeds
- Are these the same as Thai school Grade 1 vocabulary?
- Should kids know these in oral form first or written?
- What if my child is older than 7?
- How long does mastering 100 words take?
- What comes after these 100?

---

## 7.8 Post #8 — Why International School Kids Forget Thai

**Pillar:** Culture | **Persona:** P1 (Bangkok intl school families)

### Versions to generate (TH + EN)

#### TH — `lukkok-rongrian-nanachat-luem-thai`
- Title: "ทำไมเด็กโรงเรียนนานาชาติถึงลืมภาษาไทย? และวิธีแก้ที่ผู้ปกครองหลายคนยังไม่รู้"
- Author: Khun Pim (Bangkok intl school mom — NIST)
- Setting: Parent meeting at NIST where 4 mothers admit their kids can't read Thai

#### EN — `why-international-school-kids-forget-thai`
- Title: "Why Bangkok International School Kids Forget Their Thai (And What Parents Are Doing About It)"
- Author: Khun Pim (same character)
- Setting: Same scene, written for English-reading expat/Thai parents and overseas Thai families considering Bangkok intl schools

### Shared narrative
- Opening: scene at parent meeting
- Data: how many hours/week of Thai vs. English at major intl schools
- The cultural cost (grandparents, identity, belonging)
- Why parents don't notice until age 7-8
- The 3 things that work (intentional ritual, weekend Thai school, apps)
- Honest discussion of trade-offs

### FAQ seeds
- Should I switch my child to a bilingual school?
- How many hours of Thai per week is enough?
- Are weekend Thai schools effective?
- What's the role of the school vs. home?
- How do I prevent this in younger siblings?

---

## 7.9 Post #9 — 5 Thai Tones for Non-Thai Parents

**Pillar:** Culture+Utility | **Persona:** P2 (foreign parents in mixed families)

### Versions to generate (EN, FR, JP, KO, ZH)

#### EN — `5-thai-tones-non-thai-parents`
- Author: David (American, married to Thai woman, living in Brooklyn)
- Hook: David trying to help his daughter Mali with Thai homework and getting laughed at for saying "ma" (มา - come) wrong

#### FR — `5-tons-thai-parents-non-thais`
- Author: Pierre (French, married to Som, living in Lyon)
- Hook: Pierre at a family wedding in Thailand, mistakenly calling his mother-in-law "yaa" with the wrong tone

#### JP — `tai-go-5-tone-nihonjin-oya`
- Author: Hiroshi (Japanese, married to Yuki, Yokohama)
- Hook: Hiroshi attempting Thai phrases at his in-laws' Songkran party with comedic results

#### KO — `taeguk-eo-5-seongjo`
- Author: Sang-Min (Korean, married to Min-Ji, Seoul)
- Hook: Sang-Min discovering that Thai tones are even more challenging than Mandarin tones he learned in college

#### ZH — `tai-yu-5-sheng-diao`
- Author: David (Singapore Chinese, married to Wei)
- Hook: David realizing that as a Mandarin speaker he assumed Thai tones would be similar — they're not

### Shared structure
- Personal embarrassment story (humor sells this topic)
- The 5 tones explained simply (mid, low, falling, high, rising)
- Audio examples (link to recordings)
- The 4 most common tone mistakes parents make
- A simple practice routine for parents
- Why mastering tones helps your child

### FAQ seeds
- Can I help my child if I can't pronounce tones perfectly?
- What's the easiest way to remember the 5 tones?
- Are Thai tones similar to Mandarin tones?
- Will my child inherit my tone mistakes?
- What apps help non-Thai speakers learn tones?

---

## 7.10 Post #10 — 10 Traditional Thai Folktales (6 versions)

**Pillar:** Culture | **Persona:** All

### Versions to generate (TH, EN, FR, JP, KO, ZH)

#### TH — `10-nithan-thai-luk-khuan-ru`
- Author: Khun Pim
- Hook: Khun Pim's mother retelling the story of *Phra Aphai Mani* during a power outage, realizing her daughter Mali has never heard it

#### EN — `10-thai-folktales-every-child-should-know`
- Author: Anna (Brooklyn)
- Hook: A Thai temple gathering in Queens, NY, where the elder tells stories Mali doesn't recognize

#### FR — `10-contes-thais-traditionnels`
- Author: Som (Lyon)
- Hook: Léo asking what Som's favorite childhood story was, and Som realizing she had never told him

#### JP — `tai-no-mukashi-banashi-10`
- Author: Yuki (Yokohama)
- Hook: At a Tokyo Thai New Year celebration, listening to the storyteller and seeing Hana confused

#### KO — `taeguk-jeontong-iyagi-10`
- Author: Min-Ji (Seoul)
- Hook: Min-Ji's mother visiting Seoul, attempting to tell stories at bedtime, and Joon falling asleep before understanding

#### ZH — `taiguo-10-ge-chuantong-gushi`
- Author: Wei (Singapore)
- Hook: Wei's mother visiting from Bangkok, telling stories that Mei had never heard

### The 10 folktales (consistent across versions)
1. **Phra Aphai Mani** (พระอภัยมณี) — flute prince and sea ogress
2. **Mae Nak Phra Khanong** (แม่นาคพระโขนง) — a love-and-loss ghost story (kid-appropriate version)
3. **Krai Thong** (ไกรทอง) — crocodile slayer
4. **Sang Thong** (สังข์ทอง) — golden conch prince
5. **Nang Sib Song** (นางสิบสอง) — twelve sisters
6. **Khun Chang Khun Phaen** (ขุนช้างขุนแผน) — historical romance (simplified)
7. **The clever rabbit and the tiger** — folk fable
8. **The grateful elephant** — Buddhist tale
9. **The two friends and the bear** — moral tale
10. **The mango tree's blessing** — origin myth

### FAQ seeds
- Where can I find these folktales in book form?
- Are all of these appropriate for young children?
- How do I tell folktales when my Thai is rusty?
- What's the moral lesson in each story?
- Are there modern children's adaptations?

---

# 8. AUTHOR PERSONAS

> Use these consistently. Each post must be signed by ONE author who is consistent across their posts.

| Author ID | Name | Setting | Family | Posts they write |
|---|---|---|---|---|
| `som-mom` | Som | Lyon, France | Husband Pierre (FR), son Léo (7) | FR posts |
| `anna-mom` | Anna | Brooklyn, NY | Husband David (US), daughter Mali (8) | EN posts |
| `pim-mom` | Khun Pim | Bangkok Sukhumvit | Husband Pong (TH), daughter Mali (7) at NIST | TH posts |
| `ploy-mom` | Khun Ploy | Nonthaburi | Husband Sak, daughter Nam (8) | TH posts (mass market) |
| `yuki-mom` | Yuki | Yokohama, Japan | Husband Hiroshi (JP), son Kenta (7) | JP posts |
| `minji-mom` | Min-Ji | Seoul Gangnam | Husband Sang-Min (KR), son Joon (8) | KO posts |
| `wei-mom` | Wei | Singapore East Coast | Husband David (SG-Chinese), daughter Mei (7) | ZH posts |
| `nok-mom` | Nok | London | Husband James (UK), twin daughters (8) | EN cameos in #6 |
| `aom-mom` | Aom | Sydney | Husband Tom (AU), son Owen (9) | EN cameos in #6 |

Each author has a small bio file at `/blog/authors/{id}.md` with:
- Name, location, occupation
- Family situation
- Why they write
- Their photo (placeholder until real)

---

# 9. IMPLEMENTATION NOTES FOR CLAUDE CODE

## 9.1 File structure

```
/blog/
├── _meta/
│   ├── series.yaml             # series definitions
│   └── authors/                # author bio files (9 authors)
├── en/
│   ├── 100-essential-thai-words-age-7.mdx       # REFERENCE
│   ├── teach-thai-half-thai-kids-abroad.mdx
│   ├── at-what-age-thai-reading.mdx
│   ├── the-message-from-grandma.mdx
│   ├── my-son-refused-thai-60-days.mdx
│   ├── 5-thai-mothers-abroad-share.mdx
│   ├── why-international-school-kids-forget-thai.mdx
│   ├── 5-thai-tones-non-thai-parents.mdx
│   └── 10-thai-folktales-every-child-should-know.mdx
├── fr/
│   ├── lettre-de-grand-mere.mdx                  # REFERENCE
│   ├── apprendre-thai-enfant-lukkrueng.mdx
│   ├── age-enfant-lire-thai.mdx
│   ├── mon-fils-refusait-thai-60-jours.mdx
│   ├── 100-mots-thais-essentiels-7-ans.mdx
│   ├── 5-tons-thai-parents-non-thais.mdx
│   └── 10-contes-thais-traditionnels.mdx
├── th/
│   ├── chotmai-yaa-luk-an-mai-dai.mdx
│   ├── lukkok-an-thai-cha-7-witi.mdx
│   ├── lukkok-rongrian-nanachat-luem-thai.mdx
│   ├── 100-kham-thai-luk-7-khuan-ru.mdx
│   └── 10-nithan-thai-luk-khuan-ru.mdx
├── jp/
│   ├── tai-go-yomi-osoi-7-houhou.mdx
│   ├── tai-go-haafu-kodomo.mdx
│   ├── obaachan-no-message.mdx
│   ├── 7sai-made-no-tai-go-100.mdx
│   ├── tai-go-5-tone-nihonjin-oya.mdx
│   └── tai-no-mukashi-banashi-10.mdx
├── ko/
│   ├── taeguk-eo-eullik-neurin-7-bangbeob.mdx
│   ├── taeguk-eo-honhyeol-jaja.mdx
│   ├── hangugmal-eomma-ui-pyeonji.mdx
│   ├── 7sal-tai-eo-100-danea.mdx
│   ├── taeguk-eo-5-seongjo.mdx
│   └── taeguk-jeontong-iyagi-10.mdx
└── zh/
    ├── jiaohaizi-tai-yu-yuedu.mdx
    ├── wai-po-de-xin.mdx
    ├── 7sui-qian-bi-xue-tai-yu-100ci.mdx
    ├── tai-yu-5-sheng-diao.mdx
    └── taiguo-10-ge-chuantong-gushi.mdx
```

## 9.2 MDX components needed

```tsx
// /components/blog/
- BlogPost.tsx           // wraps MDX content with layout
- AuthorBio.tsx          // author signature block
- FaqSection.tsx         // FAQ with FAQPage schema
- RelatedReads.tsx       // 2-3 internal links
- EditLog.tsx            // optional EDIT updates
- LeadMagnet.tsx         // for #7 PDF download
- TableOfContents.tsx    // auto-generated from headings
- ShareButtons.tsx       // FB, LINE, X, WhatsApp
```

## 9.3 SEO meta generation

For each post, generate:
- `<title>` from frontmatter `title`
- `<meta name="description">` from `meta_description`
- Open Graph tags from `og_image`, `title`, `meta_description`
- `<link rel="alternate" hreflang>` for all language versions
- JSON-LD `Article` schema (and `FAQPage` if FAQ present)

## 9.4 Content generation order

When generating the 36 remaining post versions (38 total minus 2 references), follow this order to maximize SEO impact early:

**Wave 1 (Month 1) — 12 posts:**
- Post #4 in TH, EN, JP, KO, ZH (5)
- Post #7 in TH, FR, JP, KO, ZH (5)
- Post #1 in TH, JP (2)

**Wave 2 (Month 2) — 12 posts:**
- Post #3 in EN, FR, JP, KO, ZH (5)
- Post #10 in TH, EN, FR, JP (4)
- Post #2 in EN, FR (2)
- Post #1 in KO (1)

**Wave 3 (Month 3) — 12 posts:**
- Post #9 in EN, FR, JP, KO, ZH (5)
- Post #10 in KO, ZH (2)
- Post #5 in EN, FR (2)
- Post #6 in EN (1)
- Post #8 in TH, EN (2)

## 9.5 Quality verification checklist (before publishing)

For each generated post, verify:

- [ ] Pikko mentioned ≤ 2 times in body, never in first 800 words
- [ ] Primary keyword appears 5-7 times max
- [ ] At least 3 of 6 authenticity markers (Section 1.3)
- [ ] Word count: 1500-2500
- [ ] Author signature with bio
- [ ] FAQ with 5 questions and FAQPage schema
- [ ] 2-3 internal links present
- [ ] 1-2 external authority links
- [ ] hreflang tags for other-language versions
- [ ] Meta description under 160 chars
- [ ] og:image specified
- [ ] No banned phrases (Section 1.2)
- [ ] First paragraph has scene/moment, NOT product/feature

---

**End of specification.**

**Total deliverables:** 38 blog post versions + 9 author bio files + MDX components for blog template.

**Estimated implementation time for Claude Code:** ~40-60 hours of focused generation if writing fresh content for all 36 non-reference versions. Reduced significantly if Claude Code uses the references as direct templates with cultural adaptations.
