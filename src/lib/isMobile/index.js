// app/page.tsx or any Server Component
import { headers } from 'next/headers';

export async function isMobileServer() {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
 
  const result  = /mobile|android|iphone|ipad/i.test(userAgent)
  // console.log('userAgent', result);
  return result;
}
