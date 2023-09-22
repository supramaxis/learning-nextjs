import React from "react";
import Head from "next/head";

const LandingPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>My Landing Page</title>
        <meta name="description" content="Welcome to my landing page" />
      </Head>
      <div>
        <h1>Welcome to my landing page</h1>
        <p>Thanks for visiting!</p>
      </div>
    </>
  );
};

export default LandingPage;
