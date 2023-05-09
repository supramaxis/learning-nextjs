// 'use client';
import Squiggle from '../components/Squiggle';
import Link from 'next/link';

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
              <Link href='/placeholder' className='navLinks'>
                Placeholder
              </Link>
            </li>
            <li>
              <Link href='/placeholder' className='navLinks'>
                Placeholder
              </Link>
            </li>
            <li>
              <Link href='/placeholder' className='navLinks'>
                Placeholder
              </Link>
            </li>
            <li>
              <Link href='/placeholder' className='navLinks'>
                Placeholder
              </Link>
            </li>
            <li>
              <Link href='/placeholder' className='navLinks'>
                Placeholder
              </Link>
            </li>
            <li>
              <Link href='/placeholder' className='navLinks'>
                Placeholder
              </Link>
            </li>
            <li>
              <Link href='/placeholder' className='navLinks'>
                Placeholder
              </Link>
            </li>
            <li>
              <Link href='/placeholder' className='navLinks'>
                Placeholder
              </Link>
            </li>
          </ul>
          {/* <Squiggle /> */}
        </nav>
      </div>
    </>
  );
}

export default Layout;

