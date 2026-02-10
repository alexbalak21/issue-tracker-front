export interface BarSlice {
  label: string;
  value: number;
  color: string;
}

interface VerticalBarsProps {
  data: BarSlice[];
  maxY?: number;
  barWidth?: number;
  minHeight?: number;
}

export function VerticalBars({
  data,
  maxY,
  barWidth = 40,
  minHeight = 8,
}: VerticalBarsProps) {
  const max = maxY || Math.max(...data.map(d => d.value), 1);

  return (
    <div className="inline-flex items-end gap-6 h-[85%]">
      {data.map(slice => {
        if (slice.value === 0) return null;

        const heightPercent = (slice.value / max) * 100;

        return (
          <div
            key={slice.label}
            className="flex flex-col items-center"
            style={{ width: barWidth, height: "100%" }}
          >
            {/* BAR AREA */}
            <div className="relative w-full flex-1 flex items-end">
              <div
                className={`w-full rounded-t ${slice.color}`}
                style={{
                  height: `${heightPercent}%`,
                  minHeight,
                  transition: "height 0.3s",
                }}
              />
            </div>

            {/* FIXED HEIGHT LABEL AREA */}
            <div className="flex flex-col items-center mt-1" style={{ height: 40 }}>
              <span className="text-xs text-center text-gray-900 dark:text-gray-100">
                {slice.label}
              </span>

              <span className="text-xs text-gray-500 dark:text-gray-300">
                {slice.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
