import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import config from "../config";

const generateToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expiresIn: string
): string => {
  const token = jwt.sign(payload, secret, <SignOptions>{
    algorithm: "HS256",
    expiresIn,
  });

  return token;
};

const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};

const getUserInfroFromToken = async (token: string) => {
  try {
    const userData = verifyToken(
      token,
      config.jwt.jwt_secret as string
    ) as JwtPayload;

    return userData;
  } catch (error) {
    return null;
  }
};

export const jwtHelpers = {
  generateToken,
  verifyToken,
  getUserInfroFromToken,
};
