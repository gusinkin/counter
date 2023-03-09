import { useState } from 'react';
import { URL, CLIENT, AUTH } from '../constants';

type CustomResponse =
  | {
      ok: true;
      count: number;
    }
  | {
      ok: false;
      error: string;
      error_ui: string;
    };

interface UseFetch {
  data: number;
  error: string;
  loading: boolean;
  updateCount: (count: number) => Promise<void>;
}

export function useFetch(): UseFetch {
  const [data, setData] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  async function updateCount(count: number): Promise<void> {
    try {
      setLoading(true);
      const response: Response = await fetch(URL, {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
          'X-ZONT-Client': CLIENT,
          Authorization: AUTH,
        },
        body: JSON.stringify({
          count: count,
        }),
      });
      const json: CustomResponse = await response.json();
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
