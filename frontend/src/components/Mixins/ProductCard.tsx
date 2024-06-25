import { FC } from "react";
import { Product } from "@/interfaces/product";
import Link from "next/link";

type Props = {
  data: Product[] | undefined;
  getData: () => void;
  isLoading: boolean;
};

const ProductCard: FC<Props> = ({ data, getData, isLoading }) => {
  return (
    <>
      {data && data?.length >= 1 ? (
        data?.map((a, i) => (
          <Link
            href={`/detail-product/${a.id}`}
            className="flex flex-col relative justify-center items-center custom-shadow rounded-lg py-5"
            key={i}
          >
            <div className="absolute top-0 left-0 bg-red rounded-tl-xl px-3 py-0.5 text-white">
              New
            </div>
            <img
              src={
                a?.pict
                  ? `http://127.0.0.1:8000/storage/app/pict/${a?.pict}`
                  : `https://ui-avatars.com/api/?name=${a?.product_name}`
              }
              className="w-3/4 rounded-lg mb-5"
              alt=""
            />
            <h1 className="font-semibold text-center text-xl mb-10">
              {a.product_name}
            </h1>
            <h1 className="font-bold text-xl">{a.price}</h1>
          </Link>
        ))
      ) : (
        <p className="text-center text-black sm:block">
          {isLoading ? "Loading..." : "No Data"}
        </p>
      )}
    </>
  );
};

export default ProductCard;
