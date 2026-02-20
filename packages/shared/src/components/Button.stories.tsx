import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  // props를 직접 조절할 수 있는 컨트롤 설정
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "dark",
        "disabled",
        "danger",
        "line",
        "linePrimary",
        "none",
      ],
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 1. 기본형 (Primary)
export const Primary: Story = {
  args: {
    children: "Dada Lab 버튼",
    variant: "primary",
    size: "lg",
  },
};

// 2. 라인형 프라이머리
export const LinePrimary: Story = {
  args: {
    children: "라인 버튼",
    variant: "linePrimary",
    size: "md",
  },
};

// 3. 로딩 상태
export const Loading: Story = {
  args: {
    children: "로딩 중 버튼",
    isLoading: true,
  },
};

// 4. 모든 변형 한눈에 보기 (테스트용)
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-xs">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="dark">Dark</Button>
      <Button variant="linePrimary">Line Primary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="disabled">Disabled</Button>
      <Button variant="none">None Style</Button>
    </div>
  ),
};
