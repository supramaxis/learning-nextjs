'use client';
//react context

import { createContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';

export type Url = {
  id: number;
  url: string;
  shortUrl: string;
  customCode: string | null;
  createdAt: string;
  userId: string;
};

type UrlsContextType = {
  urls: Url[];
  fetchUrls: () => void;
  session: any;
  fetcher: (url: any) => void;
  data: DataItem[] | undefined;
  error: Error | undefined;
};

const UrlsContext = createContext<UrlsContextType>({
  urls: [],
  fetchUrls: () => {},
  session: Object,
  fetcher: () => {},
  data: undefined,
  error: undefined
});

interface DataItem {
  id: number;
  url: string;
  shortUrl: string;
  customCode: string | null;
  createdAt: string;
  userId: string;
}

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

  const fetchUrls = async () => {
    if (!session?.user.email) return;
    const res = await fetch('/api/urls', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    console.log('Your data', data);
    setUrls(data);
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <UrlsContext.Provider
      value={{ session, urls, fetcher, fetchUrls, data, error }}>
      {children}
    </UrlsContext.Provider>
  );
};

export default UrlsContext;

