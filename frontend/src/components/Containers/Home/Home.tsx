import { FC } from "react";

import MainLayout from "@/layouts/MainLayout";
import Hero from "./components/hero";
import NewArrivals from "./components/NewArrivals";
import Collection from "./components/Collection";
import FeaturedProduct from "./components/FeaturedProduct";
import { useAuth } from "@/hooks/useAuth";

const ContainerHome: FC = () => {
  // const { user } = useAuth();

  // console.log(user);

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
        <div className="flex justify-center">
          <hr className="border-2 w-[80%] xl:w-[90%]" />
        </div>
        <Collection />
        <div className="flex justify-center">
          <hr className="border-2 w-[80%] xl:w-[90%]" />
        </div>
        <FeaturedProduct />
      </section>
    </MainLayout>
  );
};

export default ContainerHome;
