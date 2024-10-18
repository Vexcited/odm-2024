import crypto from "node:crypto";

export const generateOTP = (): string => {
  const digits = "0123456789";
  let otp = "";

  while (otp.length < 6) {
    const index = crypto.randomInt(0, digits.length);
    otp += digits[index];
  }

  return otp;
};
