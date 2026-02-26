# CREATECH: The Operating System for Creative Work

![Project Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

CREATECH is a premium, multi-role web platform designed to seamlessly connect Creators with Clients while providing Administrators with powerful tracking and mediation oversight.

Built with lightning-fast **React (Vite)** and featuring a stunning **Dark Mode Glassmorphism** design system, CREATECH abandons standard templates in favor of a bespoke, beautiful, and highly responsive user interface tailored specifically for the creative economy.

---

## Key Platform Features

### 1. Tri-Role Architecture 
The application dynamically re-configures its routing, navigation, and permissions based on the active user session:
- **Creators:** Dedicated access to Studio analytics, gig management (`My Gigs`), unified inboxes, and a Wallet interface strictly built for withdrawing earnings.
- **Clients:** Streamlined dashboard visualizing active hires, tracking project spend, maintaining funding sources, and reviewing active orders.
- **Administrators:** A supreme access tier featuring platform health analytics, bi-lateral transaction tracking, suspension mediation interfaces, and platform configuration controls.

### 2. Premium Glassmorphism UI
Designed from scratch using vanilla CSS, the platform leverages advanced visual techniques:
- **Responsive Layout:** 100vh flex-row architecture with a stationary frosted-glass sidebar and dynamic scrollable main content.
- **Visual Depth:** Extensive use of `backdrop-filter: blur`, subtle semi-transparent borders, and deep `#101010` background contrasting with vibrant `#3b82f6` UI accents.
- **Lucide Iconography:** Elegant, consistent, lightweight SVG icons utilized across every button and data readout.

### 3. Context-Driven State Management
Escrow transactions, active orders, and structural platform states are managed using React's `Context API` (`useProjects.jsx`). 
- **Admin Moderation:** Project cards dynamically render 15% `Platform Fee` calculations, expose bi-lateral tracking (Creator + Client visibility), and feature "Force Suspend" flags exclusively for the Administrator scope.
- **Strict Role Permissions:** Component level conditions prevent clients from modifying project scopes or withdrawing platform funds, securing the mock business logic.

---

## Code Structure Highlights

| Directory | Purpose |
| :--- | :--- |
| `/components` | Strictly reusable, stateless UI atoms (e.g., `Card.jsx`, `Button.jsx`, `Sidebar.jsx`). |
| `/pages` | Full-scale view templates routing specific platform features (e.g., `CreatorDashboardPage.jsx`, `SettingsPage.jsx`). |
| `/context` | Global state handlers feeding prop-drilled data globally efficiently without Redux. |

---

## Quick Start Guide

```bash
# 1. Clone the repository
git clone https://github.com/Almondster/AppDev.git

# 2. Navigate to the directory
cd AppDev

# 3. Install NPM Core Dependencies
npm install

# 4. Ignite the Vite engine
npm run dev
```

### Local Testing
By default, the application relies on `localStorage` to mock active sessions. 
- You can manually toggle between roles (`Creator`, `Client`, `Admin`) directly from the universally accessible `/login` route to observe how the platform re-renders the Sidebar and UI boundaries uniquely for each user type.
