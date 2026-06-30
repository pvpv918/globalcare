# GlobalCare

Premium medical tourism website built with **React + Vite**.

## Stack

- **React 19** + **Vite 6**
- **React Router** for navigation
- **Lucide React** for icons
- **CSS** design system (Inter + Fraunces fonts)

## Run

```bash
cd ~/Projects/globalcare
npm install
npm run dev
```

Open **http://localhost:5173**

## Pages

| Route | Screen |
|-------|--------|
| `/` | Home — hero, search, destinations, featured hospitals |
| `/search` | Search & filter hospitals, compare selection |
| `/search/compare` | Side-by-side hospital comparison |
| `/hospital/:id` | Hospital detail with tabs |
| `/booking/:hospitalId` | 4-step booking flow |
| `/vault` | Medical records vault |
| `/aftercare` | Recovery timeline & coordinator chat |

## Build for production

```bash
npm run build
npm run preview
```
