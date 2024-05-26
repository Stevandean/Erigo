import { FC } from 'react'

const YourPurchase: FC = () => {
    return (
        <div className="relative bg-white rounded-xl px-5 py-6 xl:w-full max-w-screen-lg w-full mt-10 mx-auto"
            style={{ alignSelf: 'flex-start' }}>
            <h1 className="text-[17px] font-bold ml-4 uppercase">Your Purchase</h1>

            <div className="grid grid-cols-5">
                <div className="col-span-1">
                    <h1 className="text-[15px] font-medium ml-4">Product</h1>
                </div>

                <div className="col-span-2">
                    <div className="flex flex-col items-start">
                        <h1 className="text-black text-base font-semibold">Erigo T-Shirt Basic Olive White Unisex</h1>
                        <p className="text-gray text-sm font-normal">Size : XL</p>
                    </div>

                    <div className="flex flex-col items-start mt-2">
                        <h1 className="text-black text-base font-semibold">Erigo Chino Pants Sirius Black</h1>
                        <p className="text-gray text-sm font-normal">Size : 32</p>
                    </div>
                </div>

                <div className="col-span-2">
                    <div className="flex items-center justify-evenly">
                        <div className="flex flex-col items-start">
                            <h1 className="text-[15px] font-medium ml-4">Payment Method</h1>
                            <h1 className="text-[15px] font-medium ml-4">Total</h1>
                        </div>

                        <div className="flex flex-col items-start">
                            <img src="./assets/img/qris.jpg" alt="payment_method" className="w-auto h-10" />
                            <p className="text-black text-base font-semibold">Rp.750.000</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default YourPurchase;