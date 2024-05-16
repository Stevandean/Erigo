import { FC } from "react";

import MainLayout from "@/layouts/MainLayout";
import Rating from "./components/Rating";
import Size from "./components/Size";
import Qty from "./components/Qty";

const ContainerDetailProduct: FC = () => {
  return (
    <MainLayout>
      <section className="min-h-full flex">
        <div className="grid xl:grid-cols-5 h-full xl:px-20">
          <div className="flex items-center justify-center h-full xl:col-span-2">
            <img
              className="rounded-3xl h-5/6"
              src="./assets/img/Rectangle 4.png"
              alt=""
            />
          </div>

          <div className="xl:col-span-3 flex flex-col xl:py-16 px-10 space-y-8">
            <div className="space-y-3 pb-5">
              <h1 className="text-xl xl:text-3xl font-semibold ">
                Erigo T-Shirt Basic Olive White Unisex
              </h1>

              <Rating />
            </div>

            <Size />

            <Qty />

            <div className="space-y-3">
              <h1 className="font-semibold tracking-wider text-lg">
                Description
              </h1>
              <p className="text-wrap">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>

            <div className="space-y-3">
              <h1 className="font-bold tracking-wider text-lg">Sub Total</h1>
              <span>Rp.250.000</span>
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
