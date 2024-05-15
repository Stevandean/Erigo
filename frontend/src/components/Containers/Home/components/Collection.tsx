import { FC } from "react";

const Collection: FC = () => {
  return (
    <div className="py-10 px-16 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-black uppercase cursor-default mb-5">
        collections
      </h1>
      <div className="grid grid-cols-1 xl:grid-cols-3 w-full gap-x-8 gap-y-5 xl:gap-y-0">
        <img
          className="rounded-lg cursor-pointer"
          src="./assets/img/collections_1.png"
          alt=""
        />
        <img
          className="rounded-lg cursor-pointer"
          src="./assets/img/collections_2.png"
          alt=""
        />
        <img
          className="rounded-lg cursor-pointer"
          src="./assets/img/collections_3.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Collection;
