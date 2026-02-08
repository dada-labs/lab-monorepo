import React from "react";
import { Button } from "./Button";
import { AppWindowMac, Github, BookText } from "../icons";

interface UrlButtonProps {
  url: string;
  urlType?: "LIVE" | "GITHUB" | "RELATED";
  theme?: "primary" | "gray";
  LinkComponent?: React.ElementType;
}

export function UrlButton({
  url,
  theme = "primary",
  urlType = "RELATED",
  LinkComponent = "a",
}: UrlButtonProps) {
  const themeStyles = {
    primary: "!text-white !bg-primary hover:!bg-primary-dark",
    gray: "!text-primary !bg-gray-200 hover:!bg-primary-light",
  };
  return (
    <LinkComponent
      href={url}
      to={url}
      target="_blank"
      className="flex flex-col justify-between"
    >
      <Button
        variant="none"
        className={`${themeStyles[theme]} !px-1.5 !w-[48px] !h-[48px] !rounded-4xl transition-colors`}
      >
        {urlType === "LIVE" && <AppWindowMac size={24} />}
        {urlType === "GITHUB" && <Github size={24} />}
        {urlType === "RELATED" && <BookText size={24} />}
      </Button>
    </LinkComponent>
  );
}
