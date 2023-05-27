'use client';
// context/UrlsContext.tsx

import { createContext } from 'react';
import { UrlsContextType } from '@/types';

export const UrlsContext = createContext<UrlsContextType>({
  urls: [],
  session: {},
  fetcher: () => {},
  data: undefined,
  error: undefined,
  setUrls: () => null,
  handleUrlDeleted: () => null // Add handleUrlDeleted with empty function
});

export default UrlsContext;

