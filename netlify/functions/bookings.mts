import { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export default async (req: Request, context: Context) => {
  const store = getStore("pool-bookings");
  
  if (req.method === "GET") {
    const list = await store.list();
    const bookings = await Promise.all(
      list.blobs.map(async (b) => {
        const data = await store.get(b.key, { type: "json" });
        return { id: b.key, ...data };
      })
    );
    return new Response(JSON.stringify(bookings), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (req.method === "POST") {
    const body = await req.json();
    const id = crypto.randomUUID();
    await store.setJSON(id, { ...body, createdAt: new Date().toISOString() });
    return new Response(JSON.stringify({ id, success: true }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response("Method Not Allowed", { status: 405 });
};

export const config = {
  path: "/api/bookings",
};
