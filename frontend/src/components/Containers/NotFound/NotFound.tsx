import { FC } from 'react'

const ContainerNotFound: FC = () => {
  return (
    <div className="min-h-screen bg-red-500 flex flex-col items-center justify-center mx-auto">
      <img src="/assets/svg/not-found.svg" alt="image" className="w-96 h-96" />

      <div className="mt-[10px] flex items-center justify-center">
        <h2 className="text-navy text-[40px] font-bold leading-none">ERROR 404</h2>
      </div>

      <div className="mt-[10px] flex items-center justify-center">
        <h2 className="text-black text-[20px] font-medium">Page Not Found</h2>
      </div>

      <div className="mt-[10px] flex items-center justify-center">
        <h2 className="text-gray text-[15px] font-medium">Sorry, we couldn't find the page you were looking for</h2>
      </div>

      <div className="mt-[20px] flex items-center justify-center">
        <a href="/" className="px-5 py-2 bg-navy hover:bg-navy/90 transition-all ease-linear duration-300 rounded-lg text-white text-[15px] font-bold">Back To Home</a>
      </div>
    </div>
  )
}

export default ContainerNotFound