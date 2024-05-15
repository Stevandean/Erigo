import { FC } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import MainLayout from "@/layouts/MainLayout";
import Hero from "./components/hero";

const ContainerHome: FC = () => {
  return (
    <MainLayout>
      <section>
        <Hero />
      </section>
    </MainLayout>
  );
};

export default ContainerHome;
