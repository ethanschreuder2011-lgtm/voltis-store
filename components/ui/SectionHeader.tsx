export function SectionEyebrow({
  children,
  color,
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <p
      className="uppercase tracking-[0.4em] text-[10px] font-bold mb-3"
      style={{ color: color ?? "#a855f7" }}
    >
      {children}
    </p>
  );
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
      {children}
    </h2>
  );
}
