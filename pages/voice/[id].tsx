import ChatRoom from "@app/components/chatRoom";

export default function VoiceChat() {
  return (
    <>
      <ChatRoom participants={["ansh"]} roomName={"Hello"} onLeave={() => {}} />
    </>
  );
}
