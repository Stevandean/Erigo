import ProductCard from "@/components/Mixins/ProductCard";
import MainLayout from "@/layouts/MainLayout";
import { FC } from "react";

const ContainerProduct: FC = () => {
  return (
    <MainLayout>
      <section className="min-h-full">
        <h1 className="text-2xl font-extrabold p-10 uppercase">
          featured products
        </h1>
        <div className="grid grid-cols-1 xl:grid-cols-4 w-full gap-x-20 gap-y-10 px-10">
          <ProductCard />
        </div>
        <div className="flex justify-end p-10">
          <button className="text-lg font-semibold text-white bg-navy px-3 py-1.5 rounded-lg hover:scale-[1.2] transition-all ease-in-out duration-300">
            Show More
          </button>
        </div>
      </section>
    </MainLayout>
  );
};

export default ContainerProduct;
