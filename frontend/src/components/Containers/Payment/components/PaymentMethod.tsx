import { FC } from "react";

const PaymentMethod: FC = () => {
  return (
    <div className="flex flex-col">
      <span className="text-xl font-semibold">Select Method</span>
      <div className="w-36 text-lg font-medium flex justify-between">
        <span>QRIS</span>
        <span></span>
      </div>
      <div className="flex justify-end items-center space-x-10">
        <span className="font-semibold text-lg">Total : Rp.752.999</span>
        <button className="text-white bg-navy rounded-md px-3 py-2">
          <a href="./qris.html">Payment</a>
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;
