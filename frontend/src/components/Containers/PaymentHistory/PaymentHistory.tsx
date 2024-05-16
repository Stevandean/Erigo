import { FC } from "react";

import MainLayout from "@/layouts/MainLayout";
import TransactionHistory from "./components/TransactionHistory";

const ContainerPaymentHistory: FC = () => {
  return (
    <MainLayout>
      <TransactionHistory />
    </MainLayout>
  );
};

export default ContainerPaymentHistory;
