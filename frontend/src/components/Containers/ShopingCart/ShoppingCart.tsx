import MainLayout from "@/layouts/MainLayout";
import { FC } from "react";
import Cart from "./components/Cart";

const ContainerShoppingCart: FC = () => {
  return (
    <MainLayout>
      <section className="min-h-full p-10">
        <h1 className="text-2xl font-extrabold uppercase mb-10">
          shopping cart
        </h1>
        <Cart />
        <div className="flex justify-end mt-10">
          <a
            href="./payment.html"
            className="bg-navy text-white px-5 py-2 rounded-lg font-semibold transition-all ease-in-out duration-300 hover:scale-[1.2]"
          >
            Payment Process
          </a>
        </div>
      </section>
    </MainLayout>
  );
};

export default ContainerShoppingCart;
