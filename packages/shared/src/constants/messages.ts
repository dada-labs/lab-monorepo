export const VALIDATION_MESSAGES = {
  COMMON: {
    REQUIRED_FIELD: "필수 입력 항목입니다.",
  },
  EMAIL: {
    REQUIRED: "이메일을 입력해주세요.",
    INVALID: "이메일 형식이 올바르지 않습니다.",
  },
  PASSWORD: {
    REQUIRED: "비밀번호를 입력해주세요.",
    INVALID: "비밀번호는 영문과 숫자를 포함해 8자 이상이어야 합니다.",
  },
  USERNAME: {
    REQUIRED: "이름을 입력해주세요.",
    INVALID: "이름에는 사용할 수 없는 문자가 포함되어 있습니다.",
  },
  ORGNAME: {
    RREQUIRED: "회사명을 입력해주세요.",
    INVALID: "회사명에는 사용할 수 없는 문자가 포함되어 있습니다.",
  },
  URL: {
    REQUIRED: "URL을 입력해주세요.",
    INVALID: "URL에는 http:// 또는 https://가 포함되어야 합니다.",
  },
} as const;
