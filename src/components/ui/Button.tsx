import Link from "next/link";

interface ButtonProps {
  href?: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200";
  const variants = {
    primary:
      "bg-fpv-cyan text-zinc-950 hover:bg-fpv-cyan/80 shadow-lg shadow-fpv-cyan/20",
    secondary:
      "border border-fpv-border bg-fpv-card text-zinc-100 hover:border-fpv-cyan/50 hover:text-fpv-cyan",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
