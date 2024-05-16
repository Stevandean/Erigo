import { FC } from "react";
import { Metadata } from "next";

import ContainerRegister from "@/components/Containers/Auth/Register";

export const metadata: Metadata = {
  title: "Register | Erigo Store",
  description:
    "Welcome to Erigo Store! Discover the latest in fashion and accessories at Erigo Store, your ultimate destination for trendy and affordable styles. Whether you're looking for casual wear, business attire, or something for a special occasion, Erigo Store has it all.",
  openGraph: {
    url: "http://localhost:3000/",
    description:
      "Welcome to Erigo Store! Discover the latest in fashion and accessories at Erigo Store, your ultimate destination for trendy and affordable styles. Whether you're looking for casual wear, business attire, or something for a special occasion, Erigo Store has it all.",
    title: "Welcome to Erigo Store!",
  },
  twitter: {
    title: "Welcome to Erigo Store!",
    description:
      "Welcome to Erigo Store! Discover the latest in fashion and accessories at Erigo Store, your ultimate destination for trendy and affordable styles. Whether you're looking for casual wear, business attire, or something for a special occasion, Erigo Store has it all.",
  },
};

const Register: FC = () => {
  return <ContainerRegister />;
};

export default Register;
