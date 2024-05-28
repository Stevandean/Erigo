"use client";

import { FC, FormEvent, useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { isAxiosError, useAxios } from "@/hooks/useAxios";
import { Categories } from "@/interfaces/categories";
import { errorToast, successToast } from "@/lib/toastNotify";
import { cn } from "@/lib/utils";
import AdminLayout from "@/layouts/AdminLayout";
import Breadcrumb from "@/components/Common/Breadcrumb";

const ContainerAdminEditCategories: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<Categories>({
    categories_name: "",
  });

  const axios = useAxios();
  const router = useRouter();
  const { id } = useParams();

  const getDataCategories = useCallback(async () => {
    try {
      const { data } = await axios.get(`categories/${id}`);
      setDataUpdate(data.data);
    } catch (err) {
      if (isAxiosError(err)) {
        errorToast(err.response?.data?.message || "An error occurred");
      } else {
        errorToast("An unexpected error occurred");
      }
    }
  }, [axios]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const sendData = {
      categories_name: dataUpdate.categories_name,
    };

    try {
      const { data } = await axios.put(`categories/${id}`, sendData);
      successToast(data.message);

      setTimeout(() => {
        router.push("/admin/categories");
      }, 1500);
    } catch (err) {
      setIsLoading(false);
      if (isAxiosError(err)) {
        errorToast(err.response?.data?.message || "An error occurred");
      } else {
        errorToast("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    getDataCategories();
  }, [getDataCategories]);

  return (
    <AdminLayout>
      <Breadcrumb pageName="Categories" />

      <div className="rounded-sm border bg-white">
        <div className="border-b px-6 py-4 dark:border-strokedark">
          <h3 className="text-xl font-semibold text-black">Update User</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="mb-6">
              <label
                htmlFor="categoriesName"
                className="mb-3 block text-sm font-medium text-black"
              >
                Categories Name <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                name="categoriesName"
                id="categoriesName"
                placeholder="Enter your category"
                value={dataUpdate.categories_name}
                onChange={(e) =>
                  setDataUpdate({
                    ...dataUpdate,
                    categories_name: e.target.value,
                  })
                }
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-navy/40"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading ? true : false}
              className={cn(
                isLoading ? "cursor-not-allowed" : "cursor-pointer",
                "flex w-full justify-center rounded bg-navy dark:bg-blue-900 p-3 font-medium text-white hover:bg-navy/90 dark:hover:bg-blue-900/90"
              )}
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ContainerAdminEditCategories;
