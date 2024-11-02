import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const params = new URLSearchParams({
      app: 'linkedin',
      appUserId: 'dm+2024@anon.com',
      redirectUrl: 'http://localhost:3000/dashboard',
    });

    const generateLinkUrl = `https://svc.sandbox.anon.com/link/url?${params.toString()}`;

    console.log('Calling Anon API:', generateLinkUrl);

    const response = await fetch(generateLinkUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer anon_cnLVSiHr8Dy8jpduhqnuwhO/ygXsyWwwdsZXeh30QS9crh2aFr9NOkiA1LQjJAy8uaMlEOvBj4OmST0N',
      },
    });

    if (!response.ok) {
      console.error('Anon API error:', response.status, await response.text());
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Anon API response:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to generate Anon link:', error);
    return NextResponse.json({ error: 'Failed to generate link' }, { status: 500 });
  }
}