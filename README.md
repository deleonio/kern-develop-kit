> [English version](./README.en.md)

# KERN UX-Standard Theme für KoliBri

Ein benutzerdefiniertes Theme für die barrierefreie Komponentenbibliothek [KoliBri](https://github.com/public-ui/kolibri), dass das KERN-UX Design System implementiert.

## Warum KoliBri für KERN verwenden?

**Barrierefreiheit ist wichtig.** Aber es ist schwer, alles richtig zu machen.

KoliBri macht es einfacher:

- **Bereits barrierefrei**: Alle Komponenten sind schon barrierefrei gebaut
- **Gut getestet**: Experten haben die Barrierefreiheit geprüft
- **Einfach zu nutzen**: Sie müssen nicht alles selbst programmieren
- **KERN Design**: Durch dieses Theme sehen die Komponenten aus wie KERN es vorgibt

**Das bedeutet für Sie:**

- Weniger Arbeit beim Programmieren
- Sicher sein, dass alles barrierefrei ist
- Mehr Zeit für wichtige Funktionen
- Automatisch das richtige KERN-Design

KERN nutzt KoliBri, weil die Komponenten "headless" sind. Das heißt: Die Barrierefreiheit funktioniert schon. Wir geben "nur" das KERN-Design dazu.

## Installation

```bash
npm install @kern-ux/theme-kolibri @public-ui/components
```

### Assets kopieren

Das Theme-Paket und die KoliBri-Komponenten enthalten wichtige Assets (Schriftarten und Icons), die in Ihr Projekt kopiert werden müssen. Für eine betriebssystemunabhängige Lösung empfehlen wir die Verwendung des `cpy-cli` Pakets:

```bash
npm install --save-dev cpy-cli
```

Erstellen Sie dann npm-Scripts in Ihrer `package.json`:

```json
{
	"scripts": {
		"postinstall": "npm run copy-assets",
		"copy-assets": "npm run copy-kern-assets && npm run copy-kolibri-assets",
		"copy-kern-assets": "cpy 'node_modules/@kern-ux/theme-kolibri/assets/**' 'public/assets/theme' --parents",
		"copy-kolibri-assets": "cpy 'node_modules/@public-ui/components/assets/**' 'public/assets/theme' --parents"
	}
}
```

**Wichtig:** Fügen Sie den Theme-Assets-Ordner zu Ihrer `.gitignore` hinzu, da diese Dateien bei jedem `npm install` automatisch kopiert werden:

```gitignore
# Theme Assets (werden automatisch kopiert)
public/assets/theme/
```

### Assets einbinden

Nach dem Kopieren der Assets müssen diese in Ihrer Anwendung eingebunden werden:

#### Option 1: Einbindung über HTML

```html
<!doctype html>
<html lang="de">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>KERN UX Theme Demo</title>

		<!-- KERN Theme Assets -->
		<link rel="stylesheet" href="/assets/theme/material-symbols-subset/style.css" />
		<link rel="stylesheet" href="/assets/theme/fira-sans-v17-latin/style.css" />

		<!-- KoliBri Assets (falls benötigt) -->
		<link rel="stylesheet" href="/assets/theme/codicon.css" />
	</head>
	<body>
		<!-- Ihre KoliBri-Komponenten -->
	</body>
</html>
```

#### Option 2: Einbindung über SCSS/CSS

```scss
// In Ihrer main.scss oder styles.scss
@import url('/assets/theme/material-symbols-subset/style.css');
@import url('/assets/theme/fira-sans-v17-latin/style.css');

// KoliBri Assets (falls benötigt)
@import url('/assets/theme/codicon.css');
```

## Verwendung

```typescript
import { register } from '@public-ui/components';
import { KERN_V2 } from '@kern-ux/theme-kolibri';
import { defineCustomElements } from '@public-ui/components/loader';

register(KERN_V2, defineCustomElements)
	.then(() => {
		// KERN-Theme "kern-v2" und
		// KoliBri-Komponenten sind geladen
	})
	.catch(console.warn);
```

## Features

- 🎨 **Kern Design System** - Offizielle Kern Styling-Richtlinien
- ♿ **Barrierefrei** - WCAG-konforme Styles mit korrekten Kontrastverhältnissen
- 📱 **Responsive** - Mobile-First-Ansatz
- 🔧 **CSS Layers** - Moderne Layer-Architektur für bessere Wartbarkeit

## Hinweise zum Theming

Beim Einsatz von Adaptive Styles können globale `CSS` Custom Properties mit denen der Anwendung kollidieren. Nutze für interne Berechnungen bevorzugt `SASS`-Variablen und gib nur klar geprefixte `CSS`-Properties nach außen.

## Entwicklung

### HTML-Verwendung

Nach der Installation können Sie die KoliBri-Komponenten mit dem KERN-Theme direkt in HTML verwenden:

```html
<!doctype html>
<html lang="de">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>KERN UX Theme Demo</title>
	</head>
	<body>
		<kol-button _label="KERN Button"></kol-button>
		<kol-input-text _label="Name" _placeholder="Ihr Name"></kol-input-text>
		<kol-card _headline="KERN Card"> Inhalt der Karte mit KERN Styling </kol-card>

		<script type="module">
			import { register } from '@public-ui/components';
			import { KERN_V2 } from '@kern-ux/theme-kolibri';
			import { defineCustomElements } from '@public-ui/components/loader';

			register(KERN_V2, defineCustomElements)
				.then(() => {
					console.log('KERN Theme "kern-v2" erfolgreich geladen');
				})
				.catch(console.warn);
		</script>
	</body>
</html>
```

## Unterstützung

Bei Problemen während der Entwicklung oder dem Build-Prozess schauen Sie bitte in die [CONTRIBUTING.md](./CONTRIBUTING.md) für detaillierte Lösungsansätze.

## Lizenz

Dieses Projekt steht unter der [European Union Public Licence (EUPL) v1.2](https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12). Die EUPL ist eine Open-Source-Lizenz, die von der Europäischen Kommission entwickelt wurde und mit anderen bekannten Open-Source-Lizenzen kompatibel ist.

## Verwandte Projekte

- [KERN UX-Standard](https://www.kern-ux.de)
- [KoliBri - Der barrierefreie HTML-Standard](https://public-ui.github.io/)
