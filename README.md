# KashCrave

A responsive landing page and ordering interface for KashCrave, a Nigerian food
delivery business. Browse the menu, build a cart, and check out — all in the
browser, with no backend.

**Live site:** https://muhammadrosenje.github.io/kashcrave/

## Tech stack

- HTML5
- CSS3 (custom properties, Grid, Flexbox, media queries)
- Vanilla JavaScript — no framework, no build step
- Font Awesome 6 for icons, loaded from a CDN

## Features

- **Menu with category filters** — Rice, Soups, Proteins, Sides, Drinks
- **Live search** — filters the menu cards as you type
- **Cart** — add and remove items, per-item quantities, subtotal plus a flat
  delivery fee, and a running total
- **Responsive layout** — collapses to a hamburger nav on small screens
- **Order modal and toast confirmations**

## Running it locally

There is no build step and no backend. Double-click `index.html` to open it in a
browser, or serve the folder with any static server — for example the Live
Server extension in VS Code.

## Project structure

```
index.html     page markup and menu cards
style.css      all styling, including the responsive breakpoints
script.js      cart, search, filter and modal logic
images/        food photography
assets/        logo
```

All asset paths are relative to the project root, so the site works at any
subpath (for example `username.github.io/kashcrave/`) as well as at a domain
root.

## Notes on a couple of decisions

**Cart state lives in memory.** Keeping it in a plain array makes the logic easy
to follow. The tradeoff is that refreshing the page empties the cart;
`localStorage` would fix that.

**Prices are hardcoded in the markup.** Each card carries its own `data-name`
and category attributes, which is what the filter and search read from. Moving
to a JavaScript array of menu items and rendering the cards from it would be the
next step if the menu grew.

## Contact

Instagram [@kashcrave.ng](https://www.instagram.com/kashcrave.ng/) ·
TikTok [@kashcrave.ng](https://www.tiktok.com/@kashcrave.ng) ·
[WhatsApp](https://api.whatsapp.com/send?phone=2347025049286)
