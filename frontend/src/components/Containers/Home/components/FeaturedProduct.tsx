import { FC } from "react";

import ProductCard from "@/components/Mixins/ProductCard";

const FeaturedProduct: FC = () => {
  return (
    <div className="py-10 px-16 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-black uppercase cursor-default mb-5">
        featured products
      </h1>
      <div className="grid grid-cols-1 xl:grid-cols-4 w-full gap-x-8 gap-y-10">
        <ProductCard />
      </div>
      <button className="bg-navy px-3 py-1.5 rounded-lg text-white text-lg font-semibold mt-10 hover:scale-[1.2] transition-all ease-in-out duration-300">
        Show More
      </button>
    </div>
  );
};

export default FeaturedProduct;
