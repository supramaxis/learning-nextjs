import { withAuth } from 'next-auth/middleware';
export { default } from 'next-auth/middleware';

// export default withAuth({
//   pages: {
//     signIn: '/login'
//   },

//   callbacks: {
//     authorized: ({ req, token }) => {
//       // Allow access to the root ("/") route without authentication
//       if (req.nextUrl.pathname === '/login') return true;

//       // Protect all other routes by allowing access only to authenticated users
//       return !!token;
//     }
//   }
// });

export const config = {
  matcher: ['/((?!register|api|login).*)']
};

