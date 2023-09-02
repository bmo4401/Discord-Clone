import ChatHeader from '@/components/chat/chat-header';
import ChatInput from '@/components/chat/chat-input';
import ChatMessages from '@/components/chat/chat-message';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

interface ChannelIdPageProps {
   params: {
      serverId: string;
      channelId: string;
   };
}
const ChannelIdPage: React.FC<ChannelIdPageProps> = async ({ params }) => {
   const profile = await currentProfile();
   if (!profile) return redirectToSignIn();

   const channel = await db.channel.findUnique({
      where: {
         id: params.channelId,
      },
   });
   const member = await db.member.findFirst({
      where: {
         serverId: params.serverId,
         profileId: profile.id,
      },
   });
   if (!channel || !member) return redirect('/.');
   return (
      <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
         <ChatHeader
            name={channel.name}
            serverId={channel.serverId}
            type="channel"
            imageUrl={profile.imageUrl}
         />
         <ChatMessages
            name={channel.name}
            member={member}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
               channelId: channel.id,
               serverId: channel.serverId,
            }}
            paramKey="channelId"
            paramValue={channel.id}
            chatId={channel.id}
         />
         <ChatInput
            name={channel.name}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{
               channelId: channel.id,
               serverId: channel.serverId,
            }}
         />
      </div>
   );
};
export default ChannelIdPage;
