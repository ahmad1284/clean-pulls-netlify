---
name: Pristine Horizon
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#43474f'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737780'
  outline-variant: '#c3c6d1'
  surface-tint: '#3a5f94'
  primary: '#001e40'
  on-primary: '#ffffff'
  primary-container: '#003366'
  on-primary-container: '#799dd6'
  inverse-primary: '#a7c8ff'
  secondary: '#00677d'
  on-secondary: '#ffffff'
  secondary-container: '#50d9fe'
  on-secondary-container: '#005c70'
  tertiary: '#002227'
  on-tertiary: '#ffffff'
  tertiary-container: '#003941'
  on-tertiary-container: '#56a7b5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#a7c8ff'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#1f477b'
  secondary-fixed: '#b3ebff'
  secondary-fixed-dim: '#4cd6fb'
  on-secondary-fixed: '#001f27'
  on-secondary-fixed-variant: '#004e5f'
  tertiary-fixed: '#9feffe'
  tertiary-fixed-dim: '#83d3e1'
  on-tertiary-fixed: '#001f24'
  on-tertiary-fixed-variant: '#004f59'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

This design system centers on the concept of "Pristine Professionalism." It bridges the gap between high-end Zanzibari hospitality and rigorous technical maintenance. The brand personality is refreshing, reliable, and transparent, evoking the same peace of mind a client feels when looking at a perfectly balanced, crystal-clear pool.

The visual style utilizes a **Corporate Modern** foundation infused with **Minimalist** clarity. By prioritizing heavy whitespace and a restricted, aquatic-inspired palette, the interface mimics the aeration and luminosity of water. The goal is to move away from the "gritty" feel of manual labor and toward the "premium" feel of a specialized service.

## Colors

The palette is derived from the varying depths of the Indian Ocean and well-maintained swimming pools. 

- **Primary (Deep Water Blue):** Used for primary CTAs, headings, and high-emphasis text to provide a grounded, authoritative contrast against lighter backgrounds.
- **Secondary (Sky/Cyan):** Used for iconography, active states, and supportive UI elements to inject energy and a "clean" sensation.
- **Tertiary (Turquoise/Mist):** Used for large surface areas, hover states, and decorative accents.
- **Neutral (Crisp White & Slate):** The background remains a pure, high-value white (#FFFFFF) to ensure the blues "pop." Surface neutrals lean toward cool-toned greys to maintain the refreshing temperature of the brand.

## Typography

The design system utilizes **Plus Jakarta Sans** for its entire typographic scale. This typeface was selected for its modern, geometric construction and soft terminals, which mirror the "rounded/friendly" requirement while maintaining a highly legible, professional structure.

- **Headlines:** Use tighter letter-spacing and bold weights in Deep Water Blue to establish a clear hierarchy.
- **Body Text:** Use regular weights with generous line heights (1.6) to ensure readability, especially for service reports and maintenance logs.
- **Labels:** Use semi-bold or bold weights in uppercase for small UI labels (e.g., status tags) to differentiate them from body content.

## Layout & Spacing

This design system employs a **Fixed Grid** model for desktop and a **Fluid** model for mobile. A 12-column grid is used for the landing pages and admin dashboards, providing a structured home for data and imagery.

- **Rhythm:** An 8px base unit drives all spacing decisions. 
- **Margins:** Generous outer margins (80px on desktop) are used to prevent the layout from feeling cluttered, reinforcing the "clean" brand pillar.
- **Dashboard Layout:** Utilizes a persistent left-hand navigation rail (240px) with a fluid content area that contains "Cards" grouped by 24px gutters.

## Elevation & Depth

To maintain a refreshing and "light" feel, depth is conveyed through **Tonal Layers** and **Ambient Shadows**.

- **Surface Tiers:** The main background is the lowest tier (White). Secondary information (like sidebar containers) sits on a light blue tint.
- **Shadows:** Use extremely soft, low-opacity shadows (e.g., `box-shadow: 0 4px 20px rgba(0, 51, 102, 0.05)`) to lift cards off the background. The shadow color should be slightly tinted with the primary blue rather than pure black to keep the UI looking vibrant.
- **Glassmorphism (Optional):** Use a subtle backdrop blur on navigation bars to allow the high-quality pool photography to peek through as the user scrolls.

## Shapes

The shape language is consistently **Rounded**. This choice avoids the aggressive nature of sharp corners, favoring a friendlier, service-oriented aesthetic that feels approachable and "local."

- **Standard Elements:** 0.5rem (8px) for input fields, buttons, and small cards.
- **Large Containers:** 1rem (16px) for main dashboard sections and featured images.
- **Interactive Elements:** Buttons should feel tactile; a slight "squircle" effect is preferred over harsh rectangles.

## Components

### Buttons
- **Primary:** Deep Water Blue background with White text. Bold weight. 
- **Secondary:** Sky Blue border with Sky Blue text.
- **States:** Hover states should involve a slight darkening of the blue or a subtle lift (shadow increase).

### Admin Data Tables
- **Header:** Light Blue background (#F0F9FF) with bold Navy text.
- **Rows:** Clean, white rows with subtle horizontal dividers only. Avoid vertical lines to maintain a "clean" feel.
- **Status Chips:** Use rounded pills with high-contrast pastel backgrounds (e.g., "Cleaned" in a light turquoise chip with dark turquoise text).

### Cards
- Use for property summaries and service history. 
- Must feature a 1px soft blue border or the ambient shadow defined in the Elevation section.
- Content should have 24px internal padding.

### Input Fields
- White backgrounds with a 1px border in a neutral slate color.
- Focus states must use the Sky Blue color for the border to signal activity and cleanliness.

### Additional Components
- **Weather/Water Quality Widgets:** Use circular progress indicators to show pH levels and chlorine balance, utilizing the cyan-to-blue gradient scale.
- **Image Carousels:** For "Before & After" photos, use a slider with rounded handles.