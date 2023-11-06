import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';

type AlertProps = {
  variant: 'error' | 'success';
  message: string;
};

export function Alert({ variant, message }: AlertProps): JSX.Element {
  return (
    <div className='flex items-center gap-2 text-lg'>
      {variant === 'error' ? (
        <HiExclamationCircle className='text-red-400' />
      ) : (
        <HiCheckCircle className='text-green-400' />
      )}
      <p className='text-sm'>{message}</p>
    </div>
  );
}
