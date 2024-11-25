import { db } from '@/server/db';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { notFound, redirect } from 'next/navigation';

const SyncUser = async () => {

    const { userId } = await auth();

    if (!userId) {
        throw new Error('No user')
    }

    const client = await clerkClient();
    const user = await client.users.getUser( userId );
    if (!user.emailAddresses[0]?.emailAddress) {
        return notFound();
    }

    await db.user.upsert({
        where: {
          emailAddress: user.emailAddresses[0]?.emailAddress ?? "",
        },
        update: {
          imageurl: user.imageUrl, // Match schema field
          firstname: user.firstName, // Match schema field
          lastname: user.lastName, // Match schema field
        },
        create: {
          id: userId,
          emailAddress: user.emailAddresses[0]?.emailAddress ?? "",
          imageurl: user.imageUrl, // Match schema field
          firstname: user.firstName, // Match schema field
          lastname: user.lastName, // Match schema field
        },
      });
    
    return redirect('/dashboard');
}

export default SyncUser
