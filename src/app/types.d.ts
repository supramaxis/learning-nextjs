export interface DataItem {
  id: number;
  url: string;
  shortUrl: string;
  customCode: string | null;
  createdAt: string;
  userId: string;
}

export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void | undefined;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

export interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

export type Url = {
  id: number;
  url: string;
  shortUrl: string;
  customCode: string | null;
  createdAt: string;
  userId: string;
};

export interface UrlsTableProps {
  data: DataItem[];
}

export interface UrlsModalProps {
  onUrlCreated: (url: DataItem) => void;
}

export type UrlsContextType = {
  urls: Url[];
  // fetchUrls: () => void;
  session: any;
  fetcher: (url: any) => void;
  data: DataItem[] | undefined;
  error: Error | undefined;
  setUrls: (urls: Url[]) => void;
  handleUrlDeleted: (deleteId: number) => void;
};


