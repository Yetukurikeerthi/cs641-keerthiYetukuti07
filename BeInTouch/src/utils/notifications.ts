import { supabase } from '../lib/supabase';

// Define a type for 'like'
interface Like {
  id: number; // or string, depending on your database schema
}

export async function sendLikeNotification(like: Like) {
  const { data } = await supabase
    .from('likes')
    .select('*, posts(*, profiles(*))')
    .eq('id', like.id)
    .single();

  const pushToken = data?.posts?.profiles?.push_token;
  if (!pushToken) {
    return;
  }

  const message = {
    to: pushToken,
    sound: 'default',
    title: 'Someone liked your post',
    body: `${data?.posts?.profiles.username} liked your post!`,
    data: { postId: data.posts.id },
  };
  sendPushNotification(message);
}

async function sendPushNotification(message: { to: string, sound: string, title: string, body: string, data: { postId: number } }) {
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}
