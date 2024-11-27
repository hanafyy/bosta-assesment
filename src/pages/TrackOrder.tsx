import { DeliveryStatusCard } from "@/customComponents/DeliveryStatusCard";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShipmentData } from "@/interfaces";

import LoadingMessage from "../customComponents/LoadingMessage";
import ErrorMessage from "../customComponents/ErrorMessage";
import DeliveryAddressCard from "@/customComponents/DeliveryAddressCard";
import ShipmentDetailsTable from "@/customComponents/ShipmentDetailsTable";

function TrackOrder() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const [data, setData] = useState<ShipmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://tracking.bosta.co/shipments/track/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <LoadingMessage />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return data ? <Content data={data} id={id!} isRTL={isRTL} t={t} /> : null;
}

// Main Content Component
const Content = ({
  data,
  id,
  isRTL,
  t,
}: {
  data: ShipmentData;
  id: string;
  isRTL: boolean;
  t: (key: string) => string;
}) => (
  <div className="w-full h-full min-h-screen flex flex-col gap-5 pb-6">
    <DeliveryStatusCard
      transitEvents={data.TransitEvents}
      orderNumber={id}
      merchantName={data.provider}
      lastUpdate={data.CurrentStatus.timestamp}
      deliveryDate={data.PromisedDate}
      status={data.CurrentStatus.state}
    />
    <div className="w-full grid lg:grid-cols-3 gap-4 xl:max-w-7xl lg:max-w-4xl sm:max-w-2xl max-w-sm mx-auto">
      <ShipmentDetailsTable
        transitEvents={data.TransitEvents}
        isRTL={isRTL}
        currentStatus={data.CurrentStatus.state}
        t={t}
      />
      <DeliveryAddressCard address="امبابة شارع طلعت حرب مدينة العمال بجوار البرنس منزل ١٧ بلوك Cairo" />
    </div>
  </div>
);

export default TrackOrder;
