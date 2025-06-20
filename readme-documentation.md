# 📋 Menedżer Zadań

Prosty menedżer zadań zbudowany w **React** z możliwością uruchomienia jako aplikacja webowa lub desktopowa dzięki **Electron**.

## ✨ Funkcjonalności

- ➕ **Dodawanie zadań** - Szybkie tworzenie nowych zadań
- ✅ **Zaznaczanie jako wykonane** - Oznaczanie ukończonych zadań
- 🗑️ **Usuwanie zadań** - Usuwanie pojedynczych zadań lub wszystkich ukończonych
- 🔍 **Filtrowanie** - Wyświetlanie wszystkich, aktywnych lub ukończonych zadań
- 💾 **Zapis lokalny** - Automatyczny zapis w localStorage (bez potrzeby backendu)
- 📊 **Statystyki** - Podgląd liczby zadań w różnych stanach

## 🚀 Technologie

- **React 18** - Biblioteka do budowy interfejsu
- **Vite** - Szybki bundler i dev server
- **Tailwind CSS** - Framework do stylizacji
- **Electron** - Framework do aplikacji desktopowych
- **ESLint** - Linter do jakości kodu
- **Vitest** - Framework do testów
- **GitHub Actions** - CI/CD

## 📦 Instalacja

### Wymagania
- Node.js 18+ 
- npm lub yarn

### Kroki instalacji

1. **Sklonuj repozytorium**
```bash
git clone https://github.com/user-3141/task-manager.git
cd task-manager
```

2. **Zainstaluj zależności**
```bash
npm install
```

## 🏃‍♂️ Uruchamianie

### Aplikacja webowa (rozwój)
```bash
npm run dev
```
Aplikacja będzie dostępna pod adresem: http://localhost:5173

### Aplikacja desktopowa (rozwój)
```bash
npm run electron-dev
```
Uruchomi się serwer deweloperski + Electron

### Build produkcyjny

**Aplikacja webowa:**
```bash
npm run build
npm run preview
```

**Aplikacja Electron:**
```bash
npm run electron-build
```

Pliki instalacyjne znajdziesz w folderze `dist-electron/`:
- Windows: `.exe` installer
- macOS: `.dmg` installer  
- Linux: `.AppImage` file

## 🧪 Testowanie i Jakość Kodu

```bash
# Uruchom testy
npm run test

# Uruchom testy z interfejsem
npm run test:ui

# Sprawdź kod z ESLint
npm run lint

# Napraw automatycznie błędy ESLint
npm run lint:fix
```

## 📁 Struktura Projektu

```
task-manager/
├── src/
│   ├── components/
│   │   └── TaskManager.jsx     # Główny komponent aplikacji
│   ├── App.jsx                 # Root komponent
│   ├── main.jsx               # Entry point React
│   └── index.css              # Główne style
├── public/
│   ├── electron.js            # Główny proces Electron
│   └── task-icon.svg          # Ikona aplikacji
├── dist/                      # Build webowy
├── dist-electron/             # Build Electron
├── .github/
│   └── workflows/             # GitHub Actions
│       ├── ci.yml            # CI Pipeline
│       └── release.yml       # Release Pipeline
├── package.json
├── vite.config.js            # Konfiguracja Vite
├── tailwind.config.js        # Konfiguracja Tailwind
├── vitest.config.js          # Konfiguracja testów
├── .eslintrc.js              # Konfiguracja ESLint
└── README.md
```

## 🔧 Konfiguracja

### Zmiana portu deweloperskiego
W pliku `vite.config.js`:
```javascript
server: {
  port: 3000 // zmień na wybrany port
}
```

## 📊 Funkcjonalności Techniczne

### Zapis Danych
- Dane są zapisywane automatycznie w `localStorage` przeglądarki
- Nie wymaga żadnego backendu ani bazy danych
- Dane są trwałe między sesjami

### Responsywność
- Aplikacja działa na wszystkich urządzeniach
- Optymalizacja dla mobile, tablet i desktop
- Adaptive layout z Tailwind CSS

### Bezpieczeństwo Electron
- Wyłączony `nodeIntegration`
- Włączony `contextIsolation`  
- Zabezpieczenia przed XSS
- Kontrola otwierania linków zewnętrznych

## 🚀 Deployment

### GitHub Pages (aplikacja webowa)
```bash
npm run build
# Wgraj zawartość folderu dist/ na GitHub Pages
```

### Releases (aplikacja desktopowa)
1. Stwórz tag: `git tag v1.0.0`
2. Wypchnij tag: `git push origin v1.0.0`
3. GitHub Actions automatycznie zbuduje i wyda release

## 🤝 Rozwój

### Dodawanie nowych funkcji
1. Stwórz branch: `git checkout -b feature/nowa-funkcja`
2. Wprowadź zmiany
3. Dodaj testy jeśli potrzebne
4. Uruchom `npm run lint` i `npm run test`
5. Stwórz Pull Request

### Style i Konwencje
- Używaj Tailwind CSS do stylizacji
- Komponenty funkcyjne z hooks
- ESLint + Prettier dla spójności kodu
- Testy dla krytycznych funkcji

## 📝 Changelog

### v1.0.0 (2024-12-XX)
- ✨ Podstawowa funkcjonalność menedżera zadań
- 🎨 Responsywny interfejs użytkownika  
- 💾 Zapis w localStorage
- 🖥️ Wsparcie dla Electron
- 🔧 Kompletna konfiguracja CI/CD

## 📄 Licencja

MIT License - zobacz plik `LICENSE` dla szczegółów.

## 👨‍💻 Autor

**Twoje Imię**
- GitHub: [@twoja-nazwa](https://github.com/twoja-nazwa)
- Email: twoj-email@example.com

## 🙏 Podziękowania

- [React](https://reactjs.org/) - Za fantastyczną bibliotekę
- [Electron](https://electronjs.org/) - Za umożliwienie aplikacji desktopowych
- [Tailwind CSS](https://tailwindcss.com/) - Za piękne style
- [Lucide](https://lucide.dev/) - Za wspaniałe ikony

---

⭐ **Jeśli projekt Ci się podoba, zostaw gwiazdkę!** ⭐