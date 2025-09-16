# KERN UX-Standard Theme for KoliBri

A custom theme for the accessible component library [KoliBri](https://github.com/public-ui/kolibri) that implements the KERN UX design system.

## Why use KoliBri for KERN?

**Accessibility is important.** But it's hard to get everything right.

**KoliBri is pre-accessible.** By design, the fundamental accessibility aspects are already built into KoliBri.

**Standardization through the theme.** The theme ensures that all applications using it have a consistent appearance and behavior according to KERN UX standards.

> This theme is currently **under development** and follows the KERN UX 2.0 Design System. For the previous version (UX 1.5), see the [legacy branch](https://gitlab.opencode.de/kern-ux/kolibri-theme-kern/-/tree/legacy).

### Key features

- 📱 **Responsive Design** - Optimized for all screen sizes
- 🎨 **KERN Design System** - Full implementation of KERN UX 2.0 standards
- ♿ **Accessibility** - WCAG 2.1 AA compliant by default
- 🧩 **Component Library** - 50+ ready-to-use components
- 🎭 **Theming** - CSS custom properties for easy customization
- 📦 **Multiple Distribution Formats** - ESM, CommonJS, UMD, and CSS-only
- 🚀 **Production Ready** - Tested and used in government applications

## Quick Start

### Installation

```bash
npm install @kern-ux/theme-kolibri
```

### Usage

#### Option 1: Direct CSS Import

```css
@import '@kern-ux/theme-kolibri/dist/theme.css';
```

#### Option 2: JavaScript/TypeScript

```javascript
import '@kern-ux/theme-kolibri';
```

#### Option 3: HTML

```html
<link rel="stylesheet" href="path/to/@kern-ux/theme-kolibri/dist/theme.css" />
```

### Basic Example

```html
<!doctype html>
<html lang="de">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>KERN KoliBri Application</title>
		<link rel="stylesheet" href="@kern-ux/theme-kolibri/dist/theme.css" />
		<script type="module" src="@public-ui/components/dist/kolibri/kolibri.esm.js"></script>
	</head>
	<body>
		<kol-heading _level="1">Welcome to KERN UX</kol-heading>
		<kol-button _label="Primary Action" _variant="primary"></kol-button>
		<kol-input-text _label="Your Name" _placeholder="Enter your name"></kol-input-text>
	</body>
</html>
```

## Framework Integration

### Angular

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { KoliBriModule } from '@public-ui/angular';
import '@kern-ux/theme-kolibri';

@NgModule({
	imports: [KoliBriModule],
	// ...
})
export class AppModule {}
```

### React

```jsx
// App.tsx
import React from 'react';
import { KolButton, KolHeading } from '@public-ui/react';
import '@kern-ux/theme-kolibri';

export function App() {
	return (
		<div>
			<KolHeading _level={1}>My KERN Application</KolHeading>
			<KolButton _label="Click me" _variant="primary" />
		</div>
	);
}
```

### Vue

```vue
<!-- App.vue -->
<template>
	<div>
		<KolHeading :_level="1">My KERN Application</KolHeading>
		<KolButton _label="Click me" _variant="primary" />
	</div>
</template>

<script>
import '@kern-ux/theme-kolibri';
export default {
	name: 'App',
};
</script>
```

## Available Components

This theme supports all KoliBri components with KERN UX styling:

### Form Components

- `kol-input-text` - Text input fields
- `kol-input-email` - Email input with validation
- `kol-input-password` - Password input with visibility toggle
- `kol-input-number` - Number input with step controls
- `kol-select` - Dropdown selection
- `kol-textarea` - Multi-line text input
- `kol-checkbox` - Checkbox with custom styling
- `kol-radio` - Radio buttons
- `kol-input-file` - File upload component

### Navigation

- `kol-nav` - Main navigation component
- `kol-breadcrumb` - Breadcrumb navigation
- `kol-pagination` - Page navigation
- `kol-link` - Styled links
- `kol-skip-nav` - Skip navigation for accessibility

### Data Display

- `kol-table` - Data tables with sorting and filtering
- `kol-card` - Content cards
- `kol-accordion` - Collapsible content sections
- `kol-details` - Expandable details component
- `kol-tabs` - Tab navigation

### Feedback

- `kol-alert` - Alert messages
- `kol-toast` - Notification toasts
- `kol-progress` - Progress indicators
- `kol-spin` - Loading spinners

### Layout

- `kol-heading` - Semantic headings (h1-h6)
- `kol-button` - Buttons in various styles
- `kol-image` - Responsive images
- `kol-icon` - Icon component
- `kol-badge` - Status badges

For a complete list of components, see the [KoliBri Documentation](https://public-ui.github.io/).

## Customization

### CSS Custom Properties

The theme provides CSS custom properties for easy customization:

```css
:root {
	/* Brand colors */
	--kern-color-primary: #0073e6;
	--kern-color-secondary: #6c757d;
	--kern-color-success: #28a745;
	--kern-color-warning: #ffc107;
	--kern-color-danger: #dc3545;

	/* Typography */
	--kern-font-family: 'Fira Sans', Arial, sans-serif;
	--kern-font-size-base: 1rem;
	--kern-line-height-base: 1.5;

	/* Spacing */
	--kern-spacing-xs: 0.25rem;
	--kern-spacing-sm: 0.5rem;
	--kern-spacing-md: 1rem;
	--kern-spacing-lg: 1.5rem;
	--kern-spacing-xl: 3rem;

	/* Border radius */
	--kern-border-radius: 0.25rem;
	--kern-border-radius-lg: 0.5rem;
}
```

### Component-Specific Styling

```css
/* Customize button appearance */
kol-button {
	--button-border-radius: 0.5rem;
	--button-padding: 0.75rem 1.5rem;
}

/* Customize input fields */
kol-input-text {
	--input-border-color: #ced4da;
	--input-focus-border-color: var(--kern-color-primary);
}
```

## Development

### Prerequisites

- Node.js 22+
- pnpm package manager

### Setup

```bash
# Clone the repository
git clone https://gitlab.opencode.de/kern-ux/kolibri-theme-kern.git
cd kolibri-theme-kern

# Install dependencies
pnpm install

# Start development server
pnpm start
```

### Build

```bash
# Build for production
pnpm build

# Build in watch mode
pnpm dev
```

### Testing

```bash
# Run visual regression tests
pnpm test

# Update visual snapshots
pnpm test-update

# Lint code
pnpm lint

# Format code
pnpm format
```

## Browser Support

- Chrome 99+ (CSS Cascade Layers support)
- Firefox 97+
- Safari 15.4+
- Edge 99+

For older browsers, consider using the [CSS Cascade Layers polyfill](https://github.com/csstools/postcss-cascade-layers).

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.en.md) for details on:

- Setting up the development environment
- Understanding the CSS Layer architecture
- Following our coding standards
- Submitting pull requests
- Troubleshooting development issues

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Related Projects

- [KoliBri Component Library](https://github.com/public-ui/kolibri) - The base component library
- [KERN UX Guidelines](https://gitlab.opencode.de/kern-ux) - Design system documentation
- [KoliBri Documentation](https://public-ui.github.io/) - Component documentation and examples

## Support

- 📖 [Documentation](https://public-ui.github.io/)
- 🐛 [Issue Tracker](https://gitlab.opencode.de/kern-ux/kolibri-theme-kern/-/issues)
- 💬 [Discussions](https://gitlab.opencode.de/kern-ux/kolibri-theme-kern/-/discussions)
- 📧 [Email Support](mailto:kolibri@itzbund.de)

---

Built with ❤️ by the KERN UX Team

```

```
