export const validateEmail = (email: string) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

export const validatePassword = (password: string) => {
  return {
    length: password.length >= 8,
    hasNumber: /\d/.test(password),
    hasLetter: /[a-zA-Z]/.test(password),
    isValid:
      password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password),
  };
};

/** 이름, 특수문자 제한 (한글, 영문, 숫자만 허용) */
export const validateName = (name: string): boolean => {
  const trimmedName = name.trim();
  // 특수문자 제외, 2자 이상
  const nameRegex = /^[a-zA-Z0-9가-힣\s]{1,}$/;
  return nameRegex.test(trimmedName);
};

//  URL 유효성 검사 (프로토콜 + 도메인 + 마침표 포함 여부)
export const validateUrl = (value: string) => {
  // http(s)로 시작하고 중간에 마침표가 있는 일반적인 URL 형식
  const urlRegex = /^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i;
  return urlRegex.test(value.trim());
};
