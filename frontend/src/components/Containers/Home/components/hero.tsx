import { FC } from 'react';

const Hero: FC = () => {
  return (
    <div className="flex justify-center items-center">
    <img
        className="w-5/6 xl:h-[650px]"
        src="./assets/img/heroBanner.png"
        alt="Hero Banner"
    />
    </div>
  );
};

export default Hero;
