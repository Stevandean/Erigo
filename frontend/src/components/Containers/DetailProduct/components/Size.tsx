import { FC } from "react";

const Size: FC = () => {
  return (
    <div className="space-y-3">
      <h1 className="font-semibold tracking-wider text-lg">Size</h1>
      <div className=" xl:space-x-3 space-y-3 xl:space-y-0">
        <button className="border border-1 rounded-lg px-8 py-1.5 hover:bg-navy hover:text-white transition-all ease-in-out duration-300 focus:bg-navy focus:text-white">
          S
        </button>
        <button className="border border-1 rounded-lg px-8 py-1.5 hover:bg-navy hover:text-white transition-all ease-in-out duration-300 focus:bg-navy focus:text-white">
          M
        </button>
        <button className="border border-1 rounded-lg px-8 py-1.5 hover:bg-navy hover:text-white transition-all ease-in-out duration-300 focus:bg-navy focus:text-white">
          L
        </button>
        <button className="border border-1 rounded-lg px-8 py-1.5 hover:bg-navy hover:text-white transition-all ease-in-out duration-300 focus:bg-navy focus:text-white">
          XL
        </button>
        <button className="border border-1 rounded-lg px-8 py-1.5 hover:bg-navy hover:text-white transition-all ease-in-out duration-300 focus:bg-navy focus:text-white">
          XXL
        </button>
      </div>
    </div>
  );
};

export default Size;
