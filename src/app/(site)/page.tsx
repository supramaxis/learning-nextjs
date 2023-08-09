/**
 * Renders the Shorten page, which allows users to shorten URLs and view a list of their shortened URLs.
 * Uses the `UrlsContext` to retrieve the list of URLs and the `UrlsModal` component to create new URLs.
 * Redirects to the login page if the user is not authenticated.
 * @returns A React component that renders the Shorten page.
 */

// shorten.tsx
"use client";
import { useContext, useState, useEffect } from "react";
import UrlsModal from "@/components/UrlsModal";
import UrlsContext from "@/context/UrlsContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DataItem } from "@/types";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/(site)/columns";
import NavigationMenuBar from "./components/NavBar";
("@/(site)/components/NavBar");

export default function Shorten() {
  const [urls, setUrls] = useState<DataItem[]>([]);

  const { data, error } = useContext(UrlsContext);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (data) setUrls(data);
  }, [data]);

  const handleUrlCreated = (url: DataItem) => {
    setUrls([...urls, url]);
  };

  useEffect(() => {
    if (!session?.user.email) router.push("/login");
  }, [session]);

  /* The code block is determining the content to be rendered based on the value of the `data` variable. */
  let content;
  try {
    if (data === undefined) {
      content = <p className="flex items-center justify-center">Loading...</p>;
    } else if (data.length === 0) {
      content = (
        <p className="flex items-center justify-center">
          No hay urls para mostrar
        </p>
      );
    } else {
      content = <DataTable<DataItem, unknown> columns={columns} data={urls} />;
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <NavigationMenuBar />
      <div className="min-h-screen  text-zinc-200">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="">
            <h1 className="text-3xl font-bold text-zinc-200">
              Shorten your links
            </h1>
          </div>
          <div className="mt-4">
            {content}
            <UrlsModal onUrlCreated={handleUrlCreated} />
          </div>
        </main>
      </div>
    </>
  );
}
