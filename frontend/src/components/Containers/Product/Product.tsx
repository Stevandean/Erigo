import { FC } from "react";

import MainLayout from "@/layouts/MainLayout";
import FeaturedProduct from "./components/FeaturedProduct";

const ContainerProduct: FC = () => {
  return (
    <MainLayout>
      <FeaturedProduct />
    </MainLayout>
  );
};

export default ContainerProduct;
