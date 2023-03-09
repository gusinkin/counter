import { useEffect, useState } from 'react';
import { useFetch } from './useFetch';
import { Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { yellow } from '@mui/material/colors';
import { Alert } from '@mui/material';

export const Home = () => {
  const [count, setCount] = useState<number>(0);
  const { data, error, loading, updateCount } = useFetch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (count !== 0) {
        updateCount(count);
      }
      setCount(0);
    }, 1000);
    return () => clearTimeout(timer);
  }, [count]);

  function handleClick() {
    setCount((prev) => prev + 1);
  }

  return (
    <div className='wrapper'>
      <div className='container'>
        <LoadingButton
          variant='contained'
          loading={loading}
          loadingIndicator='ЗАГРУЗКА…'
          onClick={handleClick}
        >
          КЛИКНУТЬ
        </LoadingButton>
        <Alert severity='info'>Кликнули {count} раз</Alert>
        <div className=''>
          {error ? (
            <Alert severity='error'>Произошла ошибка: {error}</Alert>
          ) : (
            <Alert severity='success'>По версии сервера: {data} раз</Alert>
          )}
        </div>
      </div>
    </div>
  );
};
