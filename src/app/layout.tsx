import ToasterContext from "./context/ToasterContext";
import "./globals.css";
import { UrlsContextProvider } from "./context/UrlsProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClerkProvider>
            <UrlsContextProvider>
              <ToasterContext />
              {children}
            </UrlsContextProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
