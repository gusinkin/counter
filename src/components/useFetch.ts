import { useState } from 'react';

type Json =
  | {
      ok: true;
      count: number;
    }
  | {
      ok: false;
      error: string;
      error_ui: string;
    };

export function useFetch() {
  const [data, setData] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  async function updateCount(count: number): Promise<void> {
    try {
      setLoading(true);
      const response: Response = await fetch(
        `https://lk.zont-online.ru/api/button_count`,
        {
          method: 'Post',
          headers: {
            'Content-Type': 'application/json',
            'X-ZONT-Client': 'd.gusinkin@gmail.com',
            Authorization: 'Basic ZC5ndXNpbmtpbjp0OHV6cWhSOQ==',
          },
          body: JSON.stringify({
            count: count,
          }),
        }
      );
      const json: Json = await response.json();
      if (json.ok === true) {
        const result = json.count;
        setData(result);
      } else {
        throw new Error(json.error_ui);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { data, error, loading, updateCount };
}
