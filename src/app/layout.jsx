import "./globals.css";
import ClientWrapper from "../components/ClientWrapper";

export const metadata = {
  title: "Kinetic Next",
  description: "Premium Streetwear E-commerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0" />
      </head>
      <body className="antialiased">
        <ClientWrapper>
          <div className="film-grain"></div>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
