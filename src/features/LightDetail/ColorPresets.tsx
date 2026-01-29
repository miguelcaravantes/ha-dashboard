import { cn } from "../../lib/utils.js";

// Standard Tailwind colors (500 shade) + White
const COLORS = [
  "#ffffff", // White
  "#ef4444", // Red
  "#f97316", // Orange
  "#f59e0b", // Amber
  "#eab308", // Yellow
  "#84cc16", // Lime
  "#22c55e", // Green
  "#10b981", // Emerald
  "#06b6d4", // Cyan
  "#0ea5e9", // Sky
  "#3b82f6", // Blue
  "#6366f1", // Indigo
  "#8b5cf6", // Violet
  "#d946ef", // Fuchsia
  "#ec4899", // Pink
  "#f43f5e", // Rose
];

interface ColorPresetsProps {
  onChange: (color: number[]) => void;
  disabled?: boolean;
}

export default function ColorPresets({
  onChange,
  disabled,
}: ColorPresetsProps) {
  const handleColorClick = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1]!, 16);
      const g = parseInt(result[2]!, 16);
      const b = parseInt(result[3]!, 16);
      onChange([r, g, b]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium">Presets</div>
      <div className="grid grid-cols-5 gap-3 sm:grid-cols-8">
        {COLORS.map((color) => (
          <button
            key={color}
            type="button"
            className={cn(
              "aspect-square w-full rounded-full border border-black/10 shadow-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:border-white/10",
              disabled && "opacity-50 cursor-not-allowed",
            )}
            style={{ backgroundColor: color }}
            onClick={() => !disabled && handleColorClick(color)}
            disabled={disabled}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>
    </div>
  );
}
