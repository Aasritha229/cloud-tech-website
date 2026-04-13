# Cloud Tech Website

A modern Angular SPA inspired by DXC Technology's Public Cloud Service Excellence portal.

---

## Prerequisites

Install these before anything else:

### 1. Node.js
- Download from: https://nodejs.org
- Choose the **LTS** version
- Run the installer

Verify:
```bash
node -v
npm -v
```

### 2. Angular CLI
```bash
npm install -g @angular/cli
```

Verify:
```bash
ng version
```

### 3. Git
- Download from: https://git-scm.com/download/win
- Run the installer

Verify:
```bash
git --version
```

---

## Getting Started

### Clone the repository
```bash
git clone https://github.com/Aasritha229/cloud-tech-website.git
```

### Navigate into the project
```bash
cd cloud-tech-website
```

### Install dependencies
```bash
npm install
```

### Run the development server
```bash
ng serve
```

Open your browser and go to:
```
http://localhost:4200
```

---

## Build for Production
```bash
ng build --configuration=production
```

---

## Deploy to GitHub Pages
```bash
ng build --configuration=production --base-href "https://Aasritha229.github.io/cloud-tech-website/"
npx angular-cli-ghpages --dir=dist/cloud-tech-website/browser
```

---

## Tech Stack

- Angular 17+
- TypeScript
- SCSS
- @ng-icons/heroicons
- fast-check (property-based testing)

---

## Project Structure

```
src/
  app/
    components/
      nav/          ← DXC purple header + navigation
      hero/         ← Full-viewport hero with particle animation
      services/     ← Cloud Operational Excellence content
      footer/       ← DXC footer
    shared/
      services/     ← ScrollService, CounterAnimationService
      directives/   ← ObserveVisibilityDirective
      models/       ← TypeScript interfaces
    styles/         ← SCSS tokens, mixins, typography
```

---

© 2025 DXC Technology Company. All rights reserved.
