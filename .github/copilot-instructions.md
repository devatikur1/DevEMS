# DevEMS Copilot Instructions

## Project Overview

DevEMS is a React-based Employee Management System using Firebase for authentication and data storage. It features workspace creation, overview dashboards, and role-based access (admin/employee). Built with Create React App, Tailwind CSS, and animations via GSAP/Framer Motion.

## Architecture & Data Flow

- **Frontend Structure**: Pages in `src/pages/`, components in `src/components/`, layouts in `src/layouts/`, context in `src/context/`.
- **Routing**: React Router with nested routes; `/u` for user area, `/create-workspace` for workspace creation.
- **State Management**: React Context (`AppContextProvider.jsx`) for auth (`authId`) and workspaces (`overviewdt`).
- **Data Storage**: Firestore collections: `users`, `workspace`, `{username}-workspace`. Images uploaded to ImgBB.
- **Authentication**: Firebase Auth with Google OAuth; user data synced to localStorage and context on login.

## Key Conventions & Patterns

- **Styling**: Tailwind with custom theme in `tailwind.config.js` (e.g., `bg`, `surface`, `accent`). Use `clsx` for conditional classes.
- **Animations**: GSAP for complex sequences (e.g., `HomePage.jsx` hero reveal), Framer Motion for UI transitions (e.g., modals in `Header.jsx`).
- **Forms**: Controlled components with validation; image uploads via `FormData` to ImgBB API (key in `CreateWorkspacePage.js`).
- **Error Handling**: Toast notifications via `react-hot-toast`; custom error messages for Firebase ops.
- **Role-Based UI**: Check `userDt.role` for conditional rendering (e.g., admin nav in `ULayout.js`).
- **URL State**: Use `useSearchParams` for view toggles (grid/list in `OverviewPage.js`) and modals (profile settings in `Header.jsx`).
- **Component Organization**: Sub-components in folders (e.g., `CreateWorkspace/WorkspaceMain/`); props passed as objects (e.g., `tite={{ title, setTitle }}`).
- **Firebase Ops**: Use `doc()`, `setDoc()`, `getDoc()` from Firestore; auth listeners in `AppContextProvider.jsx`.

## Developer Workflows

- **Start Dev Server**: `npm start` (CRA default, serves on :3000).
- **Build**: `npm run build` (outputs to `build/`).
- **Test**: `npm test` (Jest/React Testing Library).
- **Environment**: Set Firebase/ImgBB keys in `.env` (e.g., `REACT_APP_FIREBASE_API_KEY`).
- **Debugging**: Console logs for auth state; check Firestore rules for data access.
- **Deployment**: Standard CRA build; ensure Firebase project allows web origins.

## Integration Points

- **Firebase**: Auth in `AppContext.js`; Firestore queries in pages (e.g., workspace creation in `CreateWorkspacePage.js`).
- **ImgBB**: Image uploads with API key; handle 32MB limit and success/error responses.
- **Google OAuth**: Popup auth in `LoginPage.js`; role selection before login.

## Common Patterns

- **Context Usage**: Destructure from `useContext(AppContext)` (e.g., `{ authId, overviewdt }`).
- **Navigation**: `useNavigate` for programmatic routing; `Link` for static links.
- **Async Ops**: `try/catch` with toast for user feedback; loading states with `isCreteing`.
- **Unique IDs**: `crypto.randomUUID()` or fallback in `generateUniqueId()`.
- **Date Handling**: ISO strings for Firestore; `moment` for relative time (e.g., "Updated 2 hours ago" in `GridPlaceholder.jsx`).

## Key Files to Reference

- `src/App.js`: Router setup and route structure.
- `src/context/AppContextProvider.jsx`: Auth listener and state management.
- `src/pages/OverviewPage.js`: Workspace display and view toggling.
- `src/components/CreateWorkspace/WorkspaceMain.jsx`: Form composition pattern.
- `tailwind.config.js`: Custom color palette and content paths.
