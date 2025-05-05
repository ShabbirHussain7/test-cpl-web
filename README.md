# CPL (Sample) Website 

This repository contains the code for the CPL research lab website, built using React, TailwindCSS, and Vite.

## 🚀 Quick Start

Follow these steps to clone, install dependencies, and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/cpl-website.git
cd cpl-website
```

### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) installed (version 16 or above recommended).

Then install the dependencies:

```bash
npm install
```

### 3. Run the Development Server

Start the local development server:

```bash
npm run dev
```

This will launch the website at:

```
http://localhost:5173/
```

You can now view and edit the site live.

### 4. Build for Production

To create an optimized production build:

```bash
npm run build
```

This will output the production-ready files into the `/dist` directory.

### 5. Preview the Production Build Locally

You can preview what the production version will look like:

```bash
npm run preview
```

It will serve the `/dist` folder locally.

## 🛠 Additional Notes

- All images and other "data" files are inside `public/` folder.
- The project is configured to deploy easily on GitHub Pages using `npm run deploy`.
- TailwindCSS is used for styling.
- publications with name ending with "-homepage.md" will be displayed on homepage as selected publications
- Do NOT use backticks in .md files or the page won't load
