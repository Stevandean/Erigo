import { FC } from "react";

import MainLayout from "@/layouts/MainLayout";
import UserSettings from "./components/UserSettings";

const ContainerProfileSettings: FC = () => {
  return (
    <MainLayout>
      <section className="min-h-full">
        <h1 className="text-2xl font-extrabold p-10 uppercase">
          Profile Settings
        </h1>

        <UserSettings />
      </section>
    </MainLayout>
  );
};

export default ContainerProfileSettings;
