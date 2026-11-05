---
name: Giberson Lara Portfolio
description: A near-empty cool-white page where a pointer-bent 1px line field and a width-axis name react to the visitor.
colors:
  cool-paper: "#f1f3f4"
  ink: "#0c0c0d"
  graphite: "#464a4f"
  hairline: "rgba(12, 12, 13, 0.16)"
  accent-cyan: "#00b8d9"
  accent-magenta: "#ea1e7d"
  accent-yellow: "#ffd400"
typography:
  display:
    fontFamily: "Anybody Variable, Arial Narrow, sans-serif"
    fontSize: "clamp(3.5rem, 15.2vw, 17rem)"
    fontWeight: 800
    lineHeight: 0.84
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 72, 'wght' 760"
  headline:
    fontFamily: "Anybody Variable, Arial Narrow, sans-serif"
    fontSize: "clamp(2.75rem, 9vw, 8rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 78"
  title:
    fontFamily: "Anybody Variable, Arial Narrow, sans-serif"
    fontSize: "clamp(1.7rem, 3.6vw, 3rem)"
    fontWeight: 800
    lineHeight: 1
    fontVariation: "'wdth' 64, 'wght' 760"
  body:
    fontFamily: "Hanken Grotesk Variable, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Anybody Variable, Arial Narrow, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.06em"
    fontVariation: "'wdth' 105"
rounded:
  none: "0"
  round: "50%"
spacing:
  gutter: "clamp(1rem, 4vw, 3rem)"
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "clamp(4rem, 12vh, 9rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cool-paper}"
    rounded: "{rounded.none}"
    padding: "0 1.5rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.accent-cyan}"
    textColor: "{colors.ink}"
  link-underlined:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  swatch:
    rounded: "{rounded.round}"
    size: "1.25rem"
  lang-toggle-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cool-paper}"
    padding: "0.5rem 0.55rem"
    height: "2.25rem"
---

# Design System: Giberson Lara Portfolio

## Overview

**Creative North Star: "The Vibrating Ground"**

A cool white page that is mostly empty, so the few things on it can move. The ground is a field of 1px vertical lines (Soto / Cruz-Diez, Venezuelan kinetic art) that bend around the visitor's pointer, with a strip of the current accent shifting behind them. The name is set in a variable face whose width axis opens near the cursor. Everything else is ink on paper, ruled by hairlines.

The system is sober by omission: one chromatic accent at a time, no radius on structure, no shadow, no imagery, no icons beyond one arrow. Density is low; type size carries hierarchy, not weight of decoration. Motion is the personality, and it is always tied to the pointer or to hover.

**Key Characteristics:**
- Ink (#0c0c0d) on cool paper (#f1f3f4); the accent is the only chroma on the page.
- Width-axis display type (Anybody) used at enormous and mid sizes; Hanken Grotesk for reading text.
- 1px vertical lines are the only ornament; rules and borders are 1px ink.
- Flat, square, shadowless; depth comes from the canvas field and a mask-revealed color strip.
- Bilingual ES/EN by paired spans; layout never depends on which language shows.

## Colors

A two-value neutral pair plus one swappable accent; the accent is chosen by the visitor and persisted.

### Primary
- **Live Accent** (`--accent`, default Cyan Signal #00b8d9): the single chromatic voice. Alternates are Magenta Pulse (#ea1e7d) and Solar Yellow (#ffd400), switched by `data-accent` on the root. Spent on the masked color strip inside the line fields, the project hover motif, the primary button's hover fill, selection background, link/term hover underline, and the focus halo.

### Neutral
- **Cool Paper** (#f1f3f4): page ground, bar ground once scrolled, hero-foot ground, text on ink buttons.
- **Ink** (#0c0c0d): all text, line-field strokes, 1px rules, primary button fill, scrollbar thumb.
- **Graphite** (#464a4f): secondary text only (project descriptions, footer).
- **Hairline** (ink at 16%): the soft divider between stack groups.

### Named Rules
**The One Accent Rule.** Exactly one accent is live at a time; the other two exist only as swatches in the top bar. Never show two accents together or add a fourth hue.
**The Ink-On-Yellow Rule.** Text that sits on the accent is always ink, and when yellow is live, underline hovers switch to ink so they stay legible. Never place accent-colored text on Cool Paper.

## Typography

**Display Font:** Anybody Variable (fallback Arial Narrow, sans-serif), with the `wdth` axis exposed
**Body Font:** Hanken Grotesk Variable (fallback system-ui, sans-serif)

**Character:** Anybody is condensed and heavy at rest and swells wide under the pointer; Hanken stays quiet and neutral so the display face does all the talking.

### Hierarchy
- **Display** (800, clamp(3.5rem, 15.2vw, 17rem), 0.84): the two-row name. Per-letter `wdth` 72 to 128 and `wght` 760 to 800 by distance from the pointer, with an intro that starts wider and lighter.
- **Headline** (800, clamp(2.75rem, 9vw, 8rem), 0.9, wdth 78): section heads. The closing head runs larger (up to 15vw, wdth 70).
- **Title** (800, clamp(1.7rem, 3.6vw, 3rem), 1, wdth 64 to 128 on hover): project names. Stack terms follow the same behavior at clamp(1.5rem, 3.4vw, 2.75rem), wdth 70 to 130.
- **Body** (Hanken 400, 1.0625rem, 1.55): prose, project descriptions (max 40ch), role line (clamp(1.1rem, 1.6vw, 1.4rem), max 34ch).
- **Label** (Anybody 600 to 700, 0.8125rem, +0.05 to 0.06em, uppercase, wdth 105): project tags and stack group names. Buttons and links use Anybody 700 at 0.95rem, wdth 110, +0.03em.

### Named Rules
**The Width Is The Motion Rule.** Display type animates through `font-variation-settings` (`wdth`, `wght`), never through scale or position shifts. Transitions run 0.5 to 0.6s on `--ease`.
**The Reading Text Rule.** Anything longer than a line is Hanken, never Anybody.

## Layout

A single column of full-bleed rows inside a fluid gutter (clamp(1rem, 4vw, 3rem)). The hero fills at least 100svh (min 640px) with the name bottom-left over a full-bleed canvas and a ruled foot bar (role line left, actions right). Sections open with a large headline and separate by clamp(4rem, 12vh, 9rem) of top padding.

Work is a ruled list: each row is a four-column grid (1.5fr title, 1fr description, 13rem tags right-aligned, 28px arrow) with 1px ink rules above and below. Stack is a two-column definition list (label column 7 to 14rem, terms flowing in the rest) divided by hairlines. The close is a giant headline, a line of text, the email button, and a bleed-to-edge line strip.

Below 760px, project rows collapse to title and arrow on the first row, description second, tags third; stack groups stack to one column. The line field tightens its gap from 9px to 7px under 700px width.

## Elevation & Depth

Flat. No drop shadows exist in the build. Depth is conveyed by the canvas line field (bent lines against a flat ground) and by the accent strip that appears only inside a radial mask around the pointer. The fixed bar goes from transparent to Cool Paper with a 1px ink underline (a hard 1px rule, not a blur) once the hero is behind it. The one box-shadow in use is the focus halo.

### Named Rules
**The Flat Rule.** Surfaces never lift. State changes use color fill, width-axis change, or a 4px arrow nudge, not shadow.

## Shapes

Square by default: buttons, bars, rows and toggles have no radius. The only round form is the accent swatch (50%), whose selected state is a second 1px ring offset 5px outward. Borders are 1px ink. Line-field strips are parallelograms that follow the bent lines. Motion forms are repeating vertical stripes (3px accent over a 1px ink line, 7px pitch) masked to fade in from the left.

## Components

### Buttons
- **Shape:** square, 3rem tall (3.5rem in the close), 1.5rem horizontal padding.
- **Primary:** ink fill, Cool Paper text, Anybody 700 wdth 110.
- **Hover / Focus:** an accent fill rises from the bottom (0.45s `--ease`) and text flips to ink.
- **Link:** Anybody 700, 2px underline offset 0.4em; underline turns accent on hover (ink when yellow is live).

### Navigation
Fixed top bar: wordmark "GL" (Anybody 800, wdth 130) left; controls right. Controls are three round accent swatches and an ES/EN toggle whose active button is ink-filled with paper text (min 2.25rem tall). Transparent over the hero, paper-grounded with a 1px ink underline after 70% viewport scroll.

### Project Row
Ruled row; title widens (wdth 64 to 128) on hover or focus, a masked accent-and-ink stripe motif fades in at the right and drifts (2.4s linear), the arrow moves 4px up and right.

### Line Field (signature)
Two stacked canvases: an ink layer of 1px vertical lines at 9px pitch, and a color layer below it that fills every other pair of line-adjacent bands in the live accent, clipped by a radial mask that follows the pointer. Lines displace toward the pointer with a Gaussian falloff (sigma 170, 120 in the closing strip) plus a slow sine drift, and draw in left to right on first view. When the pointer is idle (3.5s) or coarse, the focus point wanders by itself. Reduced motion renders one static settled frame.

### Focus
Every focusable element gets a 2px ink outline offset 3px plus a 5px accent halo.

## Do's and Don'ts

### Do:
- **Do** keep exactly one accent live and drive it through `--accent` / `data-accent`.
- **Do** put all ornament in 1px vertical lines and 1px ink rules.
- **Do** animate display type through `wdth` and `wght`, honoring `prefers-reduced-motion` by freezing to the settled state.
- **Do** keep every string as a paired ES/EN span and make layouts work with either.
- **Do** keep content visible by default; reveal animation applies only when JS is on and motion is welcome.

### Don't:
- **Don't** use a dark bento grid, card wall, or tech-stack icon wall.
- **Don't** add radius, drop shadows, gradients as fills, or imagery.
- **Don't** set body-length text in Anybody or accent-colored text on Cool Paper.
- **Don't** introduce a second ornament motif beside the vertical lines.
