interface ArticleItemProps {
  label: string;
  children: React.ReactNode;
}

export function ArticleItem({ label, children }: ArticleItemProps) {
  return (
    <dl className="flex flex-col gap-1">
      <dt className="font-bold text-lg">{label}</dt>
      <dd className="font-medium text-gray-600">{children}</dd>
    </dl>
  );
}
