import { FC } from "react";

const ProductInfromation: FC = () => {
  return (
    <div className="space-y-3">
      <span className="text-xl font-semibold">Payment</span>
      <div className="flex flex-col bg-[#F7F9FC] rounded-xl py-10 px-20">
        <div className="flex space-x-10">
          <span className="font-semibold mt-0.5">Product</span>
          <table className="table-fixed w-full">
            <tbody>
              <tr className="font-semibold text-lg flex flex-row justify-between items-start">
                <td className="w-[40%] flex justify-start">
                  <div className="flex flex-col">
                    <span>Erigo T-Shirt Basic Olive White Unisex</span>
                    <span className="text-gray text-base font-normal mb-5">
                      Size : XL
                    </span>
                  </div>
                </td>
                <td className="w-[20%] flex justify-center">
                  <span>x1</span>
                </td>
                <td className="w-[40%] flex justify-end">
                  <span>Rp. 250.000</span>
                </td>
              </tr>
              <tr className="font-semibold text-lg flex flex-row items-start">
                <td className="w-[40%] flex justify-start">
                  <div className="flex flex-col">
                    <span>Erigo Chino Pants Sirius Black</span>
                    <span className="text-gray text-base font-normal mb-5">
                      Size : 32
                    </span>
                  </div>
                </td>
                <td className="w-[20%] flex justify-center">
                  <span>x1</span>
                </td>
                <td className="w-[40%] flex justify-end">
                  <span>Rp. 500.000</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr className="border w-full border-[#757575]" />
        <div className="flex justify-between mt-3 text-lg">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">Rp. 750.000</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfromation;
