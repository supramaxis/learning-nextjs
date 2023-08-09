// "use client";
// // import Link from 'next/link';
// // import { MdOutlineMenu } from 'react-icons/md';

// // function Layout() {
// //   return (
// //     <>
// //       <div className='navContainer'>
// //         <nav>
// //           <ul className='list'>
// //             <li>
// //               <Link href='/' className='navLinks'>
// //                 Home
// //               </Link>
// //             </li>
// //             <li>
// //               <Link href='/animegen' className='navLinks'>
// //                 Anime Gif
// //               </Link>
// //             </li>
// //             <li>
// //               <Link href='/placeholder' className='navLinks'>
// //                 Placeholder
// //               </Link>
// //             </li>
// //             <li>
// //               <Link href='/fact' className='navLinks'>
// //                 Fact
// //               </Link>
// //             </li>
// //             <li>
// //               <Link href='/jokes' className='navLinks'>
// //                 Jokes
// //               </Link>
// //             </li>
// //             <li>
// //               <Link href='/pokemon' className='navLinks'>
// //                 Pokemons API
// //               </Link>
// //             </li>
// //             <li>
// //               <Link href='/minecraft' className='navLinks'>
// //                 Minecraft API
// //               </Link>
// //             </li>
// //             <li>
// //               <Link href='/giveaways' className='navLinks'>
// //                 Giveaways API
// //               </Link>
// //             </li>
// //             <li>
// //               <Link href='/downloader' className='navLinks'>
// //                 YTDownloader
// //               </Link>
// //             </li>
// //           </ul>

// //           <button className='navBtn'>
// //             <MdOutlineMenu />
// //           </button>
// //         </nav>
// //       </div>
// //     </>
// //   );
// // }

// // export default Layout;
// import { Flex, Box, Text, IconButton } from "@chakra-ui/react";
// import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
// import { useState } from "react";
// import Link from "next/link";

// const Navbar = () => {
//   const [showMobileMenu, setShowMobileMenu] = useState(false);

//   const handleMobileMenuToggle = () => {
//     setShowMobileMenu(!showMobileMenu);
//   };

//   return (
//     <Flex alignItems="center" justifyContent="space-between" py={4} px={8}>
//       <Text fontSize="xl" fontWeight="bold">
//         Logo
//       </Text>
//       <Box display={{ base: "none", md: "block" }}>
//         <Link className="mx-4 inline" href={"/users"}>
//           Home
//         </Link>
//         <Link className="mx-4 inline" href={"/placeholder"}>
//           About
//         </Link>
//         <Link className="mx-4 inline" href={"/placeholder"}>
//           Contact
//         </Link>
//       </Box>
//       <Box display={{ base: "block", md: "none" }}>
//         <IconButton
//           aria-label="Toggle mobile menu"
//           icon={showMobileMenu ? <CloseIcon /> : <HamburgerIcon />}
//           onClick={handleMobileMenuToggle}
//         />
//       </Box>
//       {showMobileMenu && (
//         <Box
//           display={{ base: "block", md: "none" }}
//           position="absolute"
//           top="100%"
//           left={0}
//           right={0}
//           bg="white"
//           zIndex={10}
//           p={4}
//         >
//           <Text display="block" mb={2}>
//             Home
//           </Text>
//           <Text display="block" mb={2}>
//             About
//           </Text>
//           <Text display="block" mb={2}>
//             Contact
//           </Text>
//         </Box>
//       )}
//     </Flex>
//   );
// };

// export default Navbar;
