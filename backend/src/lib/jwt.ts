import jwt from "jsonwebtoken";

interface TokenPayload {
  id: number;
  email: string;
  name: string;
}

export class JwtConfig {
  private static getSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return secret;
  }

  static generateToken(payload: TokenPayload): string {
    const secret = this.getSecret();
    const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

    return jwt.sign(payload, secret, {
      expiresIn,
      algorithm: "HS256", // Specify algorithm for better type safety
    });
  }

  static verifyToken(token: string): TokenPayload {
    const secret = this.getSecret();
    return jwt.verify(token, secret) as TokenPayload;
  }
}
