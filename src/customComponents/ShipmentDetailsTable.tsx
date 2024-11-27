import { cn } from "@/lib/utils";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TransitEvent } from "@/interfaces";
import { formatDate } from "@/utils/dateFormations";
import { formatTime } from "@/utils/dateFormations";

const ShipmentDetailsTable = ({
  transitEvents,
  isRTL,
  currentStatus,
  t,
}: {
  transitEvents: TransitEvent[];
  isRTL: boolean;
  currentStatus: string;
  t: (key: string) => string;
}) => (
  <div className="w-full lg:col-span-2 col-span-3 flex flex-col gap-2">
    <h3 className="text-2xl">{t("Shipment Details")}</h3>
    <Card>
      <Table className="text-lg">
        <TableHeader className="bg-gray-400/5">
          <TableRow>
            {["Branch", "Date", "Time", "Details"].map((header) => (
              <TableHead
                key={header}
                className={`w-[140px] text-lg ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t(header)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {transitEvents.map((event, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {event.hub || t("hq")}
              </TableCell>
              <TableCell>{formatDate(event.timestamp) || "N/A"}</TableCell>
              <TableCell>{formatTime(event.timestamp) || "N/A"}</TableCell>
              <TableCell
                className={`flex flex-col gap-2 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                <span>{t(event.state) || "N/A"}</span>
                {event.reason && (
                  <span
                    className={cn("xl:block hidden", {
                      "text-green-500": currentStatus === "DELIVERED",
                      "text-red-500": currentStatus === "CANCELLED",
                      "text-yellow-500":
                        currentStatus === "DELIVERED_TO_SENDER",
                    })}
                  >
                    {event.reason || "N/A"}
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  </div>
);

export default ShipmentDetailsTable;
