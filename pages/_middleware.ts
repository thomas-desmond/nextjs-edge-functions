import type { NextFetchEvent, NextRequest } from 'next/server';

export default function middleware(req: NextRequest, event: NextFetchEvent) {

    if (req.nextUrl.pathname === '/responses/send-response') {
        const { readable, writable } = new TransformStream();
    
        event.waitUntil(
          (async () => {
            const writer = writable.getWriter();
            const encoder = new TextEncoder();
            writer.write(encoder.encode('Hello, world! Streamed!'));
            writer.write(encoder.encode('response'));
            writer.close();
          })(),
        );
    
        return new Response(readable);
      }


}