import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  href?: string;
};

export function PrimaryButton({ children, onClick, type = "button", className = "", href }: ButtonProps) {
  const cls = `bg-purple-600 hover:bg-purple-500 active:scale-95 transition-all duration-200 font-semibold tracking-wide shadow-[0_0_24px_rgba(168,85,247,0.35)] hover:shadow-[0_0_40px_rgba(168,85,247,0.55)] ${className}`;
  if (href) {
    return <Link href={href} className={cls}>{children}</Link>;
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function GhostButton({ children, onClick, type = "button", className = "", href }: ButtonProps) {
  const cls = `border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/25 active:scale-95 transition-all duration-200 font-semibold tracking-wide ${className}`;
  if (href) {
    return <Link href={href} className={cls}>{children}</Link>;
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
