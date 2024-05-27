"use client";

import { ChangeEventHandler } from "react";
import { FC, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { isAxiosError, useAxios } from "@/hooks/useAxios";
import { errorToast, successToast } from "@/lib/toastNotify";
import { cn } from "@/lib/utils";
import AdminLayout from "@/layouts/AdminLayout";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Product } from "@/interfaces/product";

const ContainerAdminAddProduct: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Product>({
    product_name: "",
    price: 0,
    desc: "",
    size: "",
    stock: 0,
    pict: "",
    categories_id: 0,
  });

  const axios = useAxios();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const sendData = { ...data };

    try {
      const { data } = await axios.post("product", sendData);
      successToast(data.message);
      setIsLoading(false);

      setTimeout(() => {
        router.push("/admin/product");
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

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];

      setData({
        ...data,
        pict: file,
      });
    }
  };

  return (
    <AdminLayout>
      <Breadcrumb pageName="Product" />

      <div className="rounded-sm border bg-white">
        <div className="border-b px-6 py-4 dark:border-strokedark">
          <h3 className="text-xl font-semibold text-black">Add New Product</h3>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="p-6">
            <div className="mb-4 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label
                  htmlFor="product_name"
                  className="mb-3 block text-sm font-medium text-black"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="product_name"
                  id="product_name"
                  placeholder="Enter product name"
                  value={data.product_name}
                  onChange={(e) =>
                    setData({ ...data, product_name: e.target.value })
                  }
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-navy/40"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label
                  htmlFor="price"
                  className="mb-3 block text-sm font-medium text-black"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Enter price product"
                  value={data.price}
                  //onChange={(e) => setData({ ...data, price: e.target.value })}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-navy/40"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="desc"
                className="mb-3 block text-sm font-medium text-black"
              >
                Description
              </label>
              <textarea
                rows={3}
                name="desc"
                id="desc"
                placeholder="Enter description product"
                value={data.desc}
                onChange={(e) => setData({ ...data, desc: e.target.value })}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-navy/40"
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="size"
                className="mb-3 block text-sm font-medium text-black"
              >
                Size
              </label>
              <input
                type="size"
                name="size"
                id="size"
                placeholder="Enter size product"
                value={data.size}
                onChange={(e) => setData({ ...data, size: e.target.value })}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-navy/40"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="stock"
                className="mb-3 block text-sm font-medium text-black"
              >
                Stock
              </label>
              <input
                type="number"
                name="stock"
                id="stock"
                placeholder="Enter stock product"
                value={data.stock}
                // onChange={(e) => setData({ ...data, stock: e.target.value })}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-navy/40"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="pict"
                className="mb-3 block text-sm font-medium text-black"
              >
                Photo
              </label>
              <input
                type="file"
                name="pict"
                id="pict"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full file:mr-2 file:py-3 file:px-4 file:rounded-l file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-gray hover:file:bg-slate-200 text-gray bg-slate-100/30 rounded"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="categories_id"
                className="mb-3 block text-sm font-medium text-black"
              >
                Categories
              </label>
              <input
                type="number"
                name="categories_id"
                id="categories_id"
                placeholder="Enter categories product"
                value={data.categories_id}
                // onChange={(e) => setData({ ...data, stock: e.target.value })}
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
              Create New Product
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ContainerAdminAddProduct;
