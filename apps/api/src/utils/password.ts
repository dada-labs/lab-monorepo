import bcrypt from "bcrypt";

// 비밀번호 암호화
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

// 비밀번호 일치 여부 확인
export const isPasswordMatch = async (
  password: string,
  storedhash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, storedhash);
};
