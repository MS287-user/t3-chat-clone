import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createChatWithMessage, deleteChat, getChatById } from "../actions";
import { toast } from "sonner";

export const useCreateChat = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (values) => createChatWithMessage(values),
    onSuccess: (res) => {
      if (res.success && res.data) {
        // Add optimistic UI
        const chat = res.data;

        queryClient.invalidateQueries(["chats"]);

        // Redirect WITH autoTrigger to stream AI response
        router.push(`/chat/${chat.id}?autoTrigger=True`);
      }
    },
    onError: (error) => {
      console.error("Create chat error:", error);
      toast.error("Failed to create chat");
    }
  })
}

export const useGetChatById = (chatId) => {
  return useQuery({
    queryKey: ["chats", chatId],
    queryFn: () => getChatById(chatId),
  });
}

export const useDeleteChat = (chatId) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => deleteChat(chatId),
    onSuccess: () => {
      queryClient.invalidateQueries(["chats"])
    },
    onError: () => {
      toast.error("Failed to delete chat");
    }
  })
}