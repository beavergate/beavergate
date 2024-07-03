import Footer from "@/components/footer";
import Header from "@/components/Header";
import Navbar from "@/components/navbar";
import SubHeader from "@/components/SubHeader";
import HomePage from "./page";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
