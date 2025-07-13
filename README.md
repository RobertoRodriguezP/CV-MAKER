# CV-MAKER 🧠💼

An interactive, customizable, and downloadable resume builder built with **Next.js**, **Zustand**, **TailwindCSS**, and **html2pdf.js**.  
Switch between professional profiles like **Technical**, **Freelance**, or **Corporate**, and show/hide CV sections dynamically.

---

## ✨ Features

- Tab-based switching between CV types (General, Technical, Freelance, Corporate)
- Dynamic section visibility (About, Skills, Experience, etc.)
- Loaded from JSON for easy editing
- Export as beautifully styled PDF
- Styled with TailwindCSS for a modern, minimalist feel
- Zustand global state management

---

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/RobertoRodriguezP/CV-MAKER.git
cd CV-MAKER
```

### 2. Install dependencies
```bash
npm install
```
or
```bash
yarn install
```

### 3. Run the development server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the app.

---

## 📁 Folder Structure

```
/public/data/roberto-cv.json   ← Personal data in JSON
/src/components/               ← UI components (Tabs, Sections, Filter, Button)
/src/pages/index.tsx           ← Main page
/src/store/cvStore.ts          ← Zustand state logic
/styles/globals.css            ← Global styles (Tailwind)
```

---

## 📄 JSON Structure Example (`/public/data/roberto-cv.json`)

```json
{
  "about": "...",
  "skills": {
    "hard": ["Python", "ETL", "SQL"],
    "soft": ["Leadership", "Communication"]
  },
  "experience": [...],
  "education": [...],
  "certificates": [...],
  "projects": [...]
}
```

---

## 🛠️ Customization

- Edit `cvStore.ts` to control which sections show per profile.
- Change fonts, spacing, or colors via `TailwindCSS` utility classes.
- Replace content easily by updating `roberto-cv.json`.

---

## 📤 Export as PDF

Click the green **"Download as PDF"** button — it converts the currently visible sections into a polished PDF document using `html2pdf.js`.

---

## 📘 License

MIT License
