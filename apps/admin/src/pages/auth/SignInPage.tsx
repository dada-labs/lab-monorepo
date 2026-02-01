import { useEffect, useMemo, useState } from "react";

import {
  FormInput,
  Button,
  validateEmail,
  validatePassword,
  VALIDATION_MESSAGES,
} from "@shared";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "@/lib/auth";
import { useAuthStore } from "@/store/authStore";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Touched 상태 추가
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const isEmailValid = useMemo(() => validateEmail(email), [email]);
  const pwStatus = useMemo(() => validatePassword(password), [password]);
  const isPasswordValid = pwStatus.isValid;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { accessToken, user, setAuth } = useAuthStore();

  //  사용자 정보 확인
  useEffect(() => {
    if (accessToken && user) {
      navigate("/");
    }
  }, [accessToken, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailTouched(true);
    setPasswordTouched(true);
    if (!isEmailValid || !isPasswordValid) return;
    setIsLoading(true);
    setError("");

    try {
      const response = await signIn({
        email,
        password,
      });
      if (!response.success || !response.data) {
        setError(response.message || "로그인 정보를 확인해주세요.");
        return;
      }
      const { user, accessToken } = response.data;

      // 전역 상태에 저장
      if (user) {
        setAuth(user, accessToken);

        // 대시보드
        navigate("/project");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm space-y-8 rounded-lg bg-white">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <FormInput
            label="이메일"
            type="email"
            required
            placeholder="email@example.com"
            value={email}
            onChange={(value: string) => {
              setEmail(value);
              setEmailTouched(false);
            }}
            onBlur={() => setEmailTouched(true)}
            error={
              emailTouched && email && !isEmailValid
                ? VALIDATION_MESSAGES.EMAIL.INVALID
                : undefined
            }
          />
          <FormInput
            label="비밀번호"
            type="password"
            required
            placeholder={VALIDATION_MESSAGES.PASSWORD.REQUIRED}
            value={password}
            onChange={(value: string) => {
              setPassword(value);
              setPasswordTouched(false);
            }}
            onBlur={() => setPasswordTouched(true)}
            error={
              passwordTouched && password && !isPasswordValid
                ? VALIDATION_MESSAGES.PASSWORD.INVALID
                : undefined
            }
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex flex-col gap-4">
          <Button type="submit" isLoading={isLoading}>
            로그인
          </Button>
          <Link to="/auth/signup">
            <Button
              type="button"
              variant="none"
              size="md"
              className="!text-gray-400 !text-sm font-normal"
            >
              Dada Lab 관리 계정이 없다면,{" "}
              <span className="text-gray-600 font-semibold">회원가입</span>
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
