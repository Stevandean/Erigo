import { FC } from "react";

const UserSettings: FC = () => {
  return (
    <form className="w-full flex flex-col justify-center items-center space-y-8">
      <div className="flex flex-col w-5/6 xl:w-2/4 space-y-3">
        <span className="font-semibold">Photo</span>
        <input type="file" id="pict" accept="image/*" placeholder="Enter your email address" className="w-full file:mr-2 file:py-3 file:px-4 file:rounded-l file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-gray hover:file:bg-slate-200 text-gray bg-slate-100/30 rounded border border-black" name="pict" value="" />
      </div>
      <div className="flex flex-col w-5/6 xl:w-2/4 space-y-1">
        <span className="font-semibold">Name</span>
        <input
          className="border bg-white rounded-md h-[30px] px-5 border-navy"
          type="text"
        />
      </div>
      <div className="flex flex-col w-5/6 xl:w-2/4 space-y-3">
        <span className="font-semibold">Address</span>
        <textarea className="border bg-white rounded-md h-[50px] px-5 border-navy" typeof="text" />
      </div>
      <div className="flex flex-col w-5/6 xl:w-2/4 space-y-3">
        <span className="font-semibold">Region</span>
        <input
          className="border bg-white rounded-md h-[30px] px-5 border-navy"
          type="text"
        />
      </div>
      <div className="flex flex-col w-5/6 xl:w-2/4 space-y-3">
        <span className="font-semibold">Postal Code</span>
        <input
          className="border bg-white rounded-md h-[30px] px-5 border-navy"
          type="text"
          maxLength={6}
          size={6}
        />
      </div>
      <div className="flex flex-col w-5/6 xl:w-2/4 space-y-3">
        <span className="font-semibold">Phone</span>
        <input
          className="border bg-white rounded-md h-[30px] px-5 border-navy"
          type="text"
        />
      </div>
      <div className="flex flex-col w-5/6 xl:w-2/4 space-y-3">
        <span className="font-semibold">Email Address</span>
        <input
          className="border bg-white rounded-md h-[30px] px-5 border-navy"
          type="email"
        />
      </div>
      <div className="flex flex-col w-5/6 xl:w-2/4 space-y-3">
        <span className="font-semibold">Password</span>
        <input
          className="border bg-white rounded-md h-[30px] px-5 border-navy"
          type="password"
        />
      </div>
      <div className="flex flex-col w-5/6 xl:w-2/4 space-y-3">
        <span className="font-semibold">Confirm Password</span>
        <input
          className="border bg-white rounded-md h-[30px] px-5 border-navy"
          type="password"
        />
      </div>
      <div className="flex justify-end w-5/6 xl:w-2/4">
        <button className="bg-navy text-white font-bold text-lg py-1 px-3 rounded-md w-20 flex-col items-center justify-center mb-[30px]">
          Save
        </button>
      </div>
    </form>
  );
};

export default UserSettings;
