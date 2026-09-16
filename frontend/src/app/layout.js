import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "Nexara - Buy. Sell. Source.",
  description: "The premium marketplace connecting shoppers, sellers and factories.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.className} style={{backgroundColor: '#0A0F1E', margin: 0, padding: 0}}>
        {children}
      </body>
    </html>
  );
}