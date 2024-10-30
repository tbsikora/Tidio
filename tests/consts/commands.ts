import { request } from '@playwright/test';

const API_BASE_URL = 'https://api-v2.tidio.com';

export async function clearConversations(): Promise<void> {
  const API_TOKEN = process.env.API_TOKEN!;
  const PROJECT_PUBLIC_KEY = process.env.PROJECT_PUBLIC_KEY!;

  const apiContext = await request.newContext({
    baseURL: API_BASE_URL,
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  });

  const response = await apiContext.get('/contacts', {
    params: {
      api_token: API_TOKEN,
      project_public_key: PROJECT_PUBLIC_KEY,
      page: '1',
      perPage: '50',
      match: 'all',
      sortColumn: 'createdAt',
      sortDirection: 'desc',
    },
  });

  const data = await response.json();

  const contacts = data.value?.items;

  const visitorId = contacts[0].visitorId;

  const deletePayload = {
    api_token: API_TOKEN,
    project_public_key: PROJECT_PUBLIC_KEY,
    visitors: [visitorId],
  };

  const deleteResponse = await apiContext.delete('/conversations', {
    data: deletePayload,
  });

  await apiContext.dispose();
}
