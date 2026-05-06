import { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const authHeader = req.headers.get("Authorization");
  const adminToken = Netlify.env.get("ADMIN_TOKEN");

  if (!adminToken) {
    return new Response(JSON.stringify({ error: "Server misconfigured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (authHeader !== `Bearer ${adminToken}`) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ message: "Welcome Admin" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const config = {
  path: "/api/auth",
};
