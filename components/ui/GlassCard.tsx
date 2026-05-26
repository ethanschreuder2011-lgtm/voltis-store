type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
};

export function GlassCard({ children, className = "", featured = false }: GlassCardProps) {
  return (
    <div
      className={`relative rounded-3xl overflow-hidden border transition-all duration-500 group ${
        featured
          ? "border-purple-500/40 shadow-[0_0_60px_rgba(168,85,247,0.15)]"
          : "border-white/[0.08] hover:border-white/[0.18]"
      } ${className}`}
      style={{ background: "rgba(255,255,255,0.03)" }}
    >
      <div className="absolute inset-0 backdrop-blur-2xl" />
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
