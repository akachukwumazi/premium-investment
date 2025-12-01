import DashboardShell from "./dashboard-shell";  // client wrapper (shown below)

export const metadata = {
  title: "Dashboard | Premium Invest",
};

export default function DashboardLayout({ children }) {
  return (
    <DashboardShell>
      {children}
    </DashboardShell>
  );
}
