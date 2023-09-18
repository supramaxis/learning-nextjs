import { UserButton } from "@clerk/nextjs";

const NavBar = () => {
  return (
    <div className="flex justify-end">
      <UserButton />
    </div>
  );
};

export default NavBar;

// "use client";

// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuIndicator,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   NavigationMenuViewport,
// } from "@/components/ui/navigation-menu";
// import {
//   LuCloud,
//   LuGithub,
//   LuLifeBuoy,
//   LuLogOut,
//   LuMail,
//   LuMessageSquare,
//   LuPlusCircle,
//   LuSettings,
//   LuUser,
//   LuUserPlus,
// } from "react-icons/lu";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuPortal,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuSub,
//   DropdownMenuSubContent,
//   DropdownMenuSubTrigger,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import Link from "next/link";
// import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
// import { cn } from "@/lib/utils";
// import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useSession } from "next-auth/react";
// import { toast } from "react-hot-toast";
// import { signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";

// const components: { title: string; href: string; description: string }[] = [
//   {
//     title: "Alert Dialog",
//     href: "/docs/primitives/alert-dialog",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
//   {
//     title: "Hover Card",
//     href: "/docs/primitives/hover-card",
//     description:
//       "For sighted users to preview content available behind a link.",
//   },
//   {
//     title: "Progress",
//     href: "/docs/primitives/progress",
//     description:
//       "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
//   },
//   {
//     title: "Scroll-area",
//     href: "/docs/primitives/scroll-area",
//     description: "Visually or semantically separates content.",
//   },
//   {
//     title: "Tabs",
//     href: "/docs/primitives/tabs",
//     description:
//       "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
//   },
//   {
//     title: "Tooltip",
//     href: "/docs/primitives/tooltip",
//     description:
//       "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
//   },
// ];

// export default function NavigationMenuBar() {
//   const session = useSession();
//   const router = useRouter();

//   const handleSignOut = async () => {
//     await signOut({ redirect: false });
//     router.push("/login");
//   };

//   return (
//     <NavigationMenu className="ml-auto">
//       <NavigationMenuList>
//         <NavigationMenuItem>
//           <Link href="/docs" legacyBehavior passHref>
//             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//               Documentation
//             </NavigationMenuLink>
//           </Link>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <DropdownMenu>
//             <DropdownMenuTrigger className="cursor-pointer" asChild>
//               <Avatar>
//                 <AvatarImage src={session.data?.user.image} />
//                 <AvatarFallback>{session.data?.user.name}</AvatarFallback>
//               </Avatar>
//               {/* <Button variant="outline">Open</Button> */}
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56">
//               <DropdownMenuLabel>My Account</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuGroup className="cursor-pointer">
//                 <DropdownMenuItem onClick={() => toast.error("Coming Soon")}>
//                   <LuUser className="mr-2 h-4 w-4" />
//                   <span>Profile</span>
//                   <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => toast.error("Coming Soon")}>
//                   <LuSettings className="mr-2 h-4 w-4" />
//                   <span>Settings</span>
//                   <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
//                 </DropdownMenuItem>
//               </DropdownMenuGroup>
//               <DropdownMenuSeparator />
//               <DropdownMenuGroup>
//                 <DropdownMenuSub>
//                   <DropdownMenuSubTrigger>
//                     <LuUserPlus className="mr-2 h-4 w-4" />
//                     <span>Invite users</span>
//                   </DropdownMenuSubTrigger>
//                   <DropdownMenuPortal>
//                     <DropdownMenuSubContent>
//                       <DropdownMenuItem
//                         onClick={() => toast.error("Coming Soon")}
//                       >
//                         <LuMail className="mr-2 h-4 w-4" />
//                         <span>Email</span>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         onClick={() => toast.error("Coming Soon")}
//                       >
//                         <LuMessageSquare className="mr-2 h-4 w-4" />
//                         <span>Message</span>
//                       </DropdownMenuItem>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem
//                         onClick={() => toast.error("Coming Soon")}
//                       >
//                         <LuPlusCircle className="mr-2 h-4 w-4" />
//                         <span>More...</span>
//                       </DropdownMenuItem>
//                     </DropdownMenuSubContent>
//                   </DropdownMenuPortal>
//                 </DropdownMenuSub>
//               </DropdownMenuGroup>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>
//                 <LuGithub className="mr-2 h-4 w-4" />
//                 {/* <span>GitHub</span> */}
//                 <Link
//                   href="https://github.com/supramaxis/learning-nextjs/tree/shortener"
//                   target="_blank"
//                 >
//                   GitHub
//                 </Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => toast.error("Coming Soon")}>
//                 <LuLifeBuoy className="mr-2 h-4 w-4" />
//                 <span>Support</span>
//               </DropdownMenuItem>
//               <DropdownMenuItem disabled>
//                 <LuCloud className="mr-2 h-4 w-4" />
//                 <span>API</span>
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem
//                 className="cursor-pointer"
//                 onClick={() => handleSignOut()}
//               >
//                 <LuLogOut className="mr-2 h-4 w-4" />
//                 <span>Log out</span>
//                 <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </NavigationMenuItem>
//       </NavigationMenuList>
//     </NavigationMenu>
//   );
// }

// /* The `ListItem` component is a functional component that renders a list item with a link inside it.
// It uses the `forwardRef` function from React to forward the `ref` prop to the underlying `a`
// element. This allows the parent component to access and manipulate the DOM node of the `a` element
// if needed. */
// const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
//   ({ className, title, children, ...props }, ref) => {
//     return (
//       <li>
//         <NavigationMenuLink asChild>
//           <a
//             ref={ref}
//             className={cn(
//               "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//               className
//             )}
//             {...props}
//           >
//             <div className="text-sm font-medium leading-none">{title}</div>
//             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//               {children}
//             </p>
//           </a>
//         </NavigationMenuLink>
//       </li>
//     );
//   }
// );
// ListItem.displayName = "ListItem";
