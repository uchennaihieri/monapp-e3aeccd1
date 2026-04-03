# Monapp — Vite + React + TypeScript + Tailwind CSS

Landing site for Monapp (vehicle credit card) and Monapp Fynd (mechanic-finding & car-recovery platform).

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** — all styling, no Chakra UI
- **Framer Motion** — (peer dep, not used in final; animations are CSS)
- **React Router DOM** — client-side routing
- **Axios** — phone form submission

## Fonts

- **Syne** — headings (`font-display`)
- **Instrument Serif** — italic body / pullquotes
- **Space Mono** — UI labels, buttons, body

All loaded from Google Fonts in `index.css`.

## Getting Started

```bash
npm install
cp .env.example .env   # set VITE_BASE_URL
npm run dev
```

## Routes

| Path       | Page                                        |
|------------|---------------------------------------------|
| `/`        | Home — hero, credit card, Fynd preview, CTA |
| `/fynd`    | Monapp Fynd full landing page               |
| `/privacy` | Privacy Policy                              |
| `/terms`   | Terms of Use                                |

## Design System

| Token          | Value                       |
|----------------|-----------------------------|
| `--green`      | `#1d7a3c` (primary green)   |
| `--green-bright` | `#2ecc5f` (accent green) |
| `--amber`      | `#e8a020` (Fynd amber)      |
| `--black`      | `#0a0a0a` (page background) |
| `--off-white`  | `#f5f2ec` (primary text)    |

## File Structure

```
src/
  App.tsx
  main.tsx
  vite-env.d.ts
  index.css                    # global styles + CSS animations
  components/
    Navbar.tsx                 # fixed glassmorphic nav, mobile-responsive
    Footer.tsx                 # minimal footer with legal links
    SuccessModal.tsx           # phone form success overlay
    sections/
      Hero.tsx                 # full-viewport hero + phone input
      Ticker.tsx               # scrolling green ticker strip
      CreditProduct.tsx        # credit card product + 3D card visual
      CreditFeatures.tsx       # 6-feature grid (credit card)
      Divider.tsx              # section separator
      FyndProduct.tsx          # Fynd product + live UI mockup
      HowItWorks.tsx           # tabbed 4-step process (credit / fynd)
      CtaSection.tsx           # green dual CTA banner
  pages/
    HomePage.tsx               # assembles all home sections
    FyndPage.tsx               # full Fynd landing page
    PrivacyPage.tsx            # privacy policy
    TermsPage.tsx              # terms of use
```
