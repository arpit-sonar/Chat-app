# SyncChat – Real-Time Messaging Application

**[View Live Demo]**(https://chat-app-lac-nine-90.vercel.app/)

## 🏗️ Architecture & Workflow

![SyncChat - Architecture Diagram](./SyncChat-Architecture_Diagram.png)

### **System Workflow**
1. **Client Initialization:** The React app loads via Vite, initiating the Context API to establish the global state environment.
2. **Authentication Flow:**
   * Users sign up/log in via Firebase Auth.
   * Upon successful authentication, a listener triggers user data retrieval from Firestore and populates the global `AppContext`.
3. **Real-Time Synchronization:**
   * Active chats utilize Firestore `onSnapshot` listeners.
   * When a user sends a message, a write request is pushed to Firestore.
   * The listener instantly detects the database mutation and pushes the updated payload back to the client, triggering a precise DOM re-render in the UI.
4. **Session Termination:** Upon logout, explicit state-clearing functions purge all chat and user data from the global memory, eliminating state persistence and securing data privacy before routing back to the login gateway.

## 💻 Technical Stack

**Frontend**
* **React.js** – Core UI library for building the SPA.
* **Vite** – Next-generation frontend tooling for rapid compilation and optimized builds.
* **Context API** – Built-in React state management to handle user sessions and chat data globally.
* **CSS3** – Advanced Flexbox and Grid layouts, utilizing custom media queries for responsive design.

**Backend & Database (BaaS)**
* **Firebase Authentication** – Secure, encrypted user sign-up and login handling.
* **Firebase Firestore** – NoSQL cloud database utilizing WebSocket connections for real-time data streaming.

**Deployment & CI/CD**
* **Vercel** – Production hosting with continuous deployment linked directly to the `main` GitHub branch.

## ✨ Core Features
* **Bi-directional Real-Time Messaging:** Instantaneous message delivery and dynamic chat history rendering.
* **Responsive Fluid UI:** Mobile-first architecture that seamlessly transitions between 1, 2, and 3-column layouts based on spatial constraints.
* **Secure State Management:** Strict null-checking and global state purging to prevent data leaks between user sessions.
* **Scroll-Bound Chat Interface:** Flexbox-constrained message containers ensuring intuitive internal scrolling without layout overflow.


## 🔷 Contact
* **Arpit Sonar**
* **Institution:** IIT (BHU) Varanasi
* **Email:** arpitsonar12@gmail.com
