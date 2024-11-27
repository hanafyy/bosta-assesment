export interface StatusColors {
  background: string;
  border: string;
}

export function getStatusColors(
  status: string,
  isCompleted: boolean,
  isActive: boolean
): StatusColors {
  if (isCompleted || isActive) {
    switch (status) {
      case "DELIVERED":
        return {
          background: "bg-green-500",
          border: "border-green-500",
        };
      case "CANCELLED":
        return {
          background: "bg-red-500",
          border: "border-red-500",
        };
      case "DELIVERED_TO_SENDER":
        return {
          background: "bg-amber-500",
          border: "border-amber-500",
        };
      default:
        return {
          background: "bg-gray-200",
          border: "border-gray-300",
        };
    }
  } else {
    return {
      background: "bg-gray-200",
      border: "border-gray-300",
    };
  }
}
