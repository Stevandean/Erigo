"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { isAxiosError, useAxios } from "@/hooks/useAxios";
import { useParams } from "next/navigation";

import MainLayout from "@/layouts/MainLayout";
import Rating from "./components/Rating";
import Size from "./components/Size";
import Qty from "./components/Qty";
import { Product } from "@/interfaces/product";
import { errorToast } from "@/lib/toastNotify";

const ContainerDetailProduct: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Product | null>();

  const axios = useAxios();

  const { id } = useParams();

  const getData = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.get(`product/${id}`);
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
    <MainLayout>
      <section className="min-h-full flex">
        <div className="grid xl:grid-cols-5 h-full xl:px-20">
          <div className="flex items-center justify-center h-full xl:col-span-2">
            <img
              className="rounded-3xl h-5/6"
              src={
                data?.pict
                  ? `http://192.168.1.4:8000/storage/pict/${data.pict}`
                  : `https://ui-avatars.com/api/?name=${data?.product_name}`
              }
              alt=""
            />
          </div>

          <div className="xl:col-span-3 flex flex-col xl:py-16 px-10 space-y-8">
            <div className="space-y-3 pb-5">
              <h1 className="text-xl xl:text-3xl font-semibold ">
                {data?.product_name}
              </h1>

              <Rating />
            </div>

            <Size />

            <Qty />

            <div className="space-y-3">
              <h1 className="font-semibold tracking-wider text-lg">
                Description
              </h1>
              <p className="text-wrap">{data?.desc}</p>
            </div>

            <div className="space-y-3">
              <h1 className="font-bold tracking-wider text-lg">Sub Total</h1>
              <span>Rp.{data?.price}</span>
            </div>

            <div className="flex space-x-2 xl:space-x-5 text-white font-bold pb-10 xl:pb-0">
              <button className="bg-navy px-3 py-1.5 rounded-lg hover:scale-[1.2] transition-all ease-in-out duration-300">
                Add to cart
              </button>

              <button className="bg-gray px-3 py-1.5 rounded-lg hover:scale-[1.2] transition-all ease-in-out duration-300">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ContainerDetailProduct;
