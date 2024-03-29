'use client';
//react context

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import type { DataItem, Url } from '@/types';
import { UrlsContext } from './UrlsContext';


const fetcher = async (url: string): Promise<DataItem[]> => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const UrlsContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [urls, setUrls] = useState<Url[]>([]);
  const { data: session, status } = useSession();
  const { data, error } = useSWR<DataItem[]>('/api/urls', fetcher);

  return (
    <UrlsContext.Provider
      value={{
        session,
        urls,
        fetcher,
        data,
        error,
        setUrls,
        handleUrlDeleted(deletedId) {}
      }}>
      {children}
    </UrlsContext.Provider>
  );
};

export default UrlsContextProvider;

