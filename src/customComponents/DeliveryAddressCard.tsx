import { Card } from "@/components/ui/card";
import imgUrl from "../assets/imgs/qa.png";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const DeliveryAddressCard = ({ address }: { address: string }) => {
  const { t } = useTranslation();
  return (
    <div className="w-full lg:col-span-1 md:col-span-1 col-span-3 flex flex-col gap-2 xl:max-w-7xl lg:max-w-4xl sm:max-w-2xl max-w-sm mx-auto">
      <h3 className="text-2xl">{t("Delivery Address")}</h3>
      <Card className="bg-gray-400/5 p-4 min-h-10 text-lg">{address}</Card>
      <Card className="p-4 min-h-10 grid xl:grid-cols-3 grid-cols-1 gap-4">
        <img
          src={imgUrl}
          className="col-span-1 w-full h-full max-h-32 max-w-32 m-auto"
          alt="QA"
        />
        <div className="flex flex-col items-center justify-center gap-2 xl:col-span-2">
          <h4 className="text-xl font-semibold">{t("Facing Any Problems")}</h4>
          <Button className="w-full bg-primaryRed rounded-xl text-lg text-white">
            {t("Report A problem")}
          </Button>
        </div>
      </Card>
    </div>
  );
};
export default DeliveryAddressCard;
