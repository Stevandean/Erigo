import { FC } from "react";

import UserInformation from "./components/UserInformation";
import ProductInfromation from "./components/ProductInfromation";
import PaymentMethod from "./components/PaymentMethod";
import MainLayout from "@/layouts/MainLayout";

const ContainerPayment: FC = () => {
  return (
    <MainLayout>
      <div className="min-h-full flex flex-col p-10">
        <h1 className="text-2xl font-extrabold uppercase mb-10">
          Payment Method
        </h1>
        <div className="space-y-10 xl:px-10">
          <UserInformation />
          <ProductInfromation />
          <PaymentMethod />
        </div>
      </div>
    </MainLayout>
  );
};

export default ContainerPayment;
