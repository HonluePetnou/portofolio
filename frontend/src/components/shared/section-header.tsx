interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  className,
}: SectionHeaderProps) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
        {title}
      </h1>
      {subtitle && <p className="text-xl text-gray-400">{subtitle}</p>}
    </div>
  );
}
