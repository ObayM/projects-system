import { Poppins } from "next/font/google";
import "./globals.css";
import { getUserInfo } from "@/components/auth/getUserInfo";
import { AuthProvider } from "@/components/auth/AuthProvider";
import Navbar from "@/components/navbar";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"]
});


export const metadata = {
  title: "Projects management app",
  description: "Created by Obay",
};

export default async function RootLayout({ children }) {

  const user = await getUserInfo();

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <AuthProvider initialUser={user}>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
      
    </html>
  );
}
