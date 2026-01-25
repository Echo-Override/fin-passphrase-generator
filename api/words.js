/**
 * Vercel Serverless Function - Sanaluettelon palvelu
 * 
 * Turvallisuusominaisuudet:
 * - Rate limiting
 * - CORS headers
 * - Security headers
 * - Input validation
 */

import fs from 'fs';
import path from 'path';

// Rate limiting (yksinkertainen in-memory implementaatio)
const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minuuttia
const MAX_REQUESTS = 100; // Maksimi pyynnöt per ikkuna

/**
 * Tarkista rate limiting
 */
function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = requestCounts.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW };

  // Nollaa laskuri jos aikaraja ylittynyt
  if (now > userRequests.resetTime) {
    userRequests.count = 0;
    userRequests.resetTime = now + RATE_LIMIT_WINDOW;
  }

  userRequests.count++;
  requestCounts.set(ip, userRequests);

  return userRequests.count <= MAX_REQUESTS;
}

/**
 * Pääkäsittelijä
 */
export default async function handler(req, res) {
  // Hae IP-osoite
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  // Tarkista rate limiting
  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      error: 'Liian monta pyyntöä. Yritä myöhemmin uudelleen.',
      retryAfter: 900, // 15 minuuttia sekunneissa
    });
  }

  // Salli vain GET-pyynnöt
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({
      error: `Metodi ${req.method} ei ole sallittu`,
    });
  }

  try {
    // Lue sanaluettelo
    const wordsPath = path.join(process.cwd(), 'words.json');
    
    if (!fs.existsSync(wordsPath)) {
      return res.status(500).json({
        error: 'Sanaluetteloa ei löytynyt',
      });
    }

    const wordsData = fs.readFileSync(wordsPath, 'utf-8');
    const words = JSON.parse(wordsData);

    // Validoi data
    if (!words.words || !Array.isArray(words.words) || words.words.length < 1000) {
      return res.status(500).json({
        error: 'Virheellinen sanaluettelo',
      });
    }

    // Aseta security headerit
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Aseta CORS headerit (rajoitettu)
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
      process.env.PRODUCTION_URL || null,
    ].filter(Boolean);

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Aseta caching
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400');

    // Palauta sanaluettelo
    return res.status(200).json(words);
  } catch (error) {
    console.error('Error serving words:', error);
    return res.status(500).json({
      error: 'Sisäinen palvelinvirhe',
    });
  }
}

// Siivoa vanha rate limit data säännöllisesti (estää muistin täyttymisen)
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of requestCounts.entries()) {
    if (now > data.resetTime) {
      requestCounts.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW);
