import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";

// const inter = Inter({ subsets: ['latin'] });
const inter = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Welcome to Erigo Store!",
  description:
    "Welcome to Erigo Store! Discover the latest in fashion and accessories at Erigo Store, your ultimate destination for trendy and affordable styles. Whether you're looking for casual wear, business attire, or something for a special occasion, Erigo Store has it all.",
  openGraph: {
    url: "http://localhost:3000/",
    type: "website",
    siteName: "Erigo Store",
    description:
      "Welcome to Erigo Store! Discover the latest in fashion and accessories at Erigo Store, your ultimate destination for trendy and affordable styles. Whether you're looking for casual wear, business attire, or something for a special occasion, Erigo Store has it all.",
    title: "Welcome to Erigo Store!",
  },
  twitter: {
    card: "summary_large_image",
    site: "Erigo Store",
    title: "Welcome to Erigo Store!",
    description:
      "Welcome to Erigo Store! Discover the latest in fashion and accessories at Erigo Store, your ultimate destination for trendy and affordable styles. Whether you're looking for casual wear, business attire, or something for a special occasion, Erigo Store has it all.",
    images: "some_image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* navbar */}

        {/* toast container */}
        <ToastContainer />

        {/* scroll to top */}

        {children}

        {/* footer */}
      </body>
    </html>
  );
}
