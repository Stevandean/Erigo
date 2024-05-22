import { FC } from "react";

const Cart: FC = () => {
  return (
    <div className="border border-gray rounded-lg grid grid-cols-5 px-5 justify-center items-center gap-x-10">
      <img
        className="w-5/6 h-5/6 overflow-clip object-cover rounded-lg"
        src="./assets/img/Rectangle 4.png"
        alt=""
      />
      <div className="flex flex-col">
        <span className="text-lg font-bold">
          Erigo T-Shirt Basic Olive White Unisex
        </span>
        <span className="text-lg text-gray">Size : XL</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <span className="text-lg font-semibold">Rp.250.000</span>
        <div className="flex">
          <button className="w-8 h-8 border rounded-l-md">-</button>
          <input
            id="qtyinput"
            type="text"
            className="w-16 h-8 text-center border-y"
            value="1"
          />
          <button className="w-8 h-8 border rounded-r-md">+</button>
        </div>
      </div>
      <span className="text-lg font-semibold flex justify-center">
        Rp.250.000
      </span>
      <button className="bg-red text-white text-lg font-semibold tracking-wider px-5 py-2 w-40 rounded-lg hover:scale-[1.2] transition-all ease-in-out duration-300">
        Delete
      </button>
    </div>
  );
};

export default Cart;
