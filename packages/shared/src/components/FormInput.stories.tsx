import type { Meta, StoryObj } from "@storybook/react";
import { FormInput } from "./FormInput";
import { useState } from "react";

const meta: Meta<typeof FormInput> = {
  title: "Components/FormInput",
  component: FormInput,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "tel", "url", "date"],
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    error: { control: "text" },
    helper: { control: "text" },
    disabled: { control: "boolean" },
    isIcon: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof FormInput>;

// 1. 기본 상태 with label
export const Default: Story = {
  args: {
    label: "이메일 주소",
    placeholder: "example@dada-lab.com",
    value: "",
    size: "lg",
  },
};

// 2. 에러 상태 (Validation 체크 시각화)
export const Error: Story = {
  args: {
    label: "비밀번호",
    type: "password",
    value: "1234",
    error: "비밀번호는 8자 이상이어야 합니다.",
    size: "lg",
  },
};

// 3. 헬퍼 텍스트와 필수값 표시
export const WithHelper: Story = {
  args: {
    label: "닉네임",
    required: true,
    value: "",
    placeholder: "다다랩에서 사용할 이름을 입력하세요",
    helper: "한글, 영문, 숫자 포함 2~10자 이내",
    size: "md",
  },
};

// 4. 인풋만
export const InputOnly: Story = {
  args: {
    placeholder: "닉네임을 입력해주세요.",
    value: "",
    size: "lg",
  },
};

// 5. 입력 테스트 전용 (상태 변화 확인)
export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <FormInput
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  args: {
    label: "아이디",
    placeholder: "사용할 아이디를 입력해주세요.",
  },
};
