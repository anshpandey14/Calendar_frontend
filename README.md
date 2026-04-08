# 📅 Interactive Wall Calendar Component

A polished, highly interactive, and functionally robust React application engineered to perfectly emulate the visual hierarchy and aesthetics of a physical wall calendar.

## 🚀 Quick Start (Running Locally)

To run this application locally on your machine, follow these steps:

1. **Prerequisites:** Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
2. **Install Dependencies:** Open a terminal in the project's root folder and run:
   ```bash
   npm install
   ```
3. **Start the Development Server:** 
   ```bash
   npm run dev
   ```
4. **View the App:** Open your browser and navigate to the local server URL provided (usually `http://localhost:5173`).

---

## 🎨 Architectural Decisions & Aesthetics

### 1. The Design Philosophy ("Physical Wall Calendar")
To honor the core requirement of feeling like a "physical wall calendar," I engineered the layout from the ground up to utilize a vertical stacking layout natively:
- **The Visual Anchor:** A prominent, responsive architectural image grounds the calendar at the top.
- **The Spiral Binding:** Using advanced CSS gradients and drop shadows, I crafted highly realistic metallic "spiral binder rings" that connect the image section securely to the lower calendar grid, providing that striking physical aesthetic.
- **Premium Palettes:** Instead of utilizing basic colors, I mapped sophisticated Slate grays (`#0f172a`, `#1e293b`) paired with a vibrant Indigo (`#6366f1`) for highlight contrasts. 

### 2. Functional Tooling (Day Selection & UX)
- **Responsive Day Selection:** The `date-fns` library was integrated to handle all complex calendar logical constraints (spanning months, locating leap days). 
- **Hover Micro-Animations:** When building the day range slider, I incorporated smooth UX animations. Instead of just "clicking dates out of nowhere", as you drag your mouse it fluidly projects a sweeping, glowing span predicting your date range behind the scenes.

### 3. Integrated Notes & State Management 
- **Persistent Data Storage:** To guarantee your memo text persists across reloads and tab closures without over-engineering a full database backend, I hooked the `<textarea>` securely into the browser's native `localStorage`. Your thoughts are always tightly saved.
- **Single Component Architecture:** To minimize unnecessary prop-drilling complexity, the entirety of the application operates via focused state hooks within the robust `Calendar.tsx` file natively.

---

## 🛠️ Tech Stack Used

- **React 18** (UI Logic & State)
- **Vite** (Rapid Tooling & Compiling)
- **TypeScript** (Strongly-typed architecture)
- **Vanilla CSS** (Complete creative styling layout)
- **date-fns** (Mathematical Date/Time parsing system)
- **Lucide-React** (Premium SVG Icons)
