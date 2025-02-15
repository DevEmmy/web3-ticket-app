import Footer from "@/components/widgets/Footer";
import Nav from "@/components/widgets/Nav";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Nav />
         {children}
         <Footer />
    </>
         
      
  );
}
