# Design System: The Artisanal Editorial

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Modern Curator."** 

This system rejects the rigid, boxy constraints of traditional e-commerce in favor of a high-end editorial experience. It is designed to feel like a sun-drenched atelier in Jaipur—breathable, intentional, and warm. We achieve a "Soft Luxury" aesthetic by breaking the standard grid with intentional asymmetry: imagine a large product image overlapping a text block, or a headline that sits slightly off-center to create a sense of human touch. This is not just a store; it is a digital heritage piece.

---

## 2. Colors
Our palette is rooted in the earth and the sun. We avoid the clinical coldness of pure white and the harshness of black.

### Palette Strategy
- **Primary (`#a03f28`):** Our "Terracotta." Used for key brand moments and call-to-actions.
- **Secondary (`#53643a`):** "Muted Sage." Used to provide a natural, calming counterpoint to the warmth of the primary red.
- **Tertiary (`#7b5800`):** "Ochre." A sophisticated accent for highlights or small decorative elements.
- **Neutrals:** Our background (`#fdf9f4`) is a "Warm Sand" that sets a soft, inviting tone for the entire interface.

### The "No-Line" Rule
Standard 1px borders are strictly prohibited for sectioning. To separate content, use **Tonal Transitions**. A section utilizing `surface_container_low` should sit adjacent to the main `surface` background. If you must define a boundary, use a subtle shift in background color rather than a stroke.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of fine handmade paper.
- **Base:** `surface` (`#fdf9f4`)
- **Secondary Layers:** `surface_container_low` for large background shifts.
- **Floating Elements:** `surface_container_lowest` (#ffffff) for cards or menus to provide a soft "lift."

### Signature Textures & Glass
To evoke "Heritage Reimagined," use **Glassmorphism** on navigation bars and floating overlays. Apply `surface` at 80% opacity with a `20px` backdrop blur. For primary CTAs, use a subtle linear gradient from `primary` (`#a03f28`) to `primary_container` (`#c0573e`) to give the button a curved, three-dimensional "soul."

---

## 3. Typography
The typography is a dialogue between the artisanal past and the modern future.

- **Display & Headlines (Noto Serif):** Our "Editorial Voice." These should be used with generous leading. Use `display-lg` for hero moments to evoke the feeling of a high-end fashion magazine.
- **Titles & Body (Manrope):** Our "Contemporary Edge." Manrope provides a clean, geometric contrast to the organic serif. It ensures that while the brand feels heritage-focused, the shopping experience remains effortless and modern.
- **Hierarchy Tip:** Always pair a `headline-lg` in Noto Serif with a `body-md` in Manrope. The contrast in character creates the "Sophisticated" tone we seek.

---

## 4. Elevation & Depth
Depth in this system is felt, not seen. We move away from heavy material shadows toward "Atmospheric Layering."

- **The Layering Principle:** Instead of shadows, stack your containers. A `surface_container_highest` card sitting on a `surface` background creates a natural, tactile hierarchy.
- **Ambient Shadows:** For elevated components (like a cart drawer), use a shadow with a 40px blur at 4% opacity, using the `on_surface` color (`#1c1c19`) as the base. This mimics natural ambient light.
- **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline_variant` token at **15% opacity**. It should be a whisper of a line, never a statement.
- **Organic Dividers:** When vertical separation is needed, consider using a `0.5` spacing unit with a very subtle `primary_fixed` background color, or simply an asymmetrical gap in the layout.

---

## 5. Components

### Buttons
- **Primary:** `primary` background, `on_primary` text. Use `xl` (0.75rem) roundedness. Hover state: transition to `primary_container` with a slight `2px` vertical lift.
- **Secondary:** `outline` border (Ghost Style) with `primary` text. No fill.
- **Tertiary:** Text only in `secondary`, with a `1px` underline that expands from the center on hover.

### Input Fields
- **Styling:** Minimalist. No enclosing box. Use a bottom-only border in `outline_variant`.
- **States:** On focus, the bottom border transitions to `primary` and the label (in `label-sm`) shifts upward with a graceful 200ms ease.

### Cards & Lists
- **The Rule:** No divider lines. Separate items using `8` (2.75rem) spacing units.
- **Product Cards:** Use `surface_container_low` as the card background. Images should have a `md` (0.375rem) corner radius. Typography within the card should be center-aligned to maintain the boutique feel.

### Additional Component: The "Heritage Serif" Quote
A specialized component for editorial storytelling. A large-scale `display-sm` Noto Serif quote in `secondary`, centered, with a small `tertiary` organic icon (like a handblock print leaf) above it.

---

## 6. Do's and Don'ts

### Do
- **Do** use asymmetrical margins. If the left margin is `12`, try a right margin of `16` for editorial imagery.
- **Do** use "Sun-bleached" imagery. Photography should feel warm and natural, never over-saturated.
- **Do** prioritize whitespace. If you think there is enough space, add `2` more units.

### Don't
- **Don't** use pure black (`#000000`). Always use `on_surface` or `on_surface_variant` for text to keep the "Soft Luxury" warmth.
- **Don't** use sharp 90-degree corners. Everything should have at least a `sm` (0.125rem) radius to feel "hand-softened."
- **Don't** use standard "drop shadows." If a component doesn't feel separated enough, use a color shift instead of a shadow.