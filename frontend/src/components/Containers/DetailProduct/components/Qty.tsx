import { FC } from "react";

const Qty: FC = () => {
  return (
    <div className="space-y-3">
      <h1 className="font-semibold tracking-wider text-lg">Quantity</h1>
      <div className="flex">
        <button type="button" className="w-8 h-8 border rounded-l-md">
          -
        </button>
        <input
          id="qtyinput"
          type="text"
          className="w-16 h-8 text-center border-y"
          value="1"
        />
        <button className="w-8 h-8 border rounded-r-md">+</button>
      </div>
    </div>
  );
};

export default Qty;
