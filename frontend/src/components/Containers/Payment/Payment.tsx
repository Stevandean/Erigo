import { FC } from "react";

import MainLayout from "@/layouts/MainLayout";
import UserInformation from "./components/UserInformation";
import ProductInformation from "./components/ProductInformation";
import PaymentMethod from "./components/PaymentMethod";

const ContainerPayment = () => {
  return (
    <MainLayout>
      <section className="min-h-full flex flex-col p-10 ">
              <h1 className="text-2xl font-extrabold uppercase mb-10">Payment Method</h1>
        <div className="space-y-10 xl:px-10">
          <UserInformation />
          <ProductInformation />
          <PaymentMethod />
        </div>
      </section>

    </MainLayout>
  );
};

export default ContainerPayment;
