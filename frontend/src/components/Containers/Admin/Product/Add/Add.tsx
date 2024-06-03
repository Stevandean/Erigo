"use client";

import {
  FC,
  ChangeEventHandler,
  useCallback,
  useEffect,
  FormEvent,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import { Product } from "@/interfaces/product";
import { Categories } from "@/interfaces/categories";
import { isAxiosError, useAxios } from "@/hooks/useAxios";
import { errorToast, successToast } from "@/lib/toastNotify";
import { cn } from "@/lib/utils";
import AdminLayout from "@/layouts/AdminLayout";
import Breadcrumb from "@/components/Common/Breadcrumb";

const ContainerAdminAddProduct: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataCategories, setDataCategories] = useState<Categories[]>([]);
  const [data, setData] = useState<Product>({
    product_name: "",
    price: "",
    desc: "",
    size: "",
    stock: "",
    pict: "",
    categories_id: "",
  });

  const axios = useAxios();
  const router = useRouter();

  const getDataCategories = useCallback(async () => {
    const { data } = await axios.get("categories");
    setDataCategories(data.data);
  }, [axios]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // const sendData = {
    //   product_name: data.product_name,
    //   price: data.price,
    //   desc: data.desc,
    //   size: data.size,
    //   stock: data.stock,
    //   categories_id: data.categories_id,
    // };

    const formData = new FormData();
    formData.append("product_name", data.product_name);
    formData.append("price", data.price);
    formData.append("desc", data.desc);
    formData.append("size", data.size);
    formData.append("stock", data.stock);
    formData.append("categories_id", data.categories_id);
    formData.append("pict", data.pict);

    try {
      const { data } = await axios.post("product", formData);
      successToast(data.message);
      setIsLoading(false);

      setTimeout(() => {
        router.push("/admin/product");
      }, 1500);
    } catch (err) {
      setIsLoading(false);
      if (isAxiosError(err)) {
        console.log('Failed insert data');
        
        errorToast(err.response?.data?.message || "An error occurred");
      } else {
        errorToast("An unexpected error occurred");
      }
    }
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      console.log('foto');

      setData({
        ...data,
        pict: file,
      });
    }
  };

  useEffect(() => {
    getDataCategories();
  }, [getDataCategories]);

  return (
    <AdminLayout>
      <Breadcrumb pageName="Product" />

      <pre>{JSON.stringify(data, null, 2)}</pre>

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
                  onChange={(e) => setData({ ...data, price: e.target.value })}
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
                onChange={(e) => setData({ ...data, stock: e.target.value })}
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
              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                  value={data.categories_id}
                  onChange={(e) => {
                    setData({ ...data, categories_id: e.target.value });
                  }}
                  className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-navy/40 ${
                    data.categories_id ? "text-black" : ""
                  }`}
                >
                  <option
                    value=""
                    selected
                    disabled
                    className="text-body dark:text-bodydark"
                  >
                    Select Categories
                  </option>

                  {dataCategories.map((a, i) => (
                    <option
                      value={a.id}
                      className="text-body dark:text-bodydark"
                    >
                      {a.categories_name}
                    </option>
                  ))}
                </select>

                <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                  <svg
                    className="fill-current"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill=""
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
              {/* <input
                type="number"
                name="categories_id"
                id="categories_id"
                placeholder="Enter categories product"
                value={data.categories_id}
                onChange={(e) => setData({ ...data, stock: e.target.value })}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-navy/40"
              /> */}
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
