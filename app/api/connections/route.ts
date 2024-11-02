import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface AnonConnection {
  id: string;
  name: string;
  headline?: string;
  publicProfileUrl?: string;
  publicIdentifier?: string;
  profilePictureUrl?: string;
  createdAt: string;
}

interface AnonResponse {
  connections: AnonConnection[];
  cursor?: string;
}

const ANON_API_KEY = process.env.ANON_API_KEY;
const ANON_APP_USER_ID = encodeURIComponent(process.env.ANON_APP_USER_ID || '');

export async function GET(): Promise<NextResponse> {
  try {
    if (!ANON_API_KEY || !ANON_APP_USER_ID) {
      throw new Error('Missing required environment variables');
    }

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ANON_API_KEY}`
      }
    };

    console.log('Anon API Key:', ANON_API_KEY);
    console.log('Anon App User ID:', ANON_APP_USER_ID);

    console.log('Fetching connections...');

    const response = await fetch(
      `https://svc.sandbox.anon.com/actions/linkedin/listConnections?appUserId=${ANON_APP_USER_ID}`,
      options
    );

    if (!response.ok) {
      throw new Error(`Anon API error: ${response.status}`);
    }

    const data = (await response.json()) as AnonResponse;

    console.log('Anon Response:', data);
    
    // Store connections in database
    const upsertPromises = data.connections.map(async (connection: AnonConnection) => {
      // First get the existing connection if it exists
      const existingConnection = await prisma.connection.findUnique({
        where: {
          userId_linkedInId: {
            userId: 'test-user',
            linkedInId: connection.id
          }
        }
      });

      console.log('Existing connection:', connection);
    
      return await prisma.connection.upsert({
        where: {
          userId_linkedInId: {
            userId: 'test-user',
            linkedInId: connection.id
          }
        },
        update: {
          name: connection.name,
          headline: connection.headline,
          publicProfileUrl: connection.publicProfileUrl,
          publicIdentifier: connection.publicIdentifier,
          profilePictureUrl: connection.profilePictureUrl,
          connectionCreatedAt: new Date(connection.createdAt),
          // Store old values if they've changed
          oldHeadline: existingConnection 
            ? (existingConnection.headline !== connection.headline 
              ? connection.headline 
              : existingConnection.headline)
            : connection.headline,
          oldHeadlineUpdatedAt: existingConnection
            ? (existingConnection.headline !== connection.headline
              ? (connection.createdAt ? new Date(connection.createdAt) : undefined)
              : existingConnection.oldHeadlineUpdatedAt)
            : (connection.createdAt ? new Date(connection.createdAt) : undefined),
        },
        create: {
          userId: 'test-user',
          linkedInId: connection.id,
          name: connection.name,
          headline: connection.headline,
          publicProfileUrl: connection.publicProfileUrl,
          publicIdentifier: connection.publicIdentifier,
          profilePictureUrl: connection.profilePictureUrl,
          connectionCreatedAt: new Date(connection.createdAt),
          oldHeadline: connection.headline,
          oldHeadlineUpdatedAt: new Date(connection.createdAt),
        },
      });
    });

    const upsertedConnections = await Promise.all(upsertPromises);

    const newConnections = upsertedConnections.map(connection => ({
      ...connection,
      oldTimestamp: connection.oldHeadlineUpdatedAt,
    }));
    console.log('Upserted connections:', newConnections);

    return NextResponse.json({...data, connections: newConnections});
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching connections:', error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    console.error('Unknown error:', error);
    return NextResponse.json(
      { error: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}