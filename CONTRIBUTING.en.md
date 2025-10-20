# Contributing to `KoliBri` Theme `KERN UX-Standard`

## Important Git configuration for openCode.de

To avoid push problems with large repositories to openCode.de, please set the following local settings:

```bash
git config pack.packSizeLimit 5m
git config pack.window 0
git config pack.threads 1
```

These settings help prevent errors when pushing large commits.

Thank you for your interest in contributing to this project! This guide will help you get started.

## Setting up the development environment

### Prerequisites

- Node.js 22+ and pnpm
- Git

### Setup

```bash
# Clone repository
git clone https://gitlab.opencode.de/kern-ux/[TODO].git
cd [TODO]

# Install dependencies
pnpm install

# Install Playwright browsers
pnpm exec playwright install

# Start development (Watch & Stories in browser)
pnpm start
```

The start command builds the theme continuously in watch mode and displays the component stories live in the browser. This allows you to work directly on CSS styling and track progress.

When you're done, check the result with snapshot tests and check in updated reference snapshots if needed:

```bash
pnpm test        # Check snapshots
pnpm test-update # Update reference snapshots
```

## Understanding the architecture

### CSS Layer structure

This theme uses CSS Cascade Layers for predictable styling:

```scss
// Layer order (lowest to highest specificity)
@layer kol-theme-global; // Global theme styles
@layer kol-theme-component; // Component-specific styles
```

### File organization

```text
src/
├── global.scss              # Global theme styles (@layer kol-theme-global)
├── components/              # Component styles (@layer kol-theme-component)
│   ├── button.scss
│   ├── input.scss
│   └── ...
├── mixins/                  # Sass Mixins and Utilities (no layers)
└── @shared/                 # Shared utilities and helpers (no layers)
```

**IMPORTANT**: The project now uses the `@kern-ux/native` package for all KERN UX standards. No more local KERN files - everything is imported directly from the official package.

## Styling rules

### Layer enforcement

Custom Stylelint rules ensure proper layer usage:

1. **Component files** (`src/components/*.scss`) **MUST** use `@layer kol-theme-component`
2. **Global file** (`src/global.scss`) **MUST** use `@layer kol-theme-global`
3. **Utility files** (mixins, helpers) **MUST NOT** use layers
4. Only allowed layer names are permitted: `kol-theme-global`, `kol-theme-component`

### Example usage

```scss
// ✅ Correct: Component file with layer
// src/components/button.scss
@layer kol-theme-component {
	.button {
		background: var(--kern-color-primary);
		border-radius: var(--kern-border-radius);
	}
}

// ✅ Correct: Global file with layer
// src/global.scss
@layer kol-theme-global {
	:host {
		--font-family: var(--kern-font-family);
	}
}

// ✅ Correct: Utility file without layer
// src/mixins/typography.scss
@mixin kern-heading-style {
	font-family: var(--kern-font-family);
	font-weight: bold;
}

// ❌ Wrong: Component file without layer
// src/components/button.scss
.button {
	background: red; // Triggers lint error
}
```

## Custom Stylelint rules

### Rule overview

| Rule                                      | Purpose                                     | Applies to              |
| ----------------------------------------- | ------------------------------------------- | ----------------------- |
| `kolibri/require-component-layer`         | Enforces `@layer kol-theme-component` usage | `src/components/*.scss` |
| `kolibri/require-global-layer`            | Enforces `@layer kol-theme-global` usage    | `src/global.scss`       |
| `kolibri/no-layer-in-non-component-files` | Prevents layer usage in utility files       | All other SCSS files    |
| `kolibri/layer-name-convention`           | Warns about non-standard layer names        | All files               |

### Rule details

These rules ensure:

- **100% CSS coverage** - ALL CSS must be in appropriate layers
- **No exceptions** - Variables, selectors, declarations, at-rules are all checked
- **Clear separation** - Components vs. Global vs. Utility styling
- **Maintainability** - Predictable cascade behavior

## Development workflow

### Adding new component styles

1. Create component file in `src/components/`:

```scss
// src/components/new-component.scss
@layer kol-theme-component {
	.new-component {
		// Your styles here
	}
}
```

2. Build and test:

```bash
pnpm build
pnpm lint
pnpm test
```

### Changing global styles

Edit `src/global.scss` within the global layer:

```scss
@layer kol-theme-global {
	:host {
		// Global theme variables and styles
	}
}
```

### Creating utilities

Add utilities in `src/mixins/` or `src/@shared/` **without** layers:

```scss
// src/mixins/my-utility.scss
@mixin my-utility {
	// Utility styles (no @layer needed)
}
```

## Build process

### Development build

```bash
pnpm dev    # Watch mode with hot reload
pnpm start  # Development server
```

### Production build

```bash
pnpm build  # Optimized production build
```

### Build output

- `assets/` - Static assets and fonts
- `dist/` - Compiled CSS files

## Testing

### Visual regression tests

```bash
pnpm test        # Run visual tests
pnpm test-update # Update visual snapshots
```

#### Assets and visual tests

Visual tests require correctly loaded assets (fonts and icons) to create meaningful screenshots:

- **inject-assets.css** - Central asset injection file with @import statements for:
  - `assets/material-symbols-subset/style.css` - Reduced Material Icons set
  - `assets/fira-sans-v17-latin/style.css` - Fira Sans font family (400-700)
- **inject-a.css** - Generated by build process and used in visual tests via `THEME_CSS` environment variable

**Important**: Without correctly loaded assets, visual tests would be falsely detected as "changed" since fallback fonts or missing icons would be used.

### Code quality

```bash
pnpm lint        # Stylelint + ESLint
pnpm format      # Prettier formatting
```

## Before committing

Always run the complete validation workflow:

```bash
pnpm build   # Ensure clean build
pnpm format  # Fix formatting
pnpm lint    # Check code quality
pnpm test    # Validate visual tests
```

## Code style

- Use **tabs** for indentation (except Markdown files use spaces)
- Line length: **160 characters**
- Single quotes in SCSS/CSS
- Follow BEM naming convention for CSS classes
- Use semantic variable names

## Layer guidelines

1. **Never bypass layer rules** - All CSS must be in appropriate layers
2. **Component isolation** - Component styles only affect their component
3. **Global restraint** - Global layer only for theme-wide variables and host styles
4. **No layer mixing** - Don't mix layered and non-layered CSS in the same file
5. **Respect KERN UX standards** - Never modify files in `src/kern/`, only use their variables

## KERN UX integration rules

- **`@kern-ux/native` package**: Official KERN UX standards as external dependency
- **CSS import**: Use `@import '@kern-ux/native/dist/kern.css'` for KERN base
- **KERN variables**: Use `var(--kern-*)` CSS custom properties in theme styles
- **Package updates**: KERN UX standards are updated via `pnpm update @kern-ux/native`
- **No local KERN files**: All KERN UX standards come from the package
- **CSS-based**: Package is optimized for CSS distribution, not granular Sass imports

## Configuration files

| File                 | Purpose                                        |
| -------------------- | ---------------------------------------------- |
| `.stylelintrc.json`  | Stylelint configuration with custom rules      |
| `eslint.config.js`   | ESLint configuration for JavaScript/TypeScript |
| `rollup.config.js`   | Build configuration                            |
| `prettier.config.js` | Code formatting rules                          |
| `stylelint-rules/`   | Custom Stylelint rule implementations          |

## Kern Design System integration

### Design tokens

**KERN design standards are provided via the `@kern-ux/native` package:**

```scss
// Import KERN CSS base
@import '@kern-ux/native/dist/kern.css';
```

**Important architectural decision**: The `@kern-ux/native` package is primarily designed for CSS distribution, not granular Sass imports. Therefore, the complete KERN CSS base is included as a CSS import.

### Using KERN UX standards

```scss
// ✅ Correct: Use KERN CSS variables in theme components
@layer kol-theme-component {
	.button {
		background: var(--kern-color-primary); // Use KERN variable
		border-radius: var(--kern-border-radius); // Use KERN variable
		font-family: var(--kern-font-family); // Use KERN variable
	}
}

// ✅ Correct: KERN CSS is imported as base
@import '@kern-ux/native/dist/kern.css';

// ❌ Not available: Granular Sass imports (package limitation)
// @use '@kern-ux/native/src/scss/core/tokens' as kern-tokens; // Not supported
```

**Migration from local `kern/` to `@kern-ux/native`:**

- Local `src/kern/` directory was removed
- Replaced with `@kern-ux/native` package dependency
- KERN UX standards are included via CSS import
- CSS custom properties (`--kern-*`) remain usable unchanged

### Typography

KERN typography system is provided via the CSS base from `@kern-ux/native`:

- Font families and weights
- Heading styles and hierarchy
- Text sizes and spacing

### Color system

```scss
// Kern color tokens (use only, don't modify!)
--kern-color-primary: #0073e6;
--kern-color-secondary: #6c757d;
--kern-color-success: #28a745;
--kern-color-warning: #ffc107;
--kern-color-danger: #dc3545;
```

## Bug fixes

### Common issues

**Stylelint layer errors:**

```text
CSS rule "selector" must be inside @layer kol-theme-component
```

→ Wrap all CSS in the appropriate layer for the file location

**Build errors:**

```bash
pnpm clean  # Clear dist and cache
pnpm install    # Reinstall dependencies
pnpm build  # Rebuild
```

**Visual test errors:**

```bash
pnpm test-update  # Update snapshots when changes are intended
```

### Getting help

1. Check the [KERN UX-Standard](https://gitlab.opencode.de/kern-ux)
2. Review existing component implementations in `src/components/`
3. Examine the custom Stylelint rules in `stylelint-rules/`
4. Run `pnpm lint` for specific error messages

### Service Worker Cache Issues in Chrome

**Problem:** Assets are not updated despite "Disable cache" being enabled. Chrome continues to load old versions, even after hard reload.

**Cause:** A **Service Worker** is likely interfering in Chrome. The DevTools "Disable cache" checkbox only affects the **HTTP Cache**, not the **Cache Storage** of a Service Worker. The SW continues to serve old assets.

#### Immediate Solution

1. **DevTools → Application → Service Workers**
   - Click "**Unregister**"
   - Optional: Enable "**Update on reload**"

2. **Application → Clear storage**
   - Check all boxes ("Unregister service workers", "Cache storage", "IndexedDB", …)
   - Click **Clear site data**

3. **Reload** (preferably right-click on the reload button → **Empty cache and hard reload**)

#### Prevent Permanently

- **Disable Service Worker:** In `main.tsx`/`index.tsx` ensure the SW is **not registered**:

  ```javascript
  // Use serviceWorker.unregister()
  // or remove registerServiceWorker
  ```

- **Production only:** Register SW only in production builds:

  ```javascript
  if (process.env.NODE_ENV === 'production') {
  	// Register Service Worker only in production
  }
  ```

- **Set cache headers correctly:**
  - **`index.html`** gets `Cache-Control: no-store`
  - Hashed files (`*.js`, `*.css`) may be cached

- **DevTools settings:** In Chrome DevTools (Application → Service Workers) enable **"Bypass for network"** or **"Update on reload"** during development

- **No false proxy headers:** With Vite/Webpack avoid reverse proxy headers or CDN layers that set `max-age` on HTML

#### Alternative Causes

If it's **not** a Service Worker:

- **Check DevServer headers:** HTML should have `no-store`, assets with hash + long caching
- **Back/Forward Cache:** Chrome's bfcache can be confusing - test with `location.reload(true)` or `window.onpageshow` handler (`event.persisted`)

**In 90% of cases it's the Service Worker.** Unregister + Clear Storage fixes it immediately.

## Pull request process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a pull request

### Pull request guidelines

- Describe your changes in detail
- Add screenshots for UI changes
- Ensure all tests pass
- Follow the code style guidelines
- Update documentation if necessary

## Browser support

- Modern browsers with CSS Cascade Layers support
- Chrome 99+, Firefox 97+, Safari 15.4+
- For older browsers, a CSS Layers polyfill should be used

---

Thank you for your contribution! 🎉
