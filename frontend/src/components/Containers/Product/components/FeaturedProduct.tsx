"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { isAxiosError, useAxios } from "@/hooks/useAxios";

import ProductCard from "@/components/Mixins/ProductCard";
import { Product } from "@/interfaces/product";
import { errorToast } from "@/lib/toastNotify";

const FeaturedProduct: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Product[]>();

  const axios = useAxios();

  const getData = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.get("product");
      setIsLoading(false);
      setData(data.data);
    } catch (err) {
      if (isAxiosError(err)) {
        errorToast(err.response?.data?.message || "An error occurred");
      } else {
        errorToast("An unexpected error occurred");
      }
    }
  }, [axios]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="min-h-full mb-10">
      <h1 className="text-2xl font-extrabold p-10 uppercase">
        featured products
      </h1>
      <div className="grid grid-cols-1 xl:grid-cols-4 w-full gap-x-8 gap-y-10 px-10">
        <ProductCard data={data} getData={getData} isLoading={isLoading} />
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
