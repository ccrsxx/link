import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

type SubmitProps = {
  isValidURL: boolean;
};

export function Submit({ isValidURL }: SubmitProps): JSX.Element {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      className='custom-button clickable disabled:brightness-75'
      disabled={!isValidURL}
      loading={pending}
    >
      Create
    </Button>
  );
}
