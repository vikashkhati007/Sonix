# Sonix

**Sonix** is a completely free, open-source music player for Android, iOS, and web—no ads, no paywalls, just smooth listening. Enjoy trending playlists, instant song search, and a beautiful, intuitive UI. Powered by Expo and React Native. Stream, discover, and manage your music library with zero distractions!

***

## ✨ Features

- **Modern Music Player UI**: Intuitive layout with dynamic theme and smooth navigation.
- **Tab Navigation**: Easily switch between library, trending, activity, and search tabs.
- **Search Functionality**: Search for songs, albums, and artists with instant results and filter options (A-Z, Artist, etc).
- **Playlist Support**: Mood-based and trending playlists. Fetch playlist details, navigate between tracks.
- **Recent & Liked History**: Tracks your recently played and favorite songs.
- **Download & Streaming**: Supports both streaming and offline download (with proper permissions).
- **Cross-platform**: Compatible with Android, iOS, and Web (Expo Go and PWA).
- **Beautiful Animations & Effects**: Leverages Expo libraries for gradients, images, haptic feedback, and blur effects.
- **Customizable & Extensible**: Modular component structure and typed routing for easier maintenance.
- **Persistent Storage**: Uses AsyncStorage for persisting user data such as liked/recent songs.

***

## 🗂️ Project Structure

```
Sonix/
│
├── app/
│   ├── (api)/         # API integration and backend logic
│   ├── (tabs)/        # Tab navigation: Home, Search, Activity, Settings
│   ├── library/       # Playlist and library screens
│   ├── player/        # Music player component
│   └── _layout.tsx    # App-wide layout and routing
│
├── assets/images/     # All image assets (icons, splash, etc)
├── components/
│   ├── screen/        # Screen-level React components (Home, Player, etc)
│   └── ui/            # UI components/widgets
├── constants/         # Shared constants (themes, helpers, playlist data)
├── hooks/             # Custom React hooks
├── scripts/           # Node scripts for project automation
├── package.json       # Dependency and project config
├── app.json           # Expo application config
└── README.md          # Project documentation
```

***

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- Android Studio/iOS Simulator for mobile testing (optional)

### Installation

```bash
git clone https://github.com/vikashkhati007/Sonix.git
cd Sonix
npm install
```

### Running the App

```bash
npx expo start
```
Choose to run in the development build, Android Emulator, iOS Simulator, or Expo Go on your device.

### Project Reset (Blank Slate)

To clear starter code and start afresh:
```bash
npm run reset-project
```
This moves example code to `app-example/` and creates a blank `app/` directory.

***

## 📱 Usage

- Explore trending and mood-based playlists on the Home screen.
- Search for your favorite songs, albums, or artists.
- Access and manage your music library, recently viewed, and liked songs.
- Stream songs online or download for offline playback.
- Supports dark mode and modern navigation gestures.

***

## 🤝 Contributing

We welcome contributions from the community!

### How to Contribute

1. **Fork the repository** to your own GitHub account.
2. **Create a new branch** for your feature or bugfix:
   ```
   git checkout -b feat/my-feature
   ```
3. **Commit your changes** with clear, concise commit messages.
4. **Push to your forked repo** and **open a Pull Request** here.
5. Clearly describe your changes and reference related issues if any.

### Guidelines

- Use the existing file and folder structure.
- Follow the [Conventional Commits](https://www.conventionalcommits.org/) format.
- Write clean, readable, and well-commented code.
- Run `npm run lint` to check for linting errors.
- Ensure your code does not break other features.

### Need Help?

Open an [issue](https://github.com/vikashkhati007/Sonix/issues) with your question or suggestion!

***

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

***

## 🙏 Acknowledgements

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Contributors](https://github.com/vikashkhati007/Sonix/graphs/contributors)

***

*Happy Listening!*

***

