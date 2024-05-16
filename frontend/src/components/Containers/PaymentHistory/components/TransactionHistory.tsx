import { FC } from "react";

const TransactionHistory: FC = () => {
  return (
    <div className="min-h-full p-10">
      <h1 className="text-black text-2xl font-extrabold place-items-end p-[5px] ml-[17px] uppercase">
        transaction history
      </h1>
      <div className="flex justify-center items-center p-5">
        <table className="shadow-md sm:rounded-lg table-auto w-3/4 flex-col text-xs overflow-scroll">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Transaction No.</th>
              <th className="px-6 py-3 text-left">Product Detail</th>
              <th className="px-6 py-3 text-left">Quantity</th>
              <th className="px-6 py-3 text-left">Subtotal</th>
              <th className="px-6 py-3 text-left">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-[#E5DEDE] even:bg-white">
              <td className="px-6 py-3 font-bold">01/04/2004</td>
              <td className="px-6 py-3 font-bold">ERG001042024001</td>
              <td className="px-6 py-3 font-bold">Erigo T-Shirt...</td>
              <td className="px-6 py-3 font-bold">1</td>
              <td className="px-6 py-3 font-bold">Rp. 250.000</td>
              <td className="px-6 py-3 font-bold">shopeepay</td>
            </tr>
            <tr>
              <td className="px-6 py-3 font-bold">01/04/2004</td>
              <td className="px-6 py-3 font-bold">ERG001042024001</td>
              <td className="px-6 py-3 font-bold">Erigo Short...</td>
              <td className="px-6 py-3 font-bold">2</td>
              <td className="px-6 py-3 font-bold">Rp. 700.000</td>
              <td className="px-6 py-3 font-bold">Dana</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
