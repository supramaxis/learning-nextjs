"use client";
//react context

import { useState } from "react";
import useSWR from "swr";
import type { DataItem, Url } from "@/types";
import { UrlsContext } from "./UrlsContext";
import { useSession } from "@clerk/nextjs";

const fetcher = async (url: string): Promise<DataItem[]> => {
  console.log("fetching data", url);
  const res = await fetch(url);
  const data = await res.json();
  console.log("finished fetching data", data);
  return data;
};

export const UrlsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [urls, setUrls] = useState<Url[]>([]);
  const { data, error } = useSWR<DataItem[]>("/api/urls", fetcher);
  const { session } = useSession();

  return (
    <UrlsContext.Provider
      value={{
        session,
        urls,
        fetcher,
        data,
        error,
        setUrls,
        handleUrlDeleted(deletedId) {},
      }}
    >
      {children}
    </UrlsContext.Provider>
  );
};

export default UrlsContextProvider;
