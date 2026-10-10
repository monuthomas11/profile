type TagProps = {
  children: React.ReactNode;
};

export function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
      {children}
    </span>
  );
}
