'use server';

import { redirect } from 'next/navigation';
import { NEXT_PUBLIC_URL } from '@/lib/env';
import { SECRET_PASSWORD } from '@/lib/env-server';
import type { APIResponse } from '@/lib/types/api';
import type { LinkMeta } from '@/lib/types/meta';

export async function createLink(
  _prevState: string | null,
  formData: FormData
): Promise<string> {
  const body = Object.fromEntries(formData.entries());

  let successUrl: string;

  try {
    const response = await fetch(`${NEXT_PUBLIC_URL}/l`, {
      method: 'POST',
      headers: {
        Origin: NEXT_PUBLIC_URL,
        Authorization: `Bearer ${SECRET_PASSWORD}`
      },
      body: JSON.stringify(body)
    });

    const { message, data } = (await response.json()) as APIResponse<LinkMeta>;

    if (!response.ok || !data) throw new Error(message);

    successUrl = data.successUrl;
  } catch (err) {
    if (err instanceof Error) return err.message;
    return 'Internal server error';
  }

  redirect(successUrl);
}
