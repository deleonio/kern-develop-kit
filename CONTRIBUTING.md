> [English version](./CONTRIBUTING.en.md)

# Contributing zum `KoliBri` Theme `KERN UX-Standard`

## Wichtige Git-Konfiguration für openCode.de

Um Push-Probleme mit großen Repositories nach openCode.de zu vermeiden, stellen Sie bitte lokal folgende Einstellungen ein:

```bash
git config pack.packSizeLimit 5m
git config pack.window 0
git config pack.threads 1
```

Diese Einstellungen helfen, Fehler beim Pushen großer Commits zu vermeiden.

Vielen Dank für Ihr Interesse am Beitrag zu diesem Projekt! Diese Anleitung hilft Ihnen beim Einstieg.

## Entwicklungsumgebung einrichten

### Voraussetzungen

- Node.js 22+ und pnpm
- Git

### Setup

```bash
# Repository klonen
git clone https://gitlab.opencode.de/kern-ux/[TODO].git
cd [TODO]

# Abhängigkeiten installieren
pnpm install

# Playwright-Browser installieren
pnpm exec playwright install

# Entwicklung starten (Watch & Stories im Browser)
pnpm start
```

Der Start-Befehl baut das Theme permanent im Watch-Modus und stellt die Component-Stories live im Browser dar. So können Sie direkt am CSS-Styling arbeiten und den Fortschritt verfolgen.

Sind Sie fertig, überprüfen Sie das Ergebnis mit den Snapshot-Tests und checken Sie bei Bedarf aktualisierte Referenz-Snapshots ein:

```bash
pnpm test        # Snapshots prüfen
pnpm test-update # Referenz-Snapshots aktualisieren
```

## Architektur verstehen

### CSS Layer Struktur

Dieses Theme verwendet CSS Cascade Layers für vorhersagbares Styling:

```scss
// Layer-Reihenfolge (niedrigste bis höchste Spezifität)
@layer kol-theme-global; // Globale Theme-Styles
@layer kol-theme-component; // Component-spezifische Styles
```

### Dateiorganisation

```text
src/
├── global.scss              # Globale Theme-Styles (@layer kol-theme-global)
├── components/              # Component-Styles (@layer kol-theme-component)
│   ├── button.scss
│   ├── input.scss
│   └── ...
├── mixins/                  # Sass Mixins und Utilities (keine Layer)
└── @shared/                 # Geteilte Utilities und Helfer (keine Layer)
```

**WICHTIG**: Das Projekt verwendet jetzt das `@kern-ux/native` Package für alle KERN UX-Standards. Keine lokalen KERN-Dateien mehr - alles wird direkt aus dem offiziellen Package importiert.

## Styling-Regeln

### Layer-Durchsetzung

Custom Stylelint-Regeln stellen ordnungsgemäße Layer-Nutzung sicher:

1. **Component-Dateien** (`src/components/*.scss`) **MÜSSEN** `@layer kol-theme-component` verwenden
2. **Global-Datei** (`src/global.scss`) **MUSS** `@layer kol-theme-global` verwenden
3. **Utility-Dateien** (Mixins, Helfer) **DÜRFEN KEINE** Layer verwenden
4. Nur zugelassene Layer-Namen sind erlaubt: `kol-theme-global`, `kol-theme-component`

### Web Component Encapsulation

**WICHTIG**: Theme-Dateien **MÜSSEN** `:host` statt `:root` verwenden für Web Component Kapselung:

```scss
// ✅ Korrekt: :host für Web Component Styling
@layer kol-theme-global {
	:host {
		--font-family: var(--kern-font-family);
		background-color: white;
		color: black;
	}
}

// ❌ Falsch: :root umgeht Web Component Encapsulation
@layer kol-theme-global {
	:root {
		--font-family: var(--kern-font-family); // Löst Lint-Fehler aus
	}
}
```

**Grund**: `:root` Selektoren umgehen die Web Component Shadow DOM Kapselung und können mit Host-Seiten-Styles kollidieren. `:host` sorgt für ordnungsgemäße Isolation innerhalb des Web Component.

### Beispiel-Verwendung

```scss
// ✅ Korrekt: Component-Datei mit Layer
// src/components/button.scss
@layer kol-theme-component {
	.button {
		background: var(--kern-color-primary);
		border-radius: var(--kern-border-radius);
	}
}

// ✅ Korrekt: Global-Datei mit Layer und :host
// src/global.scss
@layer kol-theme-global {
	:host {
		--font-family: var(--kern-font-family);
	}
}

// ✅ Korrekt: Utility-Datei ohne Layer
// src/mixins/typography.scss
@mixin kern-heading-style {
	font-family: var(--kern-font-family);
	font-weight: bold;
}

// ❌ Falsch: Component-Datei ohne Layer
// src/components/button.scss
.button {
	background: red; // Löst Lint-Fehler aus
}
```

## Custom Stylelint Regeln

### Regel-Übersicht

| Regel                                     | Zweck                                         | Gilt für                  |
| ----------------------------------------- | --------------------------------------------- | ------------------------- |
| `kolibri/require-component-layer`         | Erzwingt `@layer kol-theme-component` Nutzung | `src/components/*.scss`   |
| `kolibri/require-global-layer`            | Erzwingt `@layer kol-theme-global` Nutzung    | `src/global.scss`         |
| `kolibri/no-layer-in-non-component-files` | Verhindert Layer-Nutzung in Utility-Dateien   | Alle anderen SCSS-Dateien |
| `kolibri/layer-name-convention`           | Warnt vor nicht-standardmäßigen Layer-Namen   | Alle Dateien              |
| `kolibri/no-root-selector`                | Verhindert `:root` zugunsten von `:host`      | `src/**/*.scss`           |

### Regel-Details

Diese Regeln stellen sicher:

- **100% CSS-Abdeckung** - ALLES CSS muss in entsprechenden Layern sein
- **Keine Ausnahmen** - Variablen, Selektoren, Deklarationen, At-Rules werden alle geprüft
- **Klare Trennung** - Components vs. Global vs. Utility Styling
- **Wartbarkeit** - Vorhersagbares Cascade-Verhalten

## Entwicklungsworkflow

### Neue Component-Styles hinzufügen

1. Component-Datei in `src/components/` erstellen:

```scss
// src/components/new-component.scss
@layer kol-theme-component {
	.new-component {
		// Ihre Styles hier
	}
}
```

2. Erstellen und testen:

```bash
pnpm build
pnpm lint
pnpm test
```

### Globale Styles ändern

`src/global.scss` innerhalb des globalen Layers bearbeiten:

```scss
@layer kol-theme-global {
	:host {
		// Globale Theme-Variablen und Styles
	}
}
```

### Utilities erstellen

Utilities in `src/mixins/` oder `src/@shared/` **ohne** Layer hinzufügen:

```scss
// src/mixins/my-utility.scss
@mixin my-utility {
	// Utility-Styles (kein @layer nötig)
}
```

## Build-Prozess

### Entwicklungs-Build

```bash
pnpm dev    # Watch-Modus mit Hot Reload
pnpm start  # Entwicklungsserver
```

### Produktions-Build

```bash
pnpm build  # Optimierter Produktions-Build
```

### Build-Output

- `assets/` - Statische Assets und Schriftarten
- `dist/` - Kompilierte CSS-Dateien

## Testing

### Visual Regression Tests

```bash
pnpm test        # Visual Tests ausführen
pnpm test-update # Visual Snapshots aktualisieren
```

#### Assets und Visual Tests

Die Visual Tests benötigen korrekt geladene Assets (Schriftarten und Icons), um aussagekräftige Screenshots zu erstellen:

- **inject-assets.css** - Zentrale Asset-Injektionsdatei mit @import-Anweisungen für:
  - `assets/material-symbols-subset/style.css` - Reduziertes Material Icons Set
  - `assets/fira-sans-v17-latin/style.css` - Fira Sans Schriftfamilie (400-700)
- **inject-a.css** - Wird vom Build-Prozess generiert und bei Visual Tests via `THEME_CSS` Umgebungsvariable verwendet

**Wichtig**: Ohne korrekt geladene Assets würden Visual Tests fälschlicherweise als "geändert" erkannt, da Fallback-Schriftarten oder fehlende Icons verwendet würden.

### Code-Qualität

```bash
pnpm lint        # Stylelint + ESLint
pnpm format      # Prettier-Formatierung
```

## Vor dem Committen

Führen Sie immer den vollständigen Validierungs-Workflow aus:

```bash
pnpm build   # Sauberen Build sicherstellen
pnpm format  # Formatierung korrigieren
pnpm lint    # Code-Qualität prüfen
pnpm test    # Visual Tests validieren
```

## Code-Style

- Verwenden Sie **Tabs** für Einrückung (außer Markdown-Dateien verwenden Leerzeichen)
- Zeilenlänge: **160 Zeichen**
- Einfache Anführungszeichen in SCSS/CSS
- BEM-Namenskonvention für CSS-Klassen befolgen
- Semantische Variablennamen verwenden

## Layer-Richtlinien

1. **Niemals Layer-Regeln umgehen** - Alles CSS muss in entsprechenden Layern sein
2. **Component-Isolation** - Component-Styles betreffen nur ihre Component
3. **Globale Zurückhaltung** - Globaler Layer nur für theme-weite Variablen und Host-Styles
4. **Kein Layer-Mixing** - Layered und nicht-layered CSS nicht in derselben Datei mischen
5. **KERN UX-Standards respektieren** - Dateien in `src/kern/` niemals modifizieren, nur deren Variablen verwenden

## KERN UX Integration Regeln

- **`@kern-ux/native` Package**: Offizielle KERN UX-Standards als externe Abhängigkeit
- **CSS-Import**: Nutzen Sie `@import '@kern-ux/native/dist/kern.css'` für KERN-Basis
- **KERN Variablen**: Verwenden Sie `var(--kern-*)` CSS Custom Properties in Theme-Styles
- **Package Updates**: KERN UX-Standards werden über `pnpm update @kern-ux/native` aktualisiert
- **Keine lokalen KERN Dateien**: Alle KERN UX-Standards kommen aus dem Package
- **CSS-basiert**: Package ist für CSS-Distribution optimiert, nicht für granulare Sass-Imports

## Konfigurationsdateien

| Datei                | Zweck                                          |
| -------------------- | ---------------------------------------------- |
| `.stylelintrc.json`  | Stylelint-Konfiguration mit Custom-Regeln      |
| `eslint.config.js`   | ESLint-Konfiguration für JavaScript/TypeScript |
| `rollup.config.js`   | Build-Konfiguration                            |
| `prettier.config.js` | Code-Formatierungsregeln                       |
| `stylelint-rules/`   | Custom Stylelint-Regel-Implementierungen       |

## Kern Design System Integration

### Design Tokens

**KERN Design Standards werden über das `@kern-ux/native` Package bereitgestellt:**

```scss
// Import der KERN CSS-Basis
@import '@kern-ux/native/dist/kern.css';
```

**Wichtige Architektur-Entscheidung**: Das `@kern-ux/native` Package ist primär für CSS-Distribution konzipiert, nicht für granulare Sass-Imports. Daher wird die komplette KERN CSS-Basis als CSS-Import eingebunden.

### Verwendung der KERN UX-Standards

```scss
// ✅ Korrekt: KERN CSS-Variablen in Theme-Komponenten verwenden
@layer kol-theme-component {
	.button {
		background: var(--kern-color-primary); // KERN Variable verwenden
		border-radius: var(--kern-border-radius); // KERN Variable verwenden
		font-family: var(--kern-font-family); // KERN Variable verwenden
	}
}

// ✅ Korrekt: KERN CSS wird als Basis importiert
@import '@kern-ux/native/dist/kern.css';

// ❌ Nicht verfügbar: Granulare Sass-Imports (Package-Limitation)
// @use '@kern-ux/native/src/scss/core/tokens' as kern-tokens; // Nicht unterstützt
```

**Migration von lokalem `kern/` zu `@kern-ux/native`:**

- Lokales `src/kern/` Verzeichnis wurde entfernt
- Ersetzt durch `@kern-ux/native` Package-Dependency
- KERN UX-Standards werden über CSS-Import eingebunden
- CSS Custom Properties (`--kern-*`) bleiben unverändert nutzbar

### Typografie

KERN Typografie-System wird über die CSS-Basis von `@kern-ux/native` bereitgestellt:

- Schriftfamilien und -gewichte
- Überschrift-Styles und Hierarchie
- Text-Größen und Abstände

### Farbsystem

```scss
// Kern Farb-Tokens (nur verwenden, nicht ändern!)
--kern-color-primary: #0073e6;
--kern-color-secondary: #6c757d;
--kern-color-success: #28a745;
--kern-color-warning: #ffc107;
--kern-color-danger: #dc3545;
```

## Fehlerbehebung

### Häufige Probleme

**Stylelint Layer-Fehler:**

```
CSS rule "selector" must be inside @layer kol-theme-component
```

→ Wrappen Sie alles CSS in den entsprechenden Layer für den Dateistandort

**Build-Fehler:**

```bash
pnpm clean  # Dist und Cache löschen
pnpm install    # Abhängigkeiten neu installieren
pnpm build  # Neu erstellen
```

**Visual Test-Fehler:**

```bash
pnpm test-update  # Snapshots aktualisieren wenn Änderungen beabsichtigt sind
```

### Hilfe bekommen

1. Prüfen Sie die [KERN UX-Standard](https://gitlab.opencode.de/kern-ux)
2. Überprüfen Sie bestehende Component-Implementierungen in `src/components/`
3. Untersuchen Sie die Custom Stylelint-Regeln in `stylelint-rules/`
4. Führen Sie `pnpm lint` für spezifische Fehlermeldungen aus

## Troubleshooting

### Service Worker Cache-Probleme in Chrome

**Problem:** Assets werden trotz "Disable cache" nicht aktualisiert. Chrome lädt weiterhin alte Versionen, auch nach hartem Reload.

**Ursache:** In Chrome hängt sehr wahrscheinlich ein **Service Worker** dazwischen. Das DevTools-Häkchen „Disable cache" betrifft nur den **HTTP-Cache**, nicht den **Cache Storage** eines Service Workers. Der SW serviert dann weiterhin alte Assets.

#### Sofortige Lösung

1. **DevTools → Application → Service Workers**
   - „**Unregister**" klicken
   - Optional: „**Update on reload**" aktivieren

2. **Application → Clear storage**
   - Alle Häkchen an („Unregister service workers", „Cache storage", „IndexedDB", …)
   - **Clear site data** klicken

3. **Neu laden** (am besten mit Rechtsklick auf den Reload-Button → **Empty cache and hard reload**)

#### Dauerhaft vermeiden

- **Service Worker deaktivieren:** In `main.tsx`/`index.tsx` sicherstellen, dass der SW **nicht registriert** wird:

  ```javascript
  // serviceWorker.unregister() verwenden
  // oder registerServiceWorker entfernen
  ```

- **Nur in Produktion:** SW nur in Prod-Builds registrieren:

  ```javascript
  if (process.env.NODE_ENV === 'production') {
  	// Service Worker nur in Production registrieren
  }
  ```

- **Cache-Headers korrekt setzen:**
  - **`index.html`** bekommt `Cache-Control: no-store`
  - Hash-Dateien (`*.js`, `*.css`) dürfen gecacht werden

- **DevTools Einstellungen:** In Chrome DevTools (Application → Service Workers) **„Bypass for network"** oder **„Update on reload"** aktivieren während der Entwicklung

- **Keine falschen Proxy-Headers:** Bei Vite/Webpack keine Reverse-Proxy-Header oder CDN-Layer verwenden, die `max-age` auf HTML setzen

#### Alternative Ursachen

Falls es **kein** Service Worker ist:

- **DevServer-Headers prüfen:** HTML sollte `no-store` haben, Assets mit Hash + langes Caching
- **Back/Forward Cache:** Chrome's bfcache kann verwirren - teste mit `location.reload(true)` oder `window.onpageshow`-Handler (`event.persisted`)

**In 90% der Fälle ist es der Service Worker.** Unregister + Clear Storage behebt das sofort.

## Pull Request Prozess

1. Forken Sie das Repository
2. Erstellen Sie einen Feature-Branch (`git checkout -b feature/amazing-feature`)
3. Committen Sie Ihre Änderungen (`git commit -m 'Add amazing feature'`)
4. Pushen Sie zum Branch (`git push origin feature/amazing-feature`)
5. Öffnen Sie einen Pull Request

### Pull Request Richtlinien

- Beschreiben Sie Ihre Änderungen ausführlich
- Fügen Sie Screenshots bei UI-Änderungen hinzu
- Stellen Sie sicher, dass alle Tests bestehen
- Folgen Sie den Code-Style-Richtlinien
- Aktualisieren Sie die Dokumentation falls nötig

## Browser-Unterstützung

- Moderne Browser mit CSS Cascade Layers Unterstützung
- Chrome 99+, Firefox 97+, Safari 15.4+
- Für ältere Browser sollte ein CSS Layers Polyfill verwendet werden

---

Vielen Dank für Ihren Beitrag! 🎉
