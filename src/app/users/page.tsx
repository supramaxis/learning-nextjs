'use client';
import useSWR from 'swr';

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

const ExampleComponent: React.FC = () => {
  const { data, error } = useSWR<DataItem[]>('/api/urls', fetcher);

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.shortUrl}</div>
      ))}
    </div>
  );
};

export default ExampleComponent;

