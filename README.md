# Leonid Bondarchuk · Portfolio

### Ideen werden zu interaktiven Erlebnissen.

Ein persönliches Entwicklerportfolio mit drei eigenständigen Anwendungen: einem **maßgeschneiderten Kalender ohne fertige Kalenderbibliothek**, einem analytischen **To-do-Dashboard mit interaktiven Auswertungen** und einer modernen Interpretation von **2048**.

Jede Anwendung verbindet durchdachte Funktionalität mit einer klaren Benutzeroberfläche und einem konsistenten Design.

<p align="center">
  <strong>React · TypeScript · Express · MongoDB</strong><br />
  Light & Dark Mode · Responsive Design · Individuell entwickelte UI-Komponenten
</p>

---

## Entdecken

| Bereich | Das erwartet dich | Route |
| --- | --- | --- |
| **Portfolio** | Profil, Berufserfahrung, Ausbildung, Fähigkeiten und Kontakt | `/` |
| **Dashboard** | Zentraler Einstieg zu allen Anwendungen | `/dashboard` |
| **Events & Kalender** | Eigenständig entwickelter Kalender mit Tagesansicht, Terminverwaltung und übersichtlichem Zeitplan | `/dashboard/events` |
| **To-do** | Aufgabenverwaltung mit Suche, Filtern, Sortierung und Pagination | `/dashboard/todo` |
| **To-do Analytics** | Visuelle Auswertungen zu Aufgabenfortschritt, Status, Prioritäten und Kategorien | `/dashboard/todo/analytics` |
| **2048** | Interaktives Zahlenrätsel mit Tastatur- und Touch-Steuerung | `/dashboard/2048` |

## Mit Liebe zum Detail

- **Kalender nach Maß:** Eigenständige Kalenderimplementierung mit Terminverwaltung, Tagesübersicht und Zeitplan – ohne Integration einer fertigen Kalenderbibliothek.
- **Analysen, die Klarheit schaffen:** Kennzahlen und interaktive Diagramme machen Aufgabenfortschritt und Aufgabenverteilung anschaulich.
- **Zwei stimmige Farbwelten:** Light und Dark Mode mit abgestimmten Farben für Oberfläche, Diagramme und Aufgabenstatus.
- **Flüssige Bedienung:** Animationen, responsive Layouts, Suche, Filter und Touch-Steuerung sorgen für ein konsistentes Nutzungserlebnis auf verschiedenen Geräten.
- **Durchdachte UI-Zustände:** Ladeanzeigen, Skeletons und verständliche Rückmeldungen unterstützen eine klare Bedienung auch bei dynamischen Daten.

## Technologie

| Frontend | Backend und Daten | Qualität |
| --- | --- | --- |
| React, TypeScript, Vite | Node.js, Express 5 | Vitest |
| Tailwind CSS, React Router | MongoDB, Mongoose | Testing Library |
| Zustand, Motion, Recharts | REST API | ESLint |

## Lokal starten

Benötigt werden **Node.js**, **npm** und eine erreichbare MongoDB-Instanz oder MongoDB-Atlas-Datenbank. Frontend und Backend werden in separaten Terminals gestartet.

### Backend

```bash
cd server
npm ci
cp .env.example .env
```

Trage die MongoDB-Verbindung in `server/.env` ein:

```env
MONGO=mongodb://127.0.0.1:27017/portfolio-full-stack
```

Starte die API:

```bash
npm start
```

Die API ist unter `http://localhost:8800/api` erreichbar. Die verfügbaren Ressourcen sind `/api/todos` und `/api/events`.

### Frontend

Öffne ein zweites Terminal:

```bash
cd frontend
npm ci
cp .env.example .env
```

Setze in `frontend/.env` die API-Basis-URL:

```env
VITE_API_URL=http://localhost:8800/api
```

Starte den Entwicklungsserver:

```bash
npm run dev
```

Die lokale Adresse wird im Terminal angezeigt. Standardmäßig ist das Frontend unter `http://localhost:5173` erreichbar.

## Nützliche Befehle

Führe diese Befehle im Verzeichnis `frontend` aus:

| Befehl | Beschreibung |
| --- | --- |
| `npm run dev` | Startet den Entwicklungsserver |
| `npm run build` | Prüft TypeScript und erstellt den Produktionsbuild |
| `npm run preview` | Zeigt den Produktionsbuild lokal an |
| `npm run lint` | Führt ESLint aus |
| `npm test -- --run` | Führt die Tests einmalig aus |
| `npm run test` | Startet Vitest im Watch-Modus |

## Konfiguration

| Datei | Variable | Beschreibung |
| --- | --- | --- |
| `frontend/.env` | `VITE_API_URL` | Basis-URL der Backend-API |
| `server/.env` | `MONGO` | MongoDB-Verbindungsadresse |

Lokale `.env`-Dateien enthalten umgebungsspezifische Konfiguration und gehören nicht ins Repository. Die `.env.example`-Dateien dienen als Vorlage.