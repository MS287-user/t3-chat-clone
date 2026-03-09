import ActiveChatLoader from "@/modules/chat/components/active-chat-loader";
import MessageViewWithForm from "@/modules/chat/components/message-view-form";
import React from "react";

const Page = async ({ params }) => {

  const { chatId } = await params;

  return (
    <>
      <ActiveChatLoader chatId={chatId} />
      <MessageViewWithForm chatId={chatId} />
    </>
  )
};

export default Page;
