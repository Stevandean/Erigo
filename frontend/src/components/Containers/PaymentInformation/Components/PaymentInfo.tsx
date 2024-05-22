import { FC } from 'react'

const PaymentInfo: FC = () => {
  return (
    <section className="h-50 mb-10">
        <h1 className="text-2xl font-extrabold p-10 uppercase">Payment Information</h1>
        <div className="flex flex-col lg:flex-row mb-[100px] px-20">
          <div className="w-full lg:w-1/2">
            <h2 className="text-xl font-bold uppercase">E-wallet</h2>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-[50px] mt-[50px]">
              <div className="border-[3px] border-[#F2F2F2] rounded-md w-28 h-28 p-3">
                <img className="flex items-center justify-center mt-2" src="/assets/img/dana-logo.png" alt="Dana Logo" />
              </div>
              <div className="border-[3px] border-[#F2F2F2] rounded-md w-28 h-28 p-3">
                <img className="flex items-center justify-center mt-7" src="/assets/img/ShopeePay.png" alt="ShopeePay Logo" />
              </div>
              <div className="border-[3px] border-[#F2F2F2] rounded-md w-28 h-28 p-3">
                <img className="flex items-center justify-center mt-7" src="/assets/img/TrueMoney-logo.png" alt="TrueMoney Logo" />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-[50px] mt-[30px]">
              <div className="border-[3px] border-[#F2F2F2] rounded-md w-28 h-28">
                <img className="flex items-center justify-center mt-1" src="/assets/img/gopay-logo.png" alt="Gopay Logo" />
              </div>
              <div className="border-[3px] border-[#F2F2F2] rounded-md w-28 h-28 p-3">
                <img className="flex items-center justify-center mt-1" src="/assets/img/astrapay-logo.png" alt="Astrapay Logo" />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 p-30">
            <h1 className="font-bold">What payment methods can I use to make purchases?</h1>
            <p>We offer the following methods of payment: E-Wallet</p>
            <h1 className="font-bold mt-[25px]">Can I get an invoice in my company's name?</h1>
            <p>
              Yes. You just need to tick the "COMPANY" box in the personal information section and enter the
              tax information requested.
            </p>
            <h1 className="font-bold mt-[25px]">What should I do if I see a double charge for an order?</h1>
            <p>In this event, please contact our Customer Service department.</p>
            <h1 className="font-bold mt-[25px]">Can I pay in the store when I receive the order?</h1>
            <p>
              In order to complete the order, payment must be made online and it is not possible to pay in the
              store when you receive the order. However, you have the option to try on the items in the store
              when you pick up your order and return any items with which you are unhappy.
            </p>
          </div>
        </div>
      </section>
  )
}

export default PaymentInfo