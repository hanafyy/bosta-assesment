import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PackageCheck, Truck, Package, Box } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import {
  formatDateTimeWithDay,
  formatDateWithLocale,
} from "@/utils/dateFormations";
import { TimelineStep } from "./TimelineStepHorizonatl";
import { TimelineStepVertical } from "./TimelineStepVertical";
import { getLastReason } from "@/utils/extractors";

interface DeliveryStatusCardProps {
  orderNumber: string;
  merchantName: string;
  lastUpdate: string;
  deliveryDate: string;
  status: string;
  transitEvents: Array<{ state: string; timestamp: string }>;
}

const stages = [
  {
    label: "shipmentCreated",
    state: ["TICKET_CREATED"],
    icon: Box,
  },
  {
    label: "shipmentReceived",
    state: ["PACKAGE_RECEIVED", "IN_TRANSIT"],
    icon: Package,
  },
  {
    label: "shipmentPreparedForDelivery",
    state: [
      "DELIVERED_TO_SENDER",
      "WAITING_FOR_CUSTOMER_ACTION",
      "OUT_FOR_DELIVERY",
    ],
    icon: Truck,
  },
  {
    label: "shipmentDelivered",
    state: ["DELIVERED"],
    icon: PackageCheck,
  },
];

export function DeliveryStatusCard({
  orderNumber,
  merchantName,
  lastUpdate,
  deliveryDate,
  status,
  transitEvents,
}: DeliveryStatusCardProps) {
  const { t, i18n } = useTranslation();

  const getStepStatus = (stepIndex: number) => {
    if (status === "CANCELLED") {
      return { isCompleted: stepIndex === 0, isActive: stepIndex === 1 };
    }
    if (status === "DELIVERED") {
      return { isCompleted: true, isActive: false };
    }
    // Pending
    const completedSteps = 2; // Adjust based on current progress
    return {
      isCompleted: stepIndex < completedSteps,
      isActive: stepIndex === completedSteps,
    };
  };

  const lastReason = getLastReason(transitEvents);
  console.log(lastReason);
  return (
    <Card className="w-full xl:max-w-7xl lg:max-w-4xl sm:max-w-2xl max-w-sm mx-auto mt-14">
      {/* card data  */}
      <CardHeader className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 px-6 py-4 border-b text-right">
        <div className="flex flex-col items-start gap-2 mt-[6px]">
          <p className="text-sm font-semibold text-muted-foreground text-gray-400">
            <span>{t("Shipment number")}</span>
            <span> {orderNumber}</span>
          </p>
          <p
            className={cn("text-lg font-semibold", {
              "text-green-500": status === "DELIVERED",
              "text-red-500": status === "CANCELLED",
              "text-yellow-500": status === "DELIVERED_TO_SENDER",
            })}
          >
            {status === "DELIVERED"
              ? t("The shipment has been delivered")
              : status === "CANCELLED"
              ? t("The shipment has been cancelled")
              : t("The shipment is pending")}
          </p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <p className="text-sm font-semibold text-muted-foreground text-gray-400">
            {t("Last update")}
          </p>
          <p className="text-lg font-semibold">
            {formatDateTimeWithDay(lastUpdate, i18n.language)}
          </p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <p className="text-sm font-semibold text-muted-foreground text-gray-400">
            {t("Provider")}
          </p>
          <p className="text-lg font-semibold">{merchantName}</p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <p className="text-sm font-semibold text-muted-foreground text-gray-400">
            {t("Delivery time within")}
          </p>
          <p className="text-lg font-semibold">
            {formatDateWithLocale(deliveryDate, i18n.language)}
          </p>
        </div>
      </CardHeader>
      {/* large scale */}
      <CardContent className="p-10 lg:block hidden">
        <div className="relative mt-8 ">
          {/* Progress Line Container */}
          <div className="absolute top-3 left-8 right-8 h-1">
            {/* Background Line */}
            <div className="absolute inset-0 bg-gray-200" />
            {/* Colored Progress Line */}
            <div
              className={`absolute h-full transition-all duration-500 ${
                status === "DELIVERED"
                  ? "bg-green-500 w-full"
                  : status === "CANCELLED"
                  ? "bg-red-500 w-1/3"
                  : "bg-amber-500 w-2/3"
              }`}
            />
          </div>

          {/* Timeline Steps */}
          <div className="relative flex justify-between px-6">
            {stages.map((step, index) => {
              const { isCompleted, isActive } = getStepStatus(index);
              return (
                <TimelineStep
                  key={index}
                  label={t(step.label)}
                  subLabel={lastReason}
                  isCompleted={isCompleted}
                  isActive={isActive}
                  isFirst={index === 0}
                  isLast={index === stages.length - 1}
                  status={status}
                  icon={step.icon}
                />
              );
            })}
          </div>
        </div>
      </CardContent>
      {/* small scale */}
      <CardContent className="p-10 lg:hidden block">
        <div className="relative mt-8 pr-3">
          {/* Progress Line Container */}
          <div
            className={`absolute top-2 bottom-2 ${
              localStorage.getItem("lang") === "ar"
                ? "right-[1.30rem]"
                : "left-[0.7rem]"
            } w-1`}
          >
            {/* Background Line */}
            <div className="absolute inset-0 bg-gray-200" />
            {/* Colored Progress Line */}
            <div
              className={`absolute w-full transition-all duration-500 ${
                status === "DELIVERED"
                  ? "bg-green-500 h-full"
                  : status === "CANCELLED"
                  ? "bg-red-500 h-1/3"
                  : "bg-amber-500 h-2/3"
              }`}
            />
          </div>

          {/* Timeline Steps */}
          <div className="relative flex flex-col gap-12">
            {stages.map((step, index) => {
              const { isCompleted, isActive } = getStepStatus(index);
              return (
                <TimelineStepVertical
                  key={index}
                  label={t(step.label)}
                  subLabel={lastReason}
                  isCompleted={isCompleted}
                  isActive={isActive}
                  isFirst={index === 0}
                  isLast={index === stages.length - 1}
                  status={status}
                  icon={step.icon}
                />
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
