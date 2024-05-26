import { FC } from 'react'

const QrCode: FC = () => {
    return (
        <div className="container flex flex-col items-center justify-center mx-auto my-[50px]">
        <div className="flex items-center justify-center gap-14">
            <h3 className="text-xl font-medium text-white">Silakan selesaikan pembayaran Anda dalam</h3>
            <span className="text-xl font-medium text-white">0:15:09</span>
        </div>

        <div className="mt-[30px]">
            <h3 className="max-w-lg text-xl font-medium text-white">
                Buka m-banking atau e-Wallet dan pindai kode QR untuk
                menyelesaikan pembayaran
            </h3>
        </div>

        <div className="mt-[50px]">
            <h3 className="text-3xl font-bold text-white">Pindai Kode QR</h3>
        </div>

        <div className="mt-[50px]">
            <img src="./assets/img/barcode.jpeg" alt="barcode" className="w-[360px] h-[330px] rounded-lg" />
        </div>

        <div className="mt-[70px]">
            <p className="max-w-xs text-base text-center font-normal text-white">
                Mohon diingat bahwa kode QR hanya
                dapat dipindai sekali untuk
                mencegah saldo terpotong dua kali
            </p>
        </div>
    </div>
    )
}

export default QrCode;