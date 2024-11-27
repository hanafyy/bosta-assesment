import { cn } from "@/lib/utils";
import { getStatusColors } from "@/utils/getStatusColor";
import { Check, LucideIcon } from "lucide-react";

interface TimelineStepProps {
  label: string;
  isCompleted: boolean;
  isActive: boolean;
  subLabel?: string | null;
  isFirst?: boolean;
  isLast?: boolean;
  status: string;
  icon: LucideIcon;
}

export function TimelineStepVertical({
  label,
  isCompleted,
  isActive,
  subLabel,
  status,
  icon: Icon,
}: TimelineStepProps) {
  const { background, border } = getStatusColors(status, isCompleted, isActive);

  const getIcon = () => {
    if (isCompleted) {
      return <Check className="w-4 h-4 text-white" />;
    } else {
      return <Icon className="w-4 h-4 text-white" />;
    }
  };

  return (
    <div className="flex items-start gap-4 relative">
      <div className="w-6 h-6 relative flex-shrink-0">
        <div
          className={`w-full h-full rounded-full border-2 ${
            !isCompleted && "scale-150"
          } absolute top-0 left-0 z-10 flex items-center justify-center ${background} ${border}`}
        >
          {getIcon()}
        </div>
      </div>
      <div className="flex-1 pt-0.5">
        <p className={`text-base font-medium text-gray-400 w-it`}>{label}</p>
        {subLabel && isActive && (
          <p
            className={cn("text-xs mt-1 ", {
              "text-green-500": status === "DELIVERED",
              "text-red-500": status === "CANCELLED",
              "text-yellow-500": status === "DELIVERED_TO_SENDER",
            })}
          >
            {subLabel}
          </p>
        )}
      </div>
    </div>
  );
}
