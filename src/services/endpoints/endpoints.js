const baseUrl = 'http://localhost:8080';

export const endpoints = {
  register: baseUrl + '/api/auth/register',
  authenticate: baseUrl + '/api/auth/login',
  logout: baseUrl + '/api/auth/logout/{userId}',
  userProfile: baseUrl + '/api/profile/{userId}/information',
  post: baseUrl + '/api/posts',
  postDetails: baseUrl + '/api/posts/{postId}',
  getActivityBoard: baseUrl + '/api/activity',
  likePost: baseUrl + '/api/posts/{postId}/like',
  dislikePost: baseUrl + '/api/posts/{postId}/liked',
  commentPost: baseUrl + '/api/posts/{postId}/comments',
  manageComment: baseUrl + '/api/posts/comments/{commentId}',
  likePostComment: baseUrl + '/api/posts/comments/{commentId}/like',
  dislikePostComment: baseUrl + '/api/posts/comments/{commentId}/liked',
  manageFavouritePost: baseUrl + '/api/posts/{postId}/favourite',
  getUserFavouritePosts: baseUrl + '/api/posts/favourite',
  managePost: baseUrl + '/api/posts/{postId}',
  postCommentsAccess: baseUrl + '/api/posts/{postId}/comments?blocked=',
  postAccess: baseUrl + '/api/posts/{postId}/access?isPublic=',
  sharePost: baseUrl + '/api/posts/{basePostId}/share',
  deleteSharedPost: baseUrl + '/api/posts/shared/{sharedPostId}',
  userActivity: baseUrl + '/api/profile/{userId}/activity',
  addSchoolInformation: baseUrl + '/api/profile/schools',
  manageSchoolInformation: baseUrl + '/api/profile/schools/{schoolId}',
  addWorkPlaceInformation: baseUrl + '/api/profile/work',
  manageWorkPlaceInformation: baseUrl + '/api/profile/work/{workId}',
  userFavouriteItems: baseUrl + '/api/profile/{userId}/favourites',
  addFavouriteItem: baseUrl + '/api/profile/favourites',
  manageFavouriteItem: baseUrl + '/api/profile/favourites/{favouriteId}',
  possibleInterest: baseUrl + '/api/interests',
  userInterests: baseUrl + '/api/profile/{userId}/interests',
  manageUserInterests: baseUrl + '/api/profile/interests/{interestId}',
  manageProfilePhoto: baseUrl + '/api/profile/photo',
  profileImages: baseUrl + '/api/profile/{userId}/images',
  profileInformation: baseUrl + '/api/profile/information',
  addAddress: baseUrl + '/api/profile/address',
  updateAddress: baseUrl + '/api/profile/address/{addressId}',
  inviteFriend: baseUrl + '/api/friends/invitations',
  receivedFriendInvitations: baseUrl + '/api/friends/invitations/received',
  sentFriendInvitations: baseUrl + '/api/friends/invitations/sent',
  respondInvitation: baseUrl + '/api/friends/{inviterId}/response',
  userFriendsSuggestions: baseUrl + '/api/friends/suggestions',
  userFriends: baseUrl + '/api/friends',
  deleteFriend: baseUrl + '/api/friends/{friendId}',
  allUsers: baseUrl + '/api/users',
  changeStatus: baseUrl + '/api/users',
  userActivityNotifications: baseUrl + '/api/activity/notifications',
  events: baseUrl + '/api/events',
  eventDetails: baseUrl + '/api/events/{eventId}',
  deleteEvent: baseUrl + '/api/events/{eventId}?archive=true',
  inviteToEvent: baseUrl + '/api/events/{eventId}/invite',
  getUserEventInvitations: baseUrl + '/api/events/invitations',
  eventReaction: baseUrl + '/api/events/{eventId}/response',
  shareEvent: baseUrl + '/api/events/{eventId}/share',
  deleteSharedEvent: baseUrl + '/api/events/{eventId}/shared',
  getSharedEvents: baseUrl + '/api/events/shared',
  changeUsername: baseUrl + '/api/users/{userId}/username',
  changeEmail: baseUrl + '/api/users/{userId}/email',
  changePhoneNumber: baseUrl + '/api/users/{userId}/phoneNumber',
  changePassword: baseUrl + '/api/users/{userId}/password',
  deleteUser: baseUrl + '/api/users?archive=false',
  activateAccount: baseUrl + '/api/auth/account-activation',
  resendActivationLink: baseUrl + '/api/auth/resend-activation',
  forgetPassword: baseUrl + '/api/users/reset-password/step1',
  resetPassword: baseUrl + '/api/users/reset-password/step2',
  refreshToken: baseUrl + '/api/auth/refreshtoken',
  groups: baseUrl + '/api/groups',
  userGroups: baseUrl + '/api/users/{userId}/groups',
  interestingGroups: baseUrl + '/api/interesting-groups',
  groupDetails: baseUrl + '/api/groups/{groupId}',
  groupDetailsPublic: baseUrl + '/api/public/groups/{groupId}',
  deleteGroup: baseUrl + '/api/groups/{groupId}?archive=true',
  inviteToGroup: baseUrl + '/api/groups/{groupId}/invite',
  groupInvitationRespond: baseUrl + '/api/groups/{groupId}/response',
  getUserGroupInvitations: baseUrl + '/api/groups/invitations',
  groupJoinRequest: baseUrl + '/api/groups/{groupId}/request',
  usersWantedJoinGroup: baseUrl + '/api/groups/{groupId}/requests',
  groupRules: baseUrl + '/api/groups/{groupId}/rules',
  manageGroupRule: baseUrl + '/api/groups/{groupId}/rules/{ruleId}',
  manageGroupInterest: baseUrl + '/api/groups/{groupId}/interests/{interestId}',
  groupPosts: baseUrl + '/api/groups/{groupId}/posts',
  manageGroupPost: baseUrl + '/api/groups/posts/{postId}',
  createGroupThread: baseUrl + '/api/groups/{groupId}/threads',
  manageGroupThread: baseUrl + '/api/groups/threads/{threadId}',
  createGroupThreadAnswer: baseUrl + '/api/groups/threads/{threadId}/answers',
  manageGroupThreadAnswer: baseUrl + '/api/groups/threads/answers/{answerId}',
  createGroupThreadAnswerReview:
    baseUrl + '/api/groups/threads/answers/{answerId}/reviews',
  manageGroupThreadAnswerReview:
    baseUrl + '/api/groups/threads/answers/reviews/{reviewId}',
  manageGroupMember: baseUrl + '/api/groups/{groupId}/members/{memberId}',
  leaveGroup: baseUrl + '/api/groups/{groupId}/leave',
  groupForum: baseUrl + '/api/groups/{groupId}/forum',
  groupForumStats: baseUrl + '/api/groups/{groupId}/forum/stats',
  chat: baseUrl + '/api/chats',
  privateChat: baseUrl + '/api/chats/private',
  chatDetails: baseUrl + '/api/chats/{chatId}',
  chatMessage: baseUrl + '/api/chats/messages/{messageId}',
  addChatMember: baseUrl + '/api/chats/{chatId}/invite',
  chatMemberPermission: baseUrl + '/api/chats/{chatId}/permission',
  chatMember: baseUrl + '/api/chats/members/{chatMemberId}',
  chatImages: baseUrl + '/api/chats/{chatId}/images',
  userAccountsForAdmin: baseUrl + '/api/users/accounts',
  manageUserAccountByAdmin: baseUrl + '/api/users/{userId}/accounts',
};
