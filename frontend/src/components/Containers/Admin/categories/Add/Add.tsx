"use client";

import { FC, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { isAxiosError, useAxios } from "@/hooks/useAxios";
import { Categories } from "@/interfaces/categories";
import { errorToast, successToast } from "@/lib/toastNotify";
import { cn } from "@/lib/utils";
import AdminLayout from "@/layouts/AdminLayout";
import Breadcrumb from "@/components/Common/Breadcrumb";

const ContainerAdminAddCategories: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Categories>({
    categories_name: "",
  });

  const axios = useAxios();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const sendData = { ...data };

    try {
      const { data } = await axios.post("categories", sendData);
      successToast(data.message);
      setIsLoading(false);

      setTimeout(() => {
        router.push("/admin/categories");
      });
    } catch (err) {
      setIsLoading(true);
      if (isAxiosError(err)) {
        errorToast(err.response?.data?.message || "An error occurred");
      } else {
        errorToast("An unexpected error occurred");
      }
    }
  };

  return (
    <AdminLayout>
      <Breadcrumb pageName="Categories" />

      <div className="rounded-sm border bg-white">
        <div className="border-b px-6 py-4 dark:border-strokedark">
          <h3 className="text-xl font-semibold text-black">Add New Categories</h3>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="p-6">
            <div className="mb-6">
              <label
                htmlFor="categoriesName"
                className="mb-3 block text-sm font-medium text-black"
              >
                Categories Name
              </label>
              <input
                type="text"
                name="categoriesName"
                id="categoriesName"
                placeholder="Enter categories name"
                value={data.categories_name}
                onChange={(e) =>
                  setData({ ...data, categories_name: e.target.value })
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
              Create New Categories
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ContainerAdminAddCategories;
