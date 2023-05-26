import ToasterContext from './context/ToasterContext';
import './globals.css';
import AuthContext from './context/AuthContext';
import { UrlsContextProvider } from './context/UrlsProvider';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-gray-800'>
        <AuthContext>
          <UrlsContextProvider>
            <ToasterContext />
            {children}
          </UrlsContextProvider>
        </AuthContext>
      </body>
    </html>
  );
}

