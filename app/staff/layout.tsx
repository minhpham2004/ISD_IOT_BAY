import { Navbar, NavLink } from "@/components/Navbar";

export default function StaffLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar>
        <NavLink href="/staff">Dashboard</NavLink>
        <NavLink href="/staff/products">Products</NavLink>
        <NavLink href="/staff/users">Manage Users</NavLink>
      </Navbar>
      <div className="container my-6">{children}</div>
    </>
  );
}
