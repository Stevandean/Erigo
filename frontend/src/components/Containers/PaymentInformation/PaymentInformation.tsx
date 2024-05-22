import { FC } from "react";

import MainLayout from "@/layouts/MainLayout";
import Faq from "./Components/Faq";
import PaymentInfo from "./Components/PaymentInfo";

const ContainerPaymentInformation: FC = () => {
  return (
    <MainLayout>
      <PaymentInfo />
      <Faq />
    </MainLayout>
  );
};

export default ContainerPaymentInformation;
