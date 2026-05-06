const crypto = require("crypto");

function createToken(secret) {
  const payload = Buffer.from(
    JSON.stringify({ role: "admin", exp: Date.now() + 86_400_000 })
  ).toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

function verifyToken(token, secret) {
  try {
    const [payload, sig] = token.split(".");
    if (!payload || !sig) return null;
    const expected = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
    if (sig !== expected) return null;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

function getToken(event) {
  const auth = event.headers.authorization || "";
  if (auth.startsWith("Bearer ")) return auth.slice(7);
  const cookie = event.headers.cookie || "";
  const m = cookie.match(/(?:^|;\s*)admin_token=([^;]+)/);
  return m ? m[1] : null;
}

exports.handler = async (event) => {
  const adminPassword = process.env.ADMIN_TOKEN;
  const jwtSecret = process.env.JWT_SECRET || adminPassword;

  const headers = { "Content-Type": "application/json" };

  if (!adminPassword) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Server misconfigured" }) };
  }

  // POST — login
  if (event.httpMethod === "POST") {
    let body = {};
    try { body = JSON.parse(event.body || "{}"); } catch { /* ignore */ }

    if (body.password !== adminPassword) {
      return { statusCode: 401, headers, body: JSON.stringify({ error: "Invalid credentials" }) };
    }

    const token = createToken(jwtSecret);
    const cookieFlags = "HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400";
    return {
      statusCode: 200,
      headers: { ...headers, "Set-Cookie": `admin_token=${token}; ${cookieFlags}` },
      body: JSON.stringify({ token }),
    };
  }

  // GET — verify
  if (event.httpMethod === "GET") {
    const token = getToken(event);
    if (!token) return { statusCode: 401, headers, body: JSON.stringify({ error: "Unauthorized" }) };
    const payload = verifyToken(token, jwtSecret);
    if (!payload) return { statusCode: 401, headers, body: JSON.stringify({ error: "Invalid or expired token" }) };
    return { statusCode: 200, headers, body: JSON.stringify({ authenticated: true, role: payload.role }) };
  }

  // DELETE — logout
  if (event.httpMethod === "DELETE") {
    return {
      statusCode: 200,
      headers: {
        ...headers,
        "Set-Cookie": "admin_token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0",
      },
      body: JSON.stringify({ success: true }),
    };
  }

  return { statusCode: 405, body: "Method Not Allowed" };
};
