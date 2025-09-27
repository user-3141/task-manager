# Menedżer Zadań

Prosty menedżer zadań zbudowany w **React** z możliwością uruchomienia jako aplikacja webowa lub desktopowa dzięki **Electron**.

## Funkcjonalności

- **Dodawanie zadań** - Szybkie tworzenie nowych zadań
- **Zaznaczanie jako wykonane** - Oznaczanie ukończonych zadań
- **Usuwanie zadań** - Usuwanie pojedynczych zadań lub wszystkich ukończonych
- **Filtrowanie** - Wyświetlanie wszystkich, aktywnych lub ukończonych zadań
- **Zapis lokalny** - Automatyczny zapis w localStorage (bez potrzeby backendu)
- **Statystyki** - Podgląd liczby zadań w różnych stanach

## Zapis Danych
- Dane są zapisywane automatycznie w `localStorage` przeglądarki
- Nie wymaga żadnego backendu ani bazy danych
- Dane są trwałe między sesjami

## Technologie

- **React 18** - Biblioteka do budowy interfejsu
- **Vite** - Szybki bundler i dev server
- **Tailwind CSS** - Framework do stylizacji
- **Electron** - Framework do aplikacji desktopowych
- **ESLint** - Linter do jakości kodu
- **Vitest** - Framework do testów
- **GitHub Actions** - CI/CD

## Instalacja

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
- Windows: `.exe` 
- macOS: `.dmg` 
- Linux: `.AppImage` 

## Testowanie i Jakość Kodu

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

## Struktura Projektu

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

## Konfiguracja

### Zmiana portu deweloperskiego
W pliku `vite.config.js`:
```javascript
server: {
  port: 3000 // zmień na wybrany port
}
```

## Autor

**Przemysław Dąbrowski**
- GitHub: [@user-3141](https://github.com/user-3141)

