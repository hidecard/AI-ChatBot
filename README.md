# YHA - AI (React + Vite)

**YHA - AI** သည် အဆင့်မြင့် AI-powered chat application တစ်ခုဖြစ်ပြီး React + Vite ဖြင့် ပြန်လည်ရေးသာ��ထားပါသည်။ မြန်မာဘာသာနှင့် အင်္ဂလိပ်ဘာသာ နှစ်မျိုးလုံးကို support ပေးပါတယ်။

## 🌟 အင်္ဂါရပ်များ

- **React + Vite** - မြန်ဆန်သော development နှင့် build process
- **Modern UI/UX** - Clean, responsive design with dark/light mode
- **Myanmar Language Support** - မြန်မာဘာသာဖြင့် အပြည့်အဝ support
- **Real-time Chat** - Gemini 1.5 Flash API ဖြင့် intelligent responses
- **File Upload** - Text files နှင့် images များ upload လုပ်နိုင်ပါသည်
- **Chat History** - Firebase ဖြင့် conversations များကို save လုပ်ပါသည်
- **Authentication** - Firebase Auth ဖြင့် secure user management
- **Code Syntax Highlighting** - Prism.js ဖြင့် code blocks များကို highlight ပေးပါသည်
- **Responsive Design** - Mobile နှင့် desktop နှစ်မျိုးလုံးတွင် အကောင်းဆုံး experience

## 🚀 Quick Start

### Prerequisites

- Node.js (version 18 or higher)
- npm သို့မဟုတ် yarn
- Firebase project with Authentication and Realtime Database
- Gemini API key

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd yha-ai-react
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure Firebase**:
   `src/utils/firebase.js` ဖိုင်တွင် သင့်ရဲ့ Firebase configuration ကို update လုပ်ပါ:

   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-auth-domain",
     databaseURL: "your-database-url",
     projectId: "your-project-id",
     storageBucket: "your-storage-bucket",
     messagingSenderId: "your-messaging-sender-id",
     appId: "your-app-id",
   };
   ```

4. **Configure Gemini API**:
   `src/utils/api.js` ဖိုင်တွင် သင့်ရဲ့ Gemini API key ကို update လုပ်ပါ:

   ```javascript
   const API_KEY = "your-gemini-api-key";
   ```

5. **Start development server**:

   ```bash
   npm run dev
   ```

6. **Open browser**:
   http://localhost:3000 ကို browser တွင် ဖွင့်ပါ

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── AuthContainer.jsx    # Authentication UI
│   ├── ChatContainer.jsx    # Main chat interface
│   ├── Message.jsx          # Individual message component
│   ├── Sidebar.jsx          # Navigation sidebar
│   ├── FilePreview.jsx      # File upload preview
│   └── Toast.jsx            # Notification component
├── hooks/               # Custom React hooks
│   ├── useAuth.js          # Authentication logic
│   ├── useChat.js          # Chat management
│   └── useTheme.js         # Theme switching
├── utils/               # Utility functions
│   ├── firebase.js         # Firebase configuration
│   ├── api.js              # Gemini API integration
│   ├── messageFormatter.js # Message formatting
│   └── toast.js            # Toast notifications
├── styles/              # CSS styles
│   └── globals.css         # Global styles
├── App.jsx              # Main application component
└── main.jsx             # React entry point
```

## 🎨 Tech Stack

| **Technology**  | **Purpose**                       |
| --------------- | --------------------------------- |
| **React 18**    | Frontend framework                |
| **Vite**        | Build tool and dev server         |
| **Firebase**    | Authentication & Database         |
| **Gemini API**  | AI-powered chat responses         |
| **Bootstrap 5** | UI components and grid system     |
| **Prism.js**    | Syntax highlighting               |
| **CSS3**        | Custom styling with CSS variables |

## 📱 Features

### Authentication

- Email/Password နှင့် registration/login
- Firebase Authentication integration
- Persistent user sessions

### Chat Interface

- Real-time messaging with AI
- Message history with timestamps
- Copy message functionality
- File upload support (text files, images)
- Code syntax highlighting

### Theme Support

- Light/Dark mode toggle
- CSS variables for consistent theming
- Smooth transitions

### Responsive Design

- Mobile-first approach
- Collapsible sidebar on mobile
- Touch-friendly interface

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Setup

For development, you can create a `.env.local` file:

```
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_GEMINI_API_KEY=your-gemini-api-key
```

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## 🤝 Contributing

Contributions များကို ကြိုဆိုပါတယ်! Contributing လုပ်ရန်:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions or support:

- Open an issue on GitHub
- Email: hidecard1500@gmail.com

---

**Note**: This is the React + Vite version of the YHA-AI application. သင့်အတွက် modern, scalable, နှင့် maintainable codebase ဖြစ်ပါသည်။
