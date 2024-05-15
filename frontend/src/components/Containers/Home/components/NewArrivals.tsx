import { FC } from "react";

const NewArrivals: FC = () => {
  return (
    <div className="py-10 px-16 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-black uppercase cursor-default mb-5">
        new arrivals
      </h1>
      <div className="grid grid-col-1 xl:grid-cols-3 w-full gap-x-8 gap-y-5 xl:gap-y-0">
        <div className="flex flex-col items-center space-y-5 cursor-default">
          <img
            className="rounded-xl"
            src="./assets/img/new arrivals_1.png"
            alt=""
          />
          <h1 className="font-bold text-2xl uppercase">erigo parfume</h1>
          <p>
            Koleksi Perfume Erigo sebuah rahasia tampil beda dengan aroma yang
            menarik perhatian, pilih aroma yang sesuai dengan kepribadian dan
            penampilanmu.
          </p>
          <button className="bg-navy text-white rounded-lg px-3 py-1.5 text-xl font-semibold hover:scale-[1.2] transition-all ease-in-out duration-300 animate-bounce">
            Shop Now
          </button>
        </div>
        <img
          className="rounded-lg cursor-pointer"
          src="./assets/img/new arrivals_2.png"
          alt=""
        />
        <img
          className="rounded-lg cursor-pointer"
          src="./assets/img/new arrivals_3.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default NewArrivals;
