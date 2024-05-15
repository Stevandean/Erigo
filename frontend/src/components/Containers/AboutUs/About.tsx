import { FC } from "react";

import MainLayout from "@/layouts/MainLayout";

const ContainerAbout: FC = () => {
  return (
    <>
      <MainLayout>
        <section className="mx-auto">
          <div className="w-full px-20">
            <div className="flex flex-wrap">
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                  <div className="h-64 md:h-auto overflow-hidden flex justify-center items-center">
                    <img
                      src="./assets/img/about-us.jpg"
                      loading="lazy"
                      alt="Laptop"
                      className="shadow-lg rounded-lg object-cover object-center"
                    />
                  </div>

                  <div className="md:pt-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center md:text-left mb-4 md:mb-6">
                      Express Yourself with Erigo,
                      <br />
                      Elevate Your Style.
                    </h1>

                    <span className="font-semibold text-xl">About Us</span>
                    <p className="sm:text-lg mt-7 mb-6 md:mb-8 text-justify">
                      Erigo adalah merk fashion Indonesia yang didirikan pada tahun 2011 oleh Muhammad Sadad. Merk ini dikenal karena koleksi pakaian casual dan streetwear-nya yang modern dan stylish. Erigo menawarkan berbagai macam pakaian seperti kaus, kemeja, celana, jaket, dan aksesoris yang cocok untuk gaya sehari-hari dan tampilan santai.
                    </p>
                    <p className="sm:text-lg mb-6 md:mb-8 text-justify">
                      Ciri khas Erigo adalah desainnya yang menggabungkan unsur minimalis dengan sentuhan kreatif, serta penggunaan bahan berkualitas tinggi. Merk ini juga dikenal karena harga yang terjangkau dan kualitas produknya yang baik. Erigo memiliki berbagai koleksi yang mengikuti trend fashion terkini, sehingga menjadi favorit di kalangan anak muda.
                    </p>
                    <p className="sm:text-lg mb-6 md:mb-8 text-justify">
                      Selain itu, Erigo juga aktif berkolaborasi dengan berbagai seniman, desainer, dan tokoh terkenal untuk menciptakan koleksi-koleksi eksklusif. Merk ini telah memiliki toko fisik di beberapa kota besar di Indonesia dan juga menjual produknya secara online.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default ContainerAbout;
