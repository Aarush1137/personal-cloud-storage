
# 🌩️ Personal Cloud Storage

Welcome to **Personal Cloud Storage**, a modern web application that allows users to securely upload, search, download, and manage their personal files in the cloud. Built with the latest web technologies, it provides a seamless and interactive user experience.

## 📋 Table of Contents

- [Demo](#-demo)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## 🚀 Demo

Check out the live application deployed on Vercel:

[Live Demo](https://cl-frontend-rosy.vercel.app/)

## ✨ Features

- **User Authentication:** Secure signup and login with Firebase Authentication.
- **File Upload:** Upload files securely to Firebase Storage.
- **File Management:** List, search, download, and delete files.
- **Modern UI:** Responsive and attractive user interface using Material-UI and custom styling.
- **Real-time Updates:** Automatically updates the file list after uploads or deletions.
- **Notifications:** Smooth notifications using Snackbars for user feedback.
- **Loading Indicators:** Visual feedback during asynchronous operations.

## 🛠️ Technologies Used

- **Frontend:**
  - React.js
  - Material-UI (MUI)
  - Axios
  - Firebase Authentication
  - Firebase Storage
  - React Spring (for animations)
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Firebase Admin SDK
- **Deployment:**
  - Vercel (Frontend)
  - Heroku or Render (Backend)

## 🏁 Getting Started

### Prerequisites

- **Node.js** and **npm** installed.
- **Firebase Account:** For authentication and storage.
- **MongoDB Instance:** Local or cloud-based (e.g., MongoDB Atlas).
- **Git Installed**

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Aarush1137/personal-cloud-storage.git
   cd personal-cloud-storage
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Firebase:**

   - Create a Firebase project.
   - Enable Email/Password Authentication.
   - Create a Firebase Storage bucket.
   - Replace the firebaseConfig object in `src/firebaseConfig.js` with your project's config.

4. **Set Up Environment Variables:**

   Create a `.env` file in the root of your project and add:

   ```env
   REACT_APP_FIREBASE_API_KEY=your-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id

   REACT_APP_API_BASE_URL=http://localhost:5000
   ```

   Note: Replace the placeholders with your actual Firebase project configuration.

### Running the App

1. **Start the Development Server:**

   ```bash
   npm start
   ```

2. **Open in Browser:**

   Visit [http://localhost:3000](http://localhost:3000) to view the app.

## 📂 Project Structure

```bash
personal-cloud-storage/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   └── logo.png
│   ├── components/
│   │   ├── AuthCard.js
│   │   ├── AuthCard.css
│   │   ├── FileUpload.js
│   │   ├── FileList.js
│   │   ├── FileSearch.js
│   │   ├── Logout.js
│   │   └── CustomButton.js
│   ├── firebaseConfig.js
│   ├── AuthContext.js
│   ├── NotificationContext.js
│   ├── theme.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .gitignore
├── package.json
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements.

## 📄 License

This project is licensed under the MIT License.

## 📬 Contact

Author: Aarush  
Email: aarushjain890@gmail.com 
GitHub: [Aarush1137](https://github.com/Aarush1137)  
Made with ❤️ by Aarush

