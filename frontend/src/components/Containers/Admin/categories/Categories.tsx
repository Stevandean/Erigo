"use client";

import { FC, useCallback, useEffect, useState } from "react";
import Link from "next/link";

import { Categories } from "@/interfaces/categories";
import { isAxiosError, useAxios } from "@/hooks/useAxios";
import { errorToast } from "@/lib/toastNotify";
import AdminLayout from "@/layouts/AdminLayout";
import Breadcrumb from "@/components/Common/Breadcrumb";
import TableCategories from "./components/Table";

const ContainerAdminCategies: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Categories[]>();

  const axios = useAxios();

  const getData = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.get("categories");
      setIsLoading(false);
      setData(data.data);
    } catch (err) {
      if (isAxiosError(err)) {
        errorToast(err.response?.data?.message || "An error occurred");
      } else {
        errorToast("An unexpected error occurred");
      }
    }
  }, [axios]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <AdminLayout>
      <Breadcrumb pageName="Category" />

      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black">
          All Categories
        </h4>

        <TableCategories data={data} getData={getData} isLoading={isLoading} />

        <div className="flex items-end justify-end mb-6">
          <Link
            href="/admin/categories/add"
            className="bg-navy dark:bg-blue-900 hover:bg-navy/90 dark:hover:bg-blue-900/90 text-white px-3 py-2 rounded-lg transition-all duration-200 ease-linear"
          >
            Add new category
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContainerAdminCategies;
