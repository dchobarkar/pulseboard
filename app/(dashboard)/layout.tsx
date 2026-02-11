import DashboardShell from "@/components/layout/DashboardShell";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardShell>{children}</DashboardShell>;
};

export default Layout;
