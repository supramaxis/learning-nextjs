// 'use client';

import Link from 'next/link';
import { MdOutlineMenu } from 'react-icons/md';

function Layout() {
  // const [toggleMenu, setToggleMenu] = useState(false);
  // const [screenWidth, setScreenWidth] = useState(0);

  // const handleToggleMenu = () => {
  //   setToggleMenu(!toggleMenu);
  // };

  // useEffect(() => {
  //   const changeWidth = () => {
  //     setScreenWidth(window.innerWidth);
  //   };
  //   window.addEventListener('resize', changeWidth);

  //   return () => {
  //     window.removeEventListener('resize', changeWidth);
  //   };
  // }, []);

  return (
    <>
      <div className='navContainer'>
        <nav>
          <ul className='list'>
            <li>
              <Link href='/' className='navLinks'>
                Home
              </Link>
            </li>
            <li>
              <Link href='/animegen' className='navLinks'>
                Anime Gif
              </Link>
            </li>
            <li>
              <Link href='/placeholder' className='navLinks'>
                Placeholder
              </Link>
            </li>
            <li>
              <Link href='/fact' className='navLinks'>
                Fact
              </Link>
            </li>
            <li>
              <Link href='/jokes' className='navLinks'>
                Jokes
              </Link>
            </li>
            <li>
              <Link href='/pokemon' className='navLinks'>
                Pokemons API
              </Link>
            </li>
            <li>
              <Link href='/minecraft' className='navLinks'>
                Minecraft API
              </Link>
            </li>
            <li>
              <Link href='/giveaways' className='navLinks'>
                Giveaways API
              </Link>
            </li>
            <li>
              <Link href='/downloader' className='navLinks'>
                YTDownloader
              </Link>
            </li>
          </ul>

          <button className='navBtn'>
            <MdOutlineMenu />
          </button>
        </nav>
      </div>
    </>
  );
}

export default Layout;

