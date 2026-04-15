# DevBot Frontend — Production-Grade AI Chat UI

A premium, feature-rich React frontend for an intelligent AI chatbot application built with **Vite**, **React 18**, **Tailwind CSS**, and **Framer Motion**.

## 🎨 Features

### ✨ Design System
- **Dark mode first** design inspired by ChatGPT and Gemini
- Premium color palette: Purple (#7C3AED) + Cyan (#06B6D4)
- Glass morphism UI components with backdrop blur effects
- Custom scrollbar styling and smooth animations
- Responsive design with mobile-first approach

### 🔐 Authentication
- Secure JWT-based authentication
- Login and registration pages with real-time validation
- Auto-login state persistence with localStorage
- Protected routes with automatic redirects

### 💬 Real-Time Chat
- Socket.io-powered real-time messaging
- User and AI message bubbles with distinct styling
- Rich markdown rendering for AI responses
- Syntax-highlighted code blocks with copy functionality
- Typing indicators with animated dots
- Message timestamps and activity tracking

### 📁 Chat Organization
- Persistent chat history with sidebar navigation
- Create, view, and delete conversations
- Active chat highlighting and quick access
- Recent chats list with timestamps
- Auto-scroll to latest messages

### 🎭 Animations
- Smooth page transitions with Framer Motion
- Stagger animations for list items
- Hover effects on interactive elements
- Floating background orbs on landing page
- Loading spinners and skeleton screens
- Error shake animations for form validation

### 🛠️ Developer Experience
- Clean, modular component architecture
- Custom hooks for Socket.io and chat logic
- Zustand for lightweight state management
- Axios with interceptors for error handling
- Toast notifications for user feedback
- ESLint configuration for code quality

## 📦 Tech Stack

- **Frontend Framework**: React 18.3
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS 3.4
- **State Management**: Zustand 4.4
- **Real-Time Communication**: Socket.io-client 4.7
- **Animations**: Framer Motion 10.16
- **HTTP Client**: Axios 1.6
- **Markdown Rendering**: react-markdown + react-syntax-highlighter
- **Icons**: Lucide React 0.294
- **Notifications**: React Hot Toast 2.4
- **Date Formatting**: date-fns 3.0
- **TypeScript**: Not used (pure JavaScript)

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16.x
- npm or yarn package manager

### Installation

1. **Clone the repository** (if applicable)
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env` file in the frontend root:
```env
VITE_API_URL=http://localhost:5000/api
VITE_BACKEND_URL=http://localhost:5000
```

4. **Start development server**
```bash
npm run dev
```
The app will be available at `http://localhost:3000` (or next available port)

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

Preview the build:
```bash
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   └── RegisterForm.jsx
│   │   ├── chat/
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   ├── TypingIndicator.jsx
│   │   │   └── CodeBlock.jsx
│   │   ├── sidebar/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ChatList.jsx
│   │   │   └── NewChatButton.jsx
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Avatar.jsx
│   │   │   ├── Logo.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ChatPage.jsx
│   │   └── NotFound.jsx
│   ├── store/
│   │   ├── authStore.js (Zustand auth state)
│   │   └── chatStore.js (Zustand chat state)
│   ├── hooks/
│   │   ├── useSocket.js
│   │   └── useChat.js
│   ├── services/
│   │   ├── api.js (Axios instance with interceptors)
│   │   └── socket.js (Socket.io initialization)
│   ├── utils/
│   │   └── helpers.js (Utility functions)
│   ├── App.jsx (Main app with routing)
│   ├── main.jsx (Entry point)
│   └── index.css (Global styles + Tailwind)
├── index.html
├── .env (Environment variables)
├── .env.example (Template for .env)
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── eslint.config.js
```

## 🔌 API Integration

The frontend expects the following API endpoints:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Chat
- `GET /api/chat` - Get all chats
- `POST /api/chat` - Create new chat
- `DELETE /api/chat/:id` - Delete chat
- `GET /api/chat/:id/messages` - Get messages for a chat

### Response Format
All endpoints should return:
```json
{
  "data": {},
  "token": "JWT_TOKEN",
  "message": "Success message"
}
```

## 🔌 Socket.io Events

### Client Emit
- `ai-message` - Send message to AI
  ```js
  { message: string, chatId: string }
  ```

### Client Listen
- `ai-response` - Receive AI response
  ```js
  { message: string | content: string }
  ```
- `typing` - User is typing (not implemented yet)

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color palette:
```js
devbot: {
  bg: '#0A0A0F',        // Main background
  surface: '#111118',   // Card background
  surface2: '#1A1A2E',  // Sidebar background
  purple: '#7C3AED',    // Primary color
  cyan: '#06B6D4',      // Accent color
  border: '#1E1E2E',    // Border color
  text: '#F1F5F9',      // Primary text
  muted: '#94A3B8'      // Secondary text
}
```

### Fonts
Modify the font imports in `tailwind.config.js`:
- Heading: Space Grotesk
- Body: Inter
- Code: JetBrains Mono

### Animations
Adjust animation timing and styles in `index.css` and component files.

## 🔒 Security

- ✅ JWT tokens stored in localStorage
- ✅ Automatic token injection in API requests
- ✅ 401 error handling with auto-logout
- ✅ Protected routes with authentication checks
- ✅ CORS enabled for cross-origin requests
- ✅ Input validation on auth forms

## 📊 State Management

### Auth Store (Zustand)
```js
{
  user: null,
  token: null,
  isAuthenticated: false,
  login(user, token),
  logout(),
  hydrate()
}
```

### Chat Store (Zustand)
```js
{
  chats: [],
  activeChat: null,
  messages: [],
  isLoading: false,
  isAiTyping: false,
  setChats(),
  setActiveChat(),
  addMessage(),
  setMessages(),
  setAiTyping(),
  setLoading(),
  clearMessages(),
  reset()
}
```

## 🎬 Available Scripts

```bash
# Development server with HMR
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code with ESLint
npm run lint
```

## 🐛 Troubleshooting

### Port already in use
Vite will automatically use the next available port. Change it in `vite.config.js`:
```js
server: {
  port: 3001,
  strictPort: false
}
```

### Socket.io connection issues
- Ensure backend is running on `VITE_BACKEND_URL`
- Check CORS settings on backend
- Verify token is being sent correctly

### Styling not applied
- Clear Tailwind cache: `rm -rf node_modules/.cache`
- Rebuild: `npm run dev`
- Check class names follow Tailwind conventions

### API calls returning 401
- Clear localStorage: `localStorage.clear()`
- Re-login to get new token
- Check token expiration on backend

## 📱 Responsive Design

- **Mobile**: < 640px (single column, collapsible sidebar)
- **Tablet**: 640px - 1024px (side-by-side layout)
- **Desktop**: > 1024px (full sidebar + chat layout)

## ✅ Production Checklist

- [ ] Environment variables configured
- [ ] API endpoints verified
- [ ] Socket.io URL correct
- [ ] Build tested locally (`npm run build`)
- [ ] Console errors cleared
- [ ] Performance optimized (Lighthouse check)
- [ ] Security headers configured on server
- [ ] Error boundary implemented (optional)
- [ ] Analytics integrated (optional)
- [ ] CDN configured for assets (optional)

## 🚀 Deployment

### Vercel
```bash
npm install -g vercel
vercel login
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir dist
```

### Docker
```bash
docker build -t devbot-frontend .
docker run -p 3000:80 devbot-frontend
```

## 📝 License

Use this project freely for your needs.

## 🤝 Contributing

This is a standalone project. For issues or improvements, refer to documentation.

## 📞 Support

Ensure backend is running and properly configured before testing the frontend.

---

**Built with ❤️ as a premium AI chat interface**
