import { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

const HERO_STORE = "site-assets";
const HERO_KEY = "hero-image";

function getAdminToken(req: Request): string | null {
  const auth = req.headers.get("Authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  const cookie = req.headers.get("Cookie") ?? "";
  const match = cookie.match(/(?:^|;\s*)admin_token=([^;]+)/);
  return match?.[1] ?? null;
}

export default async (req: Request, context: Context) => {
  const store = getStore(HERO_STORE);

  // GET - serve hero image from Blobs or fall back to static
  if (req.method === "GET") {
    try {
      const blob = await store.getWithMetadata(HERO_KEY);
      if (blob?.data) {
        const ct = (blob.metadata?.contentType as string) || "image/webp";
        return new Response(blob.data as ReadableStream, {
          status: 200,
          headers: {
            "Content-Type": ct,
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
          },
        });
      }
    } catch { /* no custom hero, fall through */ }

    // Redirect to the best static hero image
    return new Response(null, {
      status: 302,
      headers: { Location: "/img/hero-600w.webp" },
    });
  }

  // POST - upload a new hero image (admin only)
  if (req.method === "POST") {
    const token = getAdminToken(req);
    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { "Content-Type": "application/json" },
      });
    }

    // Verify token via auth function
    const verifyRes = await fetch(new URL("/api/auth", req.url), {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!verifyRes.ok) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { "Content-Type": "application/json" },
      });
    }

    const contentType = req.headers.get("Content-Type") || "image/jpeg";
    if (!contentType.startsWith("image/")) {
      return new Response(JSON.stringify({ error: "Must be an image" }), {
        status: 400, headers: { "Content-Type": "application/json" },
      });
    }

    const body = await req.arrayBuffer();
    if (body.byteLength > 5 * 1024 * 1024) {
      return new Response(JSON.stringify({ error: "Image too large (max 5MB)" }), {
        status: 413, headers: { "Content-Type": "application/json" },
      });
    }

    await store.set(HERO_KEY, body, { metadata: { contentType } });

    return new Response(JSON.stringify({ success: true, message: "Hero image updated" }), {
      status: 200, headers: { "Content-Type": "application/json" },
    });
  }

  // DELETE - remove custom hero (revert to static)
  if (req.method === "DELETE") {
    const token = getAdminToken(req);
    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { "Content-Type": "application/json" },
      });
    }
    const verifyRes = await fetch(new URL("/api/auth", req.url), {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!verifyRes.ok) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { "Content-Type": "application/json" },
      });
    }

    try { await store.delete(HERO_KEY); } catch { /* already gone */ }

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { "Content-Type": "application/json" },
    });
  }

  return new Response("Method Not Allowed", { status: 405 });
};

export const config = { path: "/api/hero-image" };
