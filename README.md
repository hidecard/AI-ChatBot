# YHA - AI

**YHA - AI** is a sleek, modern, and responsive AI-powered chat application designed to empower users to explore AI, coding, and computer science concepts. With a clean and intuitive UI, it offers a seamless experience for learning, debugging, and interacting with AI. Built with a robust tech stack, it combines performance with aesthetic appeal, supporting both desktop and mobile users.

## Features

- **Dynamic Chat Interface**: Engage with an AI model to ask questions, debug code, or dive into AI concepts with a smooth, conversational flow.
- **Chat History Management**: Save, search, edit, or clear conversations, stored locally in the browser for quick access.
- **Dark Mode Toggle**: Switch between light and dark themes with a visually appealing transition for enhanced readability.
- **Code Syntax Highlighting**: Display code snippets with vibrant, language-specific highlighting using Prism.js.
- **Responsive Design**: Optimized for all devices with a fluid layout, powered by Bootstrap 5.
- **Copy Functionality**: Easily copy message text or code blocks with a single click.
- **Collapsible Sidebar**: A stylish sidebar for chat history and settings, with smooth animations and mobile-friendly toggling.
- **AI Integration**: Connects to the Gemini 1.5 Flash API for intelligent, real-time responses.

## UI Highlights

The UI of **YHA - AI** is designed for both functionality and aesthetics:
- **Modern Aesthetic**: Clean typography with Google Fonts (Inter and Fira Code) and a vibrant orange accent color (`#f97316`) for a professional yet approachable look.
- **Smooth Animations**: Subtle slide-in effects for messages and a collapsible sidebar with fluid transitions.
- **Interactive Elements**: Hover effects for buttons, copy icons, and chat history items enhance user engagement.
- **Accessible Design**: High-contrast themes and ARIA labels ensure accessibility for all users.
- **Code Blocks**: Scrollable, expandable code blocks with line numbers and copy buttons for a polished coding experience.

## Tech Stack

| **Category**         | **Technology**                              | **Purpose**                                      |
|-----------------------|---------------------------------------------|--------------------------------------------------|
| **Frontend**          | HTML5                                      | Structure of the application                    |
| **Styling**           | CSS3 (Custom with CSS Variables)           | Theming, responsiveness, and animations         |
| **Framework**         | Bootstrap 5                                | Responsive layout and UI components             |
| **JavaScript**        | JavaScript (ES6)                           | Interactivity, API calls, and local storage     |
| **Syntax Highlighting** | Prism.js                                  | Code formatting for multiple languages          |
| **Typography**        | Google Fonts (Inter, Fira Code)            | Clean and readable fonts for UI and code        |
| **Icons**             | Bootstrap Icons                            | Lightweight, scalable icons for UI elements     |
| **API**               | Gemini 1.5 Flash API                       | Powers AI-driven chat responses                 |
| **Chat History**      | Local Storage (Browser API)               | Persistent storage for conversations             |
| **Theming**           | CSS Variables (Dark/Light Mode)            | Dynamic theme switching for enhanced user experience |
| **Code Blocks**       | Prism.js                                  | Syntax highlighting for code blocks             |          |



## Installation
To set up the YHA - AI project locally, follow these steps:

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, etc.).
- A Firebase project with Authentication, Realtime Database, and Storage enabled.
- A Gemini API key for AI functionality.

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/hidecard/AI-ChatBot.git
   cd AI-ChatBot 
   ```

2. **Set Up Firebase**:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Email/Password Authentication in the Authentication section.
   - Set up the Realtime Database and Storage with appropriate rules.
   - Update the `firebaseConfig` object in the `<script>` section of `index.html` with your Firebase project credentials:
     ```javascript
     const firebaseConfig = {
         apiKey: "YOUR_API_KEY",
         authDomain: "YOUR_AUTH_DOMAIN",
         databaseURL: "YOUR_DATABASE_URL",
         projectId: "YOUR_PROJECT_ID",
         storageBucket: "YOUR_STORAGE_BUCKET",
         messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
         appId: "YOUR_APP_ID",
         measurementId: "YOUR_MEASUREMENT_ID"
     };
     ```

3. **Set Up Gemini API**:
   - Obtain a Gemini API key from the [Google Cloud Console](https://cloud.google.com/).
   - Update the `API_URL` in the `<script>` section of `index.html` with your API key:
     ```javascript
     const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_GEMINI_API_KEY`;
     ```

4. **Serve the Application**:
   - Since this is a static web application, you can serve it using a local server. For example, using Python:
     ```bash
     python -m http.server 8000
     ```
   - Open your browser and navigate to `http://localhost:8000`.

5. **Optional: Deploy to Hosting**:
   - Deploy to Firebase Hosting or any static hosting service (e.g., GitHub Pages, Netlify).
   - For Firebase Hosting:
     ```bash
     npm install -g firebase-tools
     firebase login
     firebase init hosting
     firebase deploy
     ```

## Usage
1. **Access the Application**:
   - Open the application in a web browser.
   - If not logged in, you'll see the authentication page. Register or log in using an email and password.

2. **Chat Interface**:
   - Start a new chat by clicking the "New Chat" button in the sidebar.
   - Type a message or upload a file (text or image) and submit to receive an AI response.
   - Use the sidebar to view, search, or edit past conversations.
   - Toggle between light and dark modes using the theme toggle button.

3. **File Uploads**:
   - Upload text or image files via the file input button in the chat input area.
   - Preview uploaded files and remove them if needed.

4. **Chat History**:
   - View all conversations in the sidebar.
   - Search conversations using the search bar.
   - Edit conversation titles by clicking the pencil icon next to a chat.

5. **Logout**:
   - Click the "Logout" button in the sidebar to sign out and clear local data.

## Project Structure
```plaintext
yha-ai/
├── index.html        # Main HTML file with UI and client-side logic
├── README.md        # Project documentation (this file)
└── assets/          # (Optional) Directory for additional assets (e.g., images, custom styles)
```

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request with a detailed description of your changes.

Please ensure your code follows the existing style and includes appropriate comments.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


## Contact Details

For questions, feedback, or issues, please:

Open an issue on GitHub.
Email hidecard1500@gmail.com.

