import { FC } from "react";

import MainLayout from "@/layouts/MainLayout";
import Hero from "./components/Hero";
import NewArrivals from "./components/NewArrivals";
import Collection from "./components/Collection";
import FeaturedProduct from "./components/FeaturedProduct";

const ContainerHome: FC = () => {
  return (
    <MainLayout>
      <section>
        <Hero />
        <div className="flex justify-center">
          <hr className="border-2 w-[80%] xl:w-[90%]" />
        </div>
        <NewArrivals />
        <div className="flex justify-center">
          <hr className="border-2 w-[80%] xl:w-[90%]" />
        </div>
      </section>
      <div className="flex justify-center">
        <hr className="border-2 w-[80%] xl:w-[90%]" />
      </div>
      <Collection />
      <div className="flex justify-center">
        <hr className="border-2 w-[80%] xl:w-[90%]" />
      </div>
      <FeaturedProduct />
    </MainLayout>
  );
};

export default ContainerHome;
