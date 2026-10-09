# Leonid Bondarchuk — Portfolio

Persönliches Entwicklerportfolio mit integriertem Online-Lebenslauf und drei interaktiven Webprojekten. Das Repository enthält ein React-Frontend und eine Express-API mit MongoDB.

## Projekte

| Projekt | Beschreibung | Route |
| --- | --- | --- |
| Events | Kalender mit Tagesübersicht, Terminen, Detailansicht und Bearbeitung im Zeitplan | `/dashboard/events` |
| To Do | Aufgabenverwaltung mit Suche, Filtern, Sortierung, Seitennavigation und Analysen | `/dashboard/todo` |
| 2048 | Spiel mit Tastatur- und Touch-Steuerung sowie gespeicherter Bestpunktzahl | `/dashboard/2048` |

Die persönliche Profilseite ist unter `/` erreichbar. Die Projektübersicht befindet sich unter `/dashboard`; die Aufgabenanalysen unter `/dashboard/todo/analytics`.
Profil, Berufserfahrung, Ausbildung und Fähigkeiten bilden gemeinsam den Online-Lebenslauf auf der Startseite. Das PDF kann dort direkt heruntergeladen werden.

## Technologien

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Zustand, React Router, Motion und Recharts
- **Backend:** Node.js, Express, MongoDB und Mongoose

## Voraussetzungen

- Node.js und npm
- Eine lokal erreichbare MongoDB oder eine MongoDB-Atlas-Datenbank

## Lokal starten

Frontend und API laufen in getrennten Terminals.

### 1. API einrichten und starten

```bash
cd server
npm ci
cp .env.example .env
```

Trage in `server/.env` deine MongoDB-Verbindungsadresse ein:

```env
MONGO=mongodb://127.0.0.1:27017/portfolio-full-stack
```

Starte anschließend den Server:

```bash
npm start
```

Die API läuft standardmäßig unter `http://localhost:8800/api`.

### 2. Frontend einrichten und starten

Öffne ein zweites Terminal:

```bash
cd frontend
npm ci
cp .env.example .env
npm run dev
```

Die lokale Vite-Adresse wird im Terminal angezeigt; standardmäßig ist es `http://localhost:5173`.

Die Frontend-API-Adresse wird über `VITE_API_URL` konfiguriert:

```env
VITE_API_URL=http://localhost:8800/api
```

## Weitere Frontend-Befehle

Im Verzeichnis `frontend`:

```bash
npm run build   # TypeScript-Prüfung und Produktionsbuild
npm run lint    # ESLint
npm run preview # Produktionsbuild lokal ansehen
```

## Konfiguration und Sicherheit

Die Dateien `.env` enthalten lokale oder geheime Konfiguration und gehören nicht ins Repository. Verwende dafür die bereitgestellten `.env.example`-Dateien als Vorlage. Für einen produktiven Betrieb müssen API- und Datenbankadressen sowie die Serverkonfiguration an die Hosting-Umgebung angepasst werden.
