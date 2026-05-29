# @vervstack/chures

React components and hooks for **Telegram OAuth login** and **toast notifications**.

- `TelegramAuth` / `useTelegramLogin` — wire up Telegram Login with a single component or a custom render prop
- `TelegramSignInButton` — standalone Telegram-branded button
- `Toaster` / `useToaster` — animated toast notifications with auto-dismiss

CSS is injected automatically — no stylesheet import needed.

## Install

```bash
npm install @vervstack/chures
# peer deps
npm install framer-motion zustand
```

## Telegram Auth

### Drop-in button

```tsx
import { TelegramAuth } from "@vervstack/chures";

<TelegramAuth
  botId="YOUR_BOT_ID"
  onSuccess={(data) => console.log(data.id_token)}
/>
```

### Custom UI (render prop)

```tsx
import { TelegramAuth } from "@vervstack/chures";

<TelegramAuth botId="YOUR_BOT_ID" onSuccess={handleAuth}>
  {({ login, isReady }) => (
    <button onClick={login} disabled={!isReady}>
      Sign in with Telegram
    </button>
  )}
</TelegramAuth>
```

### Hook only

```tsx
import { useTelegramLogin } from "@vervstack/chures";

const { login, isReady } = useTelegramLogin({
  botId: "YOUR_BOT_ID",
  onSuccess: (data) => console.log(data.id_token),
});
```

### `TelegramAuth` props

| Prop | Type | Default | Description |
|---|---|---|---|
| `botId` | `string` | — | Your Telegram bot ID |
| `onSuccess` | `(data: TelegramAuthData) => void` | — | Called with auth data on success |
| `lang` | `"en" \| "ru"` | `"en"` | Button label language |
| `title` | `string` | — | Custom button label |
| `redirectUri` | `string` | `window.location.origin` | OAuth redirect URI |
| `requestAccess` | `string` | `"write"` | Telegram access scope |
| `children` | `(props) => ReactNode` | — | Render prop for custom UI |
| `className` | `string` | — | Extra class on the button |

### `TelegramSignInButton` props

| Prop | Type | Default | Description |
|---|---|---|---|
| `onClick` | `() => void` | — | Click handler |
| `disabled` | `boolean` | — | Disables the button |
| `lang` | `"en" \| "ru"` | `"en"` | Label language |
| `title` / `label` | `string` | — | Override button text |
| `fullSize` | `boolean` | — | Stretch to full width |
| `className` | `string` | — | Extra CSS class |

## Toasts

Mount `<Toaster />` once at the root of your app, then call `useToaster` anywhere.

```tsx
import { Toaster, useToaster } from "@vervstack/chures";

// in your root layout
<Toaster />

// anywhere in your app
const { bake } = useToaster();

bake({ title: "Saved", description: "Your changes were saved.", level: "Info" });
bake({ title: "Error", description: "Something went wrong.", level: "Error", isDismissable: true });
```

Toasts auto-dismiss after 5 seconds. Set `isDismissable: true` to show a close button.

### `Toast` fields

| Field | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Toast heading (also used as unique key) |
| `description` | `string` | — | Body text |
| `level` | `"Info" \| "Warn" \| "Error"` | `"Info"` | Visual severity |
| `isDismissable` | `boolean` | `false` | Show manual dismiss button |

### CSS theming

Override these CSS custom properties to match your design:

| Variable | Default | Meaning |
|---|---|---|
| `--ta-accent` | `#229ED9` | Info border color |
| `--ta-error` | `#ef4444` | Error border + title color |
| `--ta-warn` | `#f59e0b` | Warning border + title color |
| `--ta-fg` | `#ffffff` | Title text color |
| `--ta-fg-muted` | `#9ca3af` | Description text color |
| `--ta-font-sm` | `0.875rem` | Title font size |
| `--ta-font-xs` | `0.75rem` | Description font size |

## License

MIT
