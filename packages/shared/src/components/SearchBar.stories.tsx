import type { Meta, StoryObj } from "@storybook/react";
import { SearchBar } from "./SearchBar";
import { fn } from "@storybook/test";

const meta: Meta<typeof SearchBar> = {
  title: "Components/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
  args: { onSearch: fn() },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

// 1. 기본
export const Default: Story = {
  args: {
    placeholder: "Dada Lab의 프로젝트를 검색하세요",
  },
};

// 2. 초기값이 있는 경우
export const WithInitialValue: Story = {
  args: {
    initialValue: "다다랩",
    placeholder: "검색어를 입력해 주세요",
  },
};

// 3. 좁은 너비에서
export const Narrow: Story = {
  render: (args) => (
    <div className="w-[200px] border-1 border-dashed border-gray-300 p-2">
      <SearchBar {...args} />
    </div>
  ),
  args: {
    placeholder: "검색...",
  },
};
