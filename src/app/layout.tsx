import "./globals.css";
import ToasterContext from "./context/ToasterContext";
import { UrlsContextProvider } from "./context/UrlsProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Nexjs + Clerk + Prisma",
  description: "A Nextjs + Clerk + Prisma Project",
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
