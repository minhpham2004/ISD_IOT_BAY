import { Navbar, NavLink } from "@/components/Navbar";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar>
        <NavLink href="/Home">Home</NavLink>
        <NavLink href="/CurrentOrderPage">Your current order</NavLink>
        <NavLink href="/profile">Your Profile</NavLink>
        <NavLink href="/payment">Payment</NavLink>
      </Navbar>
      <div className="container my-6">{children}</div>
    </>
  );
}
