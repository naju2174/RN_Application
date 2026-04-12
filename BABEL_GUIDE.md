# Babel Configuration Guide for React Native (Expo)

## What is Babel?

Babel is a **JavaScript compiler/transpiler**. It converts modern JavaScript and JSX syntax into backward-compatible JavaScript that devices and browsers can execute.

### Before Babel (what you write):
```jsx
const App = () => (
  <View style={styles.container}>
    <Text>Hello World</Text>
  </View>
);
```

### After Babel (what the device runs):
```js
var App = function App() {
  return React.createElement(
    View,
    { style: styles.container },
    React.createElement(Text, null, "Hello World")
  );
};
```

---

## Why Do We Need Babel?

| Reason | Explanation |
|--------|-------------|
| **JSX Support** | Devices don't understand `<View>` or `<Text>` — Babel converts JSX into `React.createElement()` calls |
| **Modern JS Syntax** | Arrow functions, destructuring, spread operators, optional chaining (`?.`) — not all JS engines support these natively |
| **Platform Compatibility** | Android (Hermes engine) and iOS (JavaScriptCore) have different JS support levels — Babel normalizes this |
| **Expo-specific Transforms** | Expo adds its own plugins for features like environment variables, asset loading, and web support |

---

## Steps to Configure Babel in Expo

### Step 1: Install `babel-preset-expo`

```bash
npm install babel-preset-expo --save-dev
```

> Make sure the version matches your Expo SDK version:
> - Expo 54 → `babel-preset-expo@~54.0.10`
> - Expo 53 → `babel-preset-expo@~53.0.x`
>
> Check compatibility:
> ```bash
> npx expo install --check
> ```

### Step 2: Create `babel.config.js`

Create this file in your **project root** (same level as `package.json`):

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
```

#### What does each part do?

- `api.cache(true)` — Caches the config for better build performance
- `presets: ['babel-preset-expo']` — Loads Expo's bundle of Babel plugins that handle JSX, modern JS, and platform-specific transforms

### Step 3: Clear Cache and Restart

After creating or modifying `babel.config.js`, always restart Metro with cache cleared:

```bash
npx expo start --clear
```

---

## What `babel-preset-expo` Includes

`babel-preset-expo` is a single preset that bundles many plugins:

| Plugin | Purpose |
|--------|---------|
| `@babel/preset-env` | Transpiles modern JS (ES6+) to compatible JS |
| `@babel/preset-react` | Transforms JSX into `React.createElement()` calls |
| `@babel/preset-typescript` | Strips TypeScript types (if using TS) |
| `@babel/plugin-proposal-decorators` | Support for decorator syntax |
| `babel-plugin-react-compiler` | React Compiler optimizations |
| `babel-plugin-react-native-web` | Aliases `react-native` imports to `react-native-web` for web builds |
| Hermes-specific transforms | Optimizations for the Hermes JS engine on Android |

---

## Adding Custom Babel Plugins

You can extend the config with additional plugins:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin', // Example: for animations
      '@babel/plugin-proposal-decorators', // Example: for decorators
    ],
  };
};
```

> **Note:** `react-native-reanimated/plugin` must always be the **last** plugin in the array.

---

## Platform-Specific Configuration

### Android (Default)

- Uses **Hermes** JS engine (enabled by default in Expo 54+)
- `babel-preset-expo` automatically applies Hermes-specific optimizations
- No extra configuration needed

### iOS (Default)

- Also uses **Hermes** by default in Expo 54+
- Same Babel config as Android — no extra setup

### Web — Additional Setup Required

To run your React Native app in a **web browser**, you need additional packages:

#### Step 1: Install Web Dependencies

```bash
npx expo install react-dom react-native-web @expo/metro-runtime
```

| Package | Purpose |
|---------|---------|
| `react-dom` | React's DOM renderer — required for any React app running in a browser |
| `react-native-web` | Maps React Native components (`View`, `Text`, `ScrollView`) to HTML elements (`div`, `span`, `div`) |
| `@expo/metro-runtime` | Enables Metro bundler to serve web bundles with hot reloading |

#### Step 2: No Extra Babel Config Needed

`babel-preset-expo` already includes `babel-plugin-react-native-web`, which automatically aliases:
```
import { View } from 'react-native'
        ↓ (on web)
import { View } from 'react-native-web'
```

#### Step 3: Configure `app.json` for Web (Optional)

```json
{
  "expo": {
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    }
  }
}
```

#### Step 4: Run on Web

```bash
npx expo start --web
```

#### How Web Mapping Works

| React Native Component | Web HTML Element |
|------------------------|-----------------|
| `<View>` | `<div>` |
| `<Text>` | `<span>` / `<div>` |
| `<TextInput>` | `<input>` |
| `<ScrollView>` | `<div>` with overflow scroll |
| `<Image>` | `<img>` |
| `<TouchableOpacity>` | `<div>` with click handlers |
| `<FlatList>` | `<div>` with virtualized rendering |

---

## Troubleshooting

### Common Babel Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `Cannot find module 'babel-preset-expo'` | Preset not installed | `npm install babel-preset-expo --save-dev` |
| `Unexpected token '<'` | Babel not processing JSX | Ensure `babel.config.js` exists with the correct preset |
| Version mismatch warning | Preset version doesn't match Expo SDK | `npx expo install --fix` |
| Changes not reflecting | Stale Metro cache | `npx expo start --clear` |

### When to Clear Cache

Always clear the Metro bundler cache after:
- Creating or editing `babel.config.js`
- Installing new Babel plugins
- Upgrading Expo SDK version
- Switching between branches with different configs

```bash
npx expo start --clear
```

---

## File Structure Reference

```
my-app/
├── babel.config.js      ← Babel configuration (REQUIRED)
├── app.json             ← Expo app configuration
├── package.json         ← Dependencies
├── index.js             ← App entry point
├── App.js               ← Root component
└── assets/              ← Images, fonts, etc.
```

---

## Summary

| Platform | What You Need |
|----------|--------------|
| **All platforms** | `babel-preset-expo` + `babel.config.js` |
| **Android** | Nothing extra (Hermes is default) |
| **iOS** | Nothing extra (Hermes is default) |
| **Web** | `react-dom` + `react-native-web` + `@expo/metro-runtime` |
