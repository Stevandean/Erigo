import { FC } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";

import { isAxiosError, useAxios } from "@/hooks/useAxios";
import { User } from "@/interfaces/user";
import { errorToast, successToast } from "@/lib/toastNotify";
import { Badge } from "@/components/ui/badge";
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
  data: User[] | undefined;
  getData: () => void;
  isLoading: boolean;
};

const TableUser: FC<Props> = ({ data, getData, isLoading }) => {
  const axios = useAxios();

  const handleDelete = async (id: number) => {
    try {
      const { data, status } = await axios.delete(`users/${id}`);
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
                Name
              </h5>
            </th>
            <th className="p-2 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Address
              </h5>
            </th>
            <th className="p-2 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Phone
              </h5>
            </th>
            <th className="p-2 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Email
              </h5>
            </th>
            <th className="p-2 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Role
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
                <td className="p-2 xl:p-5">{i + 1}</td>

                <td className="p-2 xl:p-5">
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex-shrink-0">
                      <img
                        src={
                          a?.pict
                            ? `http://127.0.0.1:8000/storage/user/${a?.pict}`
                            : `https://ui-avatars.com/api/?name=${a?.name}`
                        }
                        alt="Avatar"
                        width={50}
                        height={50}
                        className="bg-center bg-cover rounded-full"
                      />
                    </div>
                    <p className="text-black">{a?.name}</p>
                  </div>
                </td>

                <td className="p-2 xl:p-5">
                  <p className="text-center text-black">{a?.address}</p>
                </td>

                <td className="p-2 xl:p-5">
                  <p className="text-center text-black">{a?.phone}</p>
                </td>

                <td className="p-2 xl:p-5">
                  <p className="text-center text-black">{a?.email}</p>
                </td>

                <td className="p-2 xl:p-5">
                  <div className="flex items-center justify-center">
                    <Badge className="capitalize bg-blue-500 hover:bg-blue-500 dark:text-white">
                      {a?.role}
                    </Badge>
                  </div>
                </td>

                <td className="p-2 xl:p-5">
                  <div className="flex items-center justify-center gap-3">
                    <Link
                      href={`/admin/user/${a?.id}`}
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

export default TableUser;
