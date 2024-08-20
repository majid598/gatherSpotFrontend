import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const server = import.meta.env.VITE_SERVER;

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
  tagTypes: ["User", "Post", "Story", "Reel", "Chat", "Message"],
  endpoints: (builder) => ({
    editProfile: builder.mutation({
      query: (data) => ({
        url: "user/profile/edit",
        method: "PUT",
        credentials: "include",
        body: data,
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      invalidatesTags: ["User"],
    }),

    followToaUser: builder.mutation({
      query: (data) => ({
        url: `user/follow`,
        method: "PUT",
        credentials: "include",
        body: data,
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      invalidatesTags: ["User"],
    }),
    removeAFollower: builder.mutation({
      query: (data) => ({
        url: "user/follower/remove",
        method: "PUT",
        credentials: "include",
        body: data,
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      invalidatesTags: ["User"],
    }),
    newPost: builder.mutation({
      query: (post) => ({
        url: "post/new",
        method: "POST",
        credentials: "include",
        body: post,
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      invalidatesTags: ["Post"],
    }),
    allPosts: builder.query({
      query: () => ({
        url: "post/all",
        method: "GET",
        credentials: "include",
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      providesTags: ["Post"],
    }),
    getOtherUser: builder.query({
      query: (id) => ({
        url: `user/other/${id}`,
        method: "GET",
        credentials: "include",
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      providesTags: ["User", "Post"],
    }),
    uploadStory: builder.mutation({
      query: (story) => ({
        url: "user/story/upload",
        method: "POST",
        credentials: "include",
        body: story,
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      invalidatesTags: ["Story", "User"],
    }),
    getStories: builder.query({
      query: () => ({
        url: `user/story/all`, credentials: "include", headers: {
          "token": localStorage.getItem("token")
        }
      }),
      providesTags: ["Story", "User"],
    }),
    getStory: builder.query({
      query: (id) => ({
        url: `user/story/${id}`, credentials: "include", headers: {
          "token": localStorage.getItem("token")
        }
      }),
      providesTags: ["Story"],
    }),
    likePost: builder.mutation({
      query: (data) => ({
        url: `post/like`,
        method: "PUT",
        credentials: "include",
        body: data,
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      invalidatesTags: ["Post"],
    }),
    newReel: builder.mutation({
      query: (reel) => ({
        url: "post/reel/new",
        method: "POST",
        credentials: "include",
        body: reel,
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      invalidatesTags: ["Reel"],
    }),
    allReels: builder.query({
      query: () => ({
        url: "post/reel/all", credentials: "include", headers: {
          "token": localStorage.getItem("token")
        }
      }),
      providesTags: ["Reel"],
    }),
    likeReel: builder.mutation({
      query: (data) => ({
        url: `post/like/reel`,
        method: "PUT",
        credentials: "include",
        body: data,
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      invalidatesTags: ["Reel"],
    }),
    addToFavofites: builder.mutation({
      query: (data) => ({
        url: `post/reel/add/favorites`,
        method: "PUT",
        credentials: "include",
        body: data,
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      invalidatesTags: ["Reel"],
    }),
    logout: builder.query({
      query: () => ({
        url: "user/logout", credentials: "include", headers: {
          "token": localStorage.getItem("token")
        }
      }),
      providesTags: ["User"],
    }),
    newChat: builder.mutation({
      query: (chadIds) => ({
        url: "chat/new",
        method: "POST",
        credentials: "include",
        body: chadIds,
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      invalidatesTags: ["Chat"],
    }),
    getChat: builder.query({
      query: (id) => ({
        url: `chat/${id}`, credentials: "include", headers: {
          "token": localStorage.getItem("token")
        }
      }),
      providesTags: ["Chat", "User"],
    }),
    allMessages: builder.query({
      query: (id) => ({
        url: `chat/messages/${id}`,
        credentials: "include",
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      keepUnusedDataFor: 0,
    }),
    sendMessage: builder.mutation({
      query: (message) => ({
        url: "chat/send/message",
        method: "POST",
        credentials: "include",
        body: message,
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      invalidatesTags: ["Message"],
    }),
    myNotifications: builder.query({
      query: (id) => ({
        url: `user/notifications/my?id=${id}`,
        credentials: "include",
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      providesTags: ["Notification", "User"],
    }),
    addCommentToReel: builder.mutation({
      query: (comment) => ({
        url: "post/reel/comment",
        method: "POST",
        credentials: "include",
        body: comment,
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      invalidatesTags: ["Reel"],
    }),
    getReelById: builder.query({
      query: (id) => ({
        url: `post/reel/with/${id}`, credentials: "include", headers: {
          "token": localStorage.getItem("token")
        }
      }),
      providesTags: ["Reel"],
    }),
    myChats: builder.query({
      query: () => ({
        url: "chat/my",
        credentials: "include",
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      providesTags: ["Chat"],
    }),

    searchUser: builder.query({
      query: (name) => ({
        url: `user/search?name=${name}`,
        credentials: "include",
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      providesTags: ["User"],
    }),

    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: "user/sendrequest",
        method: "PUT",
        credentials: "include",
        headers: {
          "token": localStorage.getItem("token")
        },
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    getNotifications: builder.query({
      query: () => ({
        url: `user/notifications`,
        credentials: "include",
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      keepUnusedDataFor: 0,
    }),

    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: "user/acceptrequest",
        method: "PUT",
        credentials: "include",
        headers: {
          "token": localStorage.getItem("token")
        },
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),

    chatDetails: builder.query({
      query: ({ chatId, populate = false }) => {
        let url = `chat/${chatId}`;
        if (populate) url += "?populate=true";
        return {
          url,
          credentials: "include",
          headers: {
            "token": localStorage.getItem("token")
          },
        };
      },
      providesTags: ["Chat"],
    }),

    getMessages: builder.query({
      query: ({ chatId, page }) => ({
        url: `chat/message/${chatId}?page=${page}`,
        credentials: "include",
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      keepUnusedDataFor: 0,
    }),

    sendAttachments: builder.mutation({
      query: (data) => ({
        url: "chat/message",
        method: "POST",
        credentials: "include",
        headers: {
          "token": localStorage.getItem("token")
        },
        body: data,
      }),
    }),

    myGroups: builder.query({
      query: () => ({
        url: "chat/my/groups",
        credentials: "include",
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      providesTags: ["Chat"],
    }),

    availableFriends: builder.query({
      query: (chatId) => {
        let url = `user/friends`;
        if (chatId) url += `?chatId=${chatId}`;

        return {
          url,
          credentials: "include",
          headers: {
            "token": localStorage.getItem("token")
          }
        };
      },
      providesTags: ["Chat"],
    }),

    newGroup: builder.mutation({
      query: ({ name, members }) => ({
        url: "chat/new",
        method: "POST",
        credentials: "include",
        headers: {
          "token": localStorage.getItem("token")
        },
        body: { name, members },
      }),
      invalidatesTags: ["Chat"],
    }),

    renameGroup: builder.mutation({
      query: ({ chatId, name }) => ({
        url: `chat/${chatId}`,
        method: "PUT",
        credentials: "include",
        headers: {
          "token": localStorage.getItem("token")
        },
        body: { name },
      }),
      invalidatesTags: ["Chat"],
    }),

    removeGroupMember: builder.mutation({
      query: ({ chatId, userId }) => ({
        url: `chat/removemember`,
        method: "PUT",
        credentials: "include",
        headers: {
          "token": localStorage.getItem("token")
        },
        body: { chatId, userId },
      }),
      invalidatesTags: ["Chat"],
    }),

    addGroupMembers: builder.mutation({
      query: ({ members, chatId }) => ({
        url: `chat/addmembers`,
        method: "PUT",
        credentials: "include",
        headers: {
          "token": localStorage.getItem("token")
        },
        body: { members, chatId },
      }),
      invalidatesTags: ["Chat"],
    }),

    deleteChat: builder.mutation({
      query: (chatId) => ({
        url: `chat/${chatId}`,
        method: "DELETE",
        credentials: "include",
        headers: {
          "token": localStorage.getItem("token")
        },
      }),
      invalidatesTags: ["Chat"],
    }),

    leaveGroup: builder.mutation({
      query: (chatId) => ({
        url: `chat/leave/${chatId}`,
        method: "DELETE",
        credentials: "include",
        headers: {
          "token": localStorage.getItem("token")
        },
      }),
      invalidatesTags: ["Chat"],
    }),
    getChatNamePhoto: builder.query({
      query: (chatId) => ({
        url: `chat/get/${chatId}`,
        credentials: "include",
        headers: {
          "token": localStorage.getItem("token")
        },
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const {
  useEditProfileMutation,
  useNewPostMutation,
  useAllPostsQuery,
  useGetOtherUserQuery,
  useRemoveAFollowerMutation,
  useFollowToaUserMutation,
  useUploadStoryMutation,
  useGetStoriesQuery,
  useGetStoryQuery,
  useLikePostMutation,
  useNewReelMutation,
  useAllReelsQuery,
  useLogoutQuery,
  useGetChatQuery,
  useAllMessagesQuery,
  useLikeReelMutation,
  useSendMessageMutation,
  useNewChatMutation,
  useMyNotificationsQuery,
  useAddCommentToReelMutation,
  useGetReelByIdQuery,
  useAddToFavofitesMutation,
  useMyChatsQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useGetNotificationsQuery,
  useAcceptFriendRequestMutation,
  useChatDetailsQuery,
  useGetMessagesQuery,
  useSendAttachmentsMutation,
  useMyGroupsQuery,
  useAvailableFriendsQuery,
  useNewGroupMutation,
  useRenameGroupMutation,
  useRemoveGroupMemberMutation,
  useAddGroupMembersMutation,
  useDeleteChatMutation,
  useLeaveGroupMutation,
  useGetChatNamePhotoQuery
} = api;
export default api;
