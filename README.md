<div align="center">

<img src="logo.png" alt="Vireo Cleaner Logo" width="120" height="120">

# Vireo Cleaner

**Clean up your code by intelligently removing comments**

[![VS Code Version](https://img.shields.io/badge/VS%20Code-1.80.0+-blue.svg)](https://code.visualstudio.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Issues](https://img.shields.io/github/issues/umairrx/vireo-cleaner)](https://github.com/umairrx/vireo-cleaner/issues)
[![GitHub Stars](https://img.shields.io/github/stars/umairrx/vireo-cleaner)](https://github.com/umairrx/vireo-cleaner/stargazers)

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Configuration](#-configuration) • [Contributing](#-contributing)

</div>

---

## 🚀 Features

- **🎯 Smart Comment Removal**: Remove various comment types while preserving important directives
- **⚙️ Fully Customizable**: Add your own regex patterns to remove any text pattern
- **🛡️ Directive Preservation**: Automatically preserves ESLint, Biome, TypeScript, and other directives
- **📁 Bulk Processing**: Clean single files or entire projects at once
- **⌨️ Keyboard Shortcuts**: Quick access with customizable keyboard shortcuts
- **🎨 Multiple Languages**: Supports JS, TS, Vue, HTML, CSS, SCSS and more

## 📥 Installation

### From VS Code Marketplace (Coming Soon)

1. Open VS Code
2. Press `Ctrl+P` / `Cmd+P`
3. Type `ext install umairrx.vireo-cleaner`
4. Press Enter

### From VSIX File

1. Download the latest `.vsix` file from [Releases](https://github.com/umairrx/vireo-cleaner/releases)
2. Open VS Code
3. Press `Ctrl+Shift+P` / `Cmd+Shift+P`
4. Type "Install from VSIX"
5. Select the downloaded file

### Build from Source

```bash
git clone https://github.com/umairrx/vireo-cleaner.git
cd vireo-cleaner
pnpm install
pnpm run compile
```

## 🎯 Usage

### Quick Start

1. **Remove from Current File**

   - Press `Ctrl+Alt+R` (Windows/Linux) or `Cmd+Alt+R` (Mac)
   - Or right-click → "Vireo: Remove Comments from Current File"

2. **Remove from All Files**
   - Press `Ctrl+Alt+Shift+R` (Windows/Linux) or `Cmd+Alt+Shift+R` (Mac)
   - Or Command Palette → "Vireo: Remove Comments from All Project Files"

### What Gets Removed?

✅ Regular comments: `// comment`  
✅ Block comments: `/* comment */`  
✅ JSDoc comments: `/** comment */`  
✅ JSX comments: `{/* comment */}`  
✅ Inline comments: `code // comment`

### What Gets Preserved?

❌ `// eslint-disable-next-line`  
❌ `// @ts-ignore`  
❌ `// biome-ignore`  
❌ Any custom directive you configure

### Example

**Before:**

```javascript
// This is a comment
function hello() {
  // eslint-disable-next-line no-console
  console.log("Hello"); // inline comment
  /* Block comment */
  /**
   * JSDoc comment
   */
  return true;
}
```

**After:**

```javascript
function hello() {
  // eslint-disable-next-line no-console
  console.log("Hello");
  return true;
}
```

## ⚙️ Configuration

Vireo Cleaner is fully customizable through VS Code settings. Access settings via `File > Preferences > Settings` (or `Ctrl+,`), then search for "Vireo".

### Supported File Types

Customize which file extensions are processed when cleaning all files:

```json
{
  "vireo.supportedFileTypes": [
    "js",
    "jsx",
    "ts",
    "tsx",
    "vue",
    "html",
    "css",
    "scss",
    "php",
    "py"
  ]
}
```

### Preserved Directives

Configure which comment prefixes should be preserved:

```json
{
  "vireo.preserveDirectives": [
    "es",
    "biome",
    "@ts",
    "prettier",
    "webpack",
    "vite"
  ]
}
```

### Configuration Example

Complete configuration example with all options:

```json
{
  "vireo.supportedFileTypes": [
    "js",
    "jsx",
    "ts",
    "tsx",
    "vue",
    "svelte",
    "html",
    "css"
  ],
  "vireo.preserveDirectives": ["es", "biome", "@ts", "prettier"],
  "vireo.regexPatterns": [
    {
      "name": "Block Comments",
      "pattern": "\\/\\*[\\s\\S]*?\\*/",
      "description": "Remove /* */ block comments",
      "enabled": true
    }
  ]
}
```

## 🎨 Supported File Types

- JavaScript (`.js`, `.jsx`)
- TypeScript (`.ts`, `.tsx`)
- Vue (`.vue`)
- HTML (`.html`)
- CSS (`.css`)
- SCSS (`.scss`)

### Development Setup

```bash
# Clone the repository
git clone https://github.com/umairrx/vireo-cleaner.git
cd vireo-cleaner

# Install dependencies
pnpm install

# Compile TypeScript
pnpm run compile

# Watch mode for development
pnpm run watch

# Run tests
pnpm test
```

### Reporting Issues

Found a bug? Have a feature request? Please [open an issue](https://github.com/umairrx/vireo-cleaner/issues/new).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [VS Code Extension API](https://code.visualstudio.com/api)
- Inspired by the need for cleaner, more maintainable code

## 📞 Support

- 📧 Email: [Create an issue](https://github.com/umairrx/vireo-cleaner/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/umairrx/vireo-cleaner/discussions)
- 🐛 Bug Reports: [Issue Tracker](https://github.com/umairrx/vireo-cleaner/issues)

## ⭐ Show Your Support

If you find Vireo Cleaner helpful, please consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing code

---

<div align="center">

Made with ❤️ by [Umair](https://github.com/umairrx)

[Report Bug](https://github.com/umairrx/vireo-cleaner/issues) • [Request Feature](https://github.com/umairrx/vireo-cleaner/issues)

</div>
