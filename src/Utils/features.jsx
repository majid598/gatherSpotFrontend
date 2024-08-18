
export const useKnowIsChat = (location, chatId) => {
    const isChat = location?.pathname === "/chats" ? true : location?.pathname === `/chat/${chatId}`
    return isChat
}