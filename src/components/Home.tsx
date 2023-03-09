import { FC, useEffect, useState } from 'react';
import { useFetch } from './useFetch';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert } from '@mui/material';
import { Output } from './Output';

export const Home: FC = () => {
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
        <Output data={data} error={error} />
      </div>
    </div>
  );
};
