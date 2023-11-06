'use client';

import { useState } from 'react';
import { HiClipboard, HiClipboardCheck } from 'react-icons/hi';
import { Button } from './button';

type CopyButtonProps = {
  url: string;
};

export function CopyButton({ url }: CopyButtonProps): JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (): Promise<void> => {
    if (copied) return;

    setCopied(true);

    await navigator.clipboard.writeText(url);

    setTimeout(() => setCopied(false), 1000);
  };
  return (
    <Button className='absolute right-2 text-2xl' onClick={handleCopy}>
      {copied ? <HiClipboardCheck /> : <HiClipboard />}
    </Button>
  );
}
