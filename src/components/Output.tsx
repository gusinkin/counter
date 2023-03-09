import { FC } from 'react';
import { Alert } from '@mui/material';

interface OutputProps {
  data: number;
  error: string;
}

export const Output: FC<OutputProps> = ({ data, error }: OutputProps) => (
  <>
    <div className=''>
      {error ? (
        <Alert severity='error'>Произошла ошибка: {error}</Alert>
      ) : (
        <Alert severity='success'>По версии сервера: {data} раз</Alert>
      )}
    </div>
  </>
);
