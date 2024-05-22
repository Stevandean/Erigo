import { FC } from "react";

import ProductCard from "@/components/Mixins/ProductCard";

const FeaturedProduct: FC = () => {
  return (
    <div className="min-h-full mb-10">
      <h1 className="text-2xl font-extrabold p-10 uppercase">
        featured products
      </h1>
      <div className="grid grid-cols-1 xl:grid-cols-4 w-full gap-x-8 gap-y-10 px-10">
      <ProductCard />
      </div>
      <div className="flex justify-end p-10">
        <button className="text-lg font-semibold text-white bg-navy px-3 py-1.5 rounded-lg hover:scale-[1.2] transition-all ease-in-out duration-300">
          Show More
        </button>
      </div>
    </div>
  );
};

export default FeaturedProduct;
