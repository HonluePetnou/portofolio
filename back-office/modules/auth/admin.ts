import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.AUTH_JWT_SECRET;
const JWT_ALGORITHM = (process.env.AUTH_JWT_ALGORITHM ||
  "HS256") as jwt.Algorithm;

export interface AdminContext {
  sub: string;
  raw: jwt.JwtPayload;
}

export function requireAdmin(req: NextRequest): AdminContext {
  if (!JWT_SECRET) {
    throw new Error("AUTH_JWT_SECRET is not configured on the server.");
  }

  const authHeader = req.headers.get("authorization") || "";
  const [, token] = authHeader.split(" ");

  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, JWT_SECRET, {
    algorithms: [JWT_ALGORITHM],
  }) as jwt.JwtPayload;

  const subject = decoded.sub;
  if (!subject || typeof subject !== "string") {
    throw new Error("Unauthorized");
  }

  return { sub: subject, raw: decoded };
}

