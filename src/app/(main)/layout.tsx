import Footer from "@/components/widgets/Footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
         {children}
         <Footer />
    </>
         
      
  );
}
