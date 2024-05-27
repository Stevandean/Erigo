"use client";

import {
  ChangeEventHandler,
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useParams, useRouter } from "next/navigation";

import { isAxiosError, useAxios } from "@/hooks/useAxios";
import { User } from "@/interfaces/user";
import { errorToast, successToast } from "@/lib/toastNotify";
import { cn } from "@/lib/utils";
import AdminLayout from "@/layouts/AdminLayout";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Product } from "@/interfaces/product";

const ContainerAdminEditProduct: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<Product>({
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
  const { id } = useParams();

  const getDataUser = useCallback(async () => {
    try {
      const { data } = await axios.get(`product/${id}`);
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
      product_name: dataUpdate.product_name,
      price: dataUpdate.price,
      desc: dataUpdate.desc,
      size: dataUpdate.size,
      stock: dataUpdate.stock,
      categories_id: dataUpdate.categories_id,
    };

    try {
      const { data, status } = await axios.put(`product/${id}`, sendData);

      if (status === 200) {
        if (dataUpdate.pict) {
          const formData = new FormData();
          formData.append("pict", dataUpdate.pict);

          const { status } = await axios.post(
            `product/updateimage/${id}`,
            formData
          );

          if (status === 200) {
            setIsLoading(false);
            successToast(data.message);

            setTimeout(() => {
              router.push("/admin/product");
            }, 1500);
          } else {
            errorToast("Failed to update image");
          }
        }
      }
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

      setDataUpdate({
        ...dataUpdate,
        pict: file,
      });
    }
  };

  useEffect(() => {
    getDataUser();
  }, [getDataUser]);

  return (
    <AdminLayout>
      <Breadcrumb pageName="Product" />

      <div className="rounded-sm border bg-white">
        <div className="border-b px-6 py-4 dark:border-strokedark">
          <h3 className="text-xl font-semibold text-black">Update Product</h3>
        </div>
        <form onSubmit={handleSubmit}>
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
                  value={dataUpdate.product_name}
                  onChange={(e) =>
                    setDataUpdate({ ...dataUpdate, product_name: e.target.value })
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
                  type="text"
                  name="price"
                  id="price"
                  placeholder="Enter price product"
                  value={dataUpdate.price}
                  onChange={(e) =>
                    setDataUpdate({ ...dataUpdate, price: e.target.value })
                  }
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
                value={dataUpdate.desc}
                onChange={(e) =>
                  setDataUpdate({ ...dataUpdate, desc: e.target.value })
                }
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
                value={dataUpdate.size}
                onChange={(e) =>
                  setDataUpdate({ ...dataUpdate, size: e.target.value })
                }
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-navy/40"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="stock"
                className="mb-3 block text-sm font-medium text-black"
              >
                Stock
              </label>
              <input
                type="stock"
                name="stock"
                id="stock"
                placeholder="Enter stock product"
                value={dataUpdate.stock}
                onChange={(e) =>
                  setDataUpdate({ ...dataUpdate, stock: e.target.value })
                }
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
                categories_id <span className="text-meta-1">*</span>
              </label>
              <input
                type="categories_id"
                name="categories_id"
                id="categories_id"
                placeholder="Enter categories product"
                value={dataUpdate.categories_id}
                onChange={(e) =>
                  setDataUpdate({ ...dataUpdate, categories_id: e.target.value })
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

export default ContainerAdminEditProduct;
