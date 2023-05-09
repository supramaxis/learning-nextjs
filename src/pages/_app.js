import '@/styles/globals.css';
import { Itim } from 'next/font/google';
const itim = Itim({
  weight: '400',
  subsets: ['latin']
});
export default function App({ Component, pageProps }) {
  return (
    <main className={itim.className}>
      <Component {...pageProps} />
    </main>
  );
}

