import { type IUser, User } from "~/models/user";
import jwt from "jsonwebtoken";

export const getUser = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email });
};

const JWT_TOKEN = "private key à mettre dans le .env";

export const tokenizeUser = (user: IUser): string => {
  const token = jwt.sign({
    email: user.email
  }, JWT_TOKEN);

  return token;
};

export const untokenizeUser = async (token: string): Promise<IUser | null> => {
  try {
    const { email } = jwt.verify(token, JWT_TOKEN) as {
      email: string
    };

    return getUser(email);
  }
  catch {
    return null;
  }
};
