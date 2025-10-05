import React from "react";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
}: MainLayoutProps) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
