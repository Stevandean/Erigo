import { FC } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";

import { isAxiosError, useAxios } from "@/hooks/useAxios";
import { Product } from "@/interfaces/product";
import { errorToast, successToast } from "@/lib/toastNotify";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  data: Product[] | undefined;
  getData: () => void;
  isLoading: boolean;
};

const TableProduct: FC<Props> = ({ data, getData, isLoading }) => {
  const axios = useAxios();

  const handleDelete = async (id: number) => {
    try {
      const { data, status } = await axios.delete(`product/${id}`);
      successToast(data.message);

      if (status === 200) {
        getData();
      }
    } catch (err) {
      if (isAxiosError(err)) {
        errorToast(err.response?.data?.message || "An error occurred");
      } else {
        errorToast("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full mb-6">
        <thead className="rounded-sm bg-gray/10 dark:bg-blue-900">
          <tr>
            <th className="p-2 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                No
              </h5>
            </th>
            <th className="p-2 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Product Name
              </h5>
            </th>
            <th className="p-2 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Price
              </h5>
            </th>
            <th className="p-2 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Description
              </h5>
            </th>
            <th className="p-2 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Size
              </h5>
            </th>
            <th className="p-2 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Stock
              </h5>
            </th>
            <th className="p-2 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Action
              </h5>
            </th>
          </tr>
        </thead>

        <tbody>
          {data && data?.length >= 1 ? (
            data?.map((a, i) => (
              <tr
                className={`${
                  i === data?.length - 1
                    ? ""
                    : "border-b border-stroke dark:border-strokedark"
                }`}
                key={i}
              >
                <td className="p-2 xl:p-5">
                  <span className="flex justify-center">{i + 1}</span>
                </td>

                <td className="p-2 xl:p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <img
                        src={
                          a?.pict
                            ? `http://localhost:8000/storage/pict/${a.pict}`
                            : `https://ui-avatars.com/api/?name=${a?.product_name}`
                        }
                        alt="Avatar"
                        width={50}
                        height={50}
                        className="bg-center bg-cover rounded-lg"
                      />
                    </div>
                    <p className="text-black">{a?.product_name}</p>
                  </div>
                </td>

                <td className="p-2 xl:p-5">
                  <p className="text-center text-black">{a?.price}</p>
                </td>

                <td className="p-2 xl:p-5">
                  <p className="text-center text-black">{a?.desc}</p>
                </td>

                <td className="p-2 xl:p-5">
                  <p className="text-center text-black">{a?.size}</p>
                </td>

                <td className="p-2 xl:p-5">
                  <p className="text-center text-black">{a?.stock}</p>
                </td>

                <td className="p-2 xl:p-5">
                  <div className="flex items-center justify-center gap-3">
                    <Link
                      href={`/admin/product/${a?.id}`}
                      className="flex items-center justify-center bg-yellow px-3 py-2 rounded-lg w-auto"
                    >
                      <FaEdit className="text-white" />
                    </Link>

                    <AlertDialog>
                      <AlertDialogTrigger className="flex items-center justify-center bg-red px-3 py-2 rounded-lg w-auto">
                        <FaTrash className="text-white" />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your data from servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => a?.id && handleDelete(a.id)}
                            className="bg-navy hover:bg-navy/90 dark:bg-blue-900 dark:hover:bg-blue-900/90 dark:text-white"
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="p-2 xl:p-5 dark:bg-slate-100">
                <p className="text-center text-black sm:block">
                  {isLoading ? "Loading..." : "No Data"}
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableProduct;
