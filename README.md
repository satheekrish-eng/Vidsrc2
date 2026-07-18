# VidSrc Stremio Addon

A Stremio addon that surfaces **VidSrc** embed links for movies and TV episodes. Supports IMDB IDs for both movies and series.

---

## 🚀 Deploy to Vercel (Recommended — Free)

### Option A: Via GitHub (easiest)

1. Push this folder to a new GitHub repo
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import your repo
3. Leave all settings as default and click **Deploy**
4. Once deployed, copy your URL (e.g. `https://vidsrc-addon.vercel.app`)
5. Install in Stremio:
   ```
   https://vidsrc-addon.vercel.app/manifest.json
   ```

### Option B: Via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

Copy the output URL and add `/manifest.json` to install in Stremio.

---

## 💻 Run Locally

```bash
npm install
npm start
```

Then install in Stremio using:
```
http://127.0.0.1:7000/manifest.json
```

> If Stremio is on a different device, replace `127.0.0.1` with your PC's local IP.

---

## How it works

When Stremio requests streams for a title, the addon builds a VidSrc embed URL:

| Type   | URL built |
|--------|-----------|
| Movie  | `vidsrc.xyz/embed/movie?imdb={imdbId}` |
| Series | `vidsrc.xyz/embed/tv?imdb={imdbId}&season=X&episode=Y` |

---

## Alternative VidSrc Domains

If `vidsrc.xyz` is down, change `VIDSRC_BASE` in `index.js` to:
- `https://vidsrc.in`
- `https://vidsrc.pm`
- `https://vidsrc.net`

---

## Disclaimer

This addon links to VidSrc embed players. It does not host or distribute any video content. Use responsibly and in accordance with the laws of your jurisdiction.
