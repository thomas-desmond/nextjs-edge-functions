import type { NextFetchEvent, NextRequest } from 'next/server';

// Block GB, prefer US
const BLOCKED_COUNTRY = 'US';

export function middleware(req: NextRequest) {

  let country = 'CA';
  if(req.geo) {
    country = req.geo.country || 'US';
  }

  // If the request is from the blocked country,
  // send back a response with a status code
  if (country === BLOCKED_COUNTRY) {
    return new Response('Blocked for legal reasons', { status: 451 });
  }

  // Otherwise, send a response with the country
  return new Response(`Greetings from ${country}, where you are not blocked.`);
}