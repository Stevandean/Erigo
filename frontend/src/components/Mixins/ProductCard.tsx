import { FC } from "react";

const ProductCard: FC = () => {
  return (
    <div className="flex flex-col relative justify-center items-center custom-shadow rounded-lg py-5">
      <div className="absolute top-0 left-0 bg-red rounded-tl-xl px-3 py-0.5 text-white">
        New
      </div>
      <img
        className="w-3/4 rounded-lg mb-5"
        src="./assets/img/products_2.png"
        alt=""
      />
      <h1 className="font-semibold text-xl mb-10">Erigo Last Stock T-Shirt </h1>
      <h1 className="font-bold text-xl">Rp.49.000</h1>
    </div>
  );
};

export default ProductCard;
