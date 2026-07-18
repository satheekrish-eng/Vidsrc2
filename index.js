const { addonBuilder, serveHTTP, getRouter } = require('stremio-addon-sdk');

const VIDSRC_BASE = 'https://vidsrc.in';

const manifest = {
  id: 'community.vidsrc',
  version: '1.0.0',
  name: 'VidSrc',
  description: 'Watch movies & TV shows using the VidSrc streaming API. Supports IMDB IDs.',
  logo: 'https://vidsrc.xyz/images/logo.png',
  background: 'https://i.imgur.com/t8wVwcg.jpg',
  resources: ['stream'],
  types: ['movie', 'series'],
  idPrefixes: ['tt'],
  catalogs: [],
  behaviorHints: {
    configurable: false,
    configurationRequired: false,
  },
};

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(async ({ type, id }) => {
  try {
    let embedUrl;
    if (type === 'movie') {
      embedUrl = `${VIDSRC_BASE}/embed/movie?imdb=${id}`;
    } else if (type === 'series') {
      const [imdbId, season, episode] = id.split(':');
      if (!season || !episode) return { streams: [] };
      embedUrl = `${VIDSRC_BASE}/embed/tv?imdb=${imdbId}&season=${season}&episode=${episode}`;
    } else {
      return { streams: [] };
    }
    const streams = [
      {
        name: 'VidSrc',
        title: 'VidSrc · Up to 1080p\nMultiple servers available',
        externalUrl: embedUrl,
        behaviorHints: {
          notWebReady: true,
        },
      },
    ];
    return { streams };
  } catch (err) {
    console.error('Stream handler error:', err);
    return { streams: [] };
  }
});

const addonInterface = builder.getInterface();

if (process.env.VERCEL) {
  const router = getRouter(addonInterface);
  module.exports = (req, res) => {
    router(req, res, () => {
      res.statusCode = 404;
      res.end();
    });
  };
} else {
  const PORT = process.env.PORT || 7000;
  serveHTTP(addonInterface, { port: PORT });
  console.log(`\n✅  VidSrc Stremio Addon running!`);
  console.log(`📦  Manifest : http://127.0.0.1:${PORT}/manifest.json`);
  console.log(`\nTo install in Stremio, paste this URL in the addon search box:\n`);
  console.log(`    http://127.0.0.1:${PORT}/manifest.json\n`);
}