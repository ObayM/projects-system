import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"]
});


export const metadata = {
  title: "Projects management app",
  description: "Created by Obay",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
