const colorMap: Record<string, string> = {
  rehber: "bg-fpv-cyan/10 text-fpv-cyan",
  haber: "bg-fpv-orange/10 text-fpv-orange",
  inceleme: "bg-fpv-lime/10 text-fpv-lime",
  ipucu: "bg-purple-500/10 text-purple-400",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: string;
  className?: string;
}

export function Badge({ children, variant, className = "" }: BadgeProps) {
  const colors = variant && colorMap[variant] ? colorMap[variant] : "bg-zinc-800 text-zinc-300";
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${colors} ${className}`}
    >
      {children}
    </span>
  );
}
