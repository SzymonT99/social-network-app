import { endpoints } from './endpoints/endpoints';
import authorization from './authorization';

const createGroup = (formData) => {
  return fetch(endpoints.groups, {
    method: 'POST',
    headers: {
      Authorization: authorization(),
    },
    body: formData,
  });
};

const editGroup = (groupId, formData) => {
  return fetch(endpoints.groupDetails.replace('{groupId}', groupId), {
    method: 'PUT',
    headers: {
      Authorization: authorization(),
    },
    body: formData,
  });
};

const deleteGroup = (groupId) => {
  return fetch(endpoints.deleteGroup.replace('{groupId}', groupId), {
    method: 'DELETE',
    headers: {
      Authorization: authorization(),
    },
  });
};

const getGroupDetails = (groupId) => {
  return fetch(endpoints.groupDetails.replace('{groupId}', groupId), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

const getGroups = () => {
  return fetch(endpoints.groups, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

const getUserGroups = (userId) => {
  return fetch(endpoints.userGroups.replace('{userId}', userId), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

const getInterestingGroups = () => {
  return fetch(endpoints.interestingGroups, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

const inviteToGroup = (groupId, invitedUserId) => {
  return fetch(
    endpoints.inviteToGroup.replace('{groupId}', groupId) +
      '?' +
      new URLSearchParams({
        invitedUserId: invitedUserId,
      }),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    }
  );
};

const respondToGroupInvitation = (groupId, isInvitationAccepted) => {
  return fetch(
    endpoints.groupInvitationRespond.replace('{groupId}', groupId) +
      '?' +
      new URLSearchParams({
        isInvitationAccepted: isInvitationAccepted,
      }),
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    }
  );
};

const getGroupInvitations = () => {
  return fetch(endpoints.getUserGroupInvitations, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

const requestToJoinGroup = (groupId) => {
  return fetch(endpoints.groupJoinRequest.replace('{groupId}', groupId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

const getUsersWantedJoinGroup = (groupId) => {
  return fetch(endpoints.usersWantedJoinGroup.replace('{groupId}', groupId), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

const decideAboutUserGroupJoinRequest = (groupId, requesterId, isApproved) => {
  return fetch(
    endpoints.usersWantedJoinGroup.replace('{groupId}', groupId) +
      '?' +
      new URLSearchParams({
        requesterId: requesterId,
        isApproved: isApproved,
      }),
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    }
  );
};

const createGroupRule = (groupId, rule) => {
  return fetch(endpoints.groupRules.replace('{groupId}', groupId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
    body: JSON.stringify(rule),
  });
};

const editGroupRule = (groupId, ruleId, rule) => {
  return fetch(
    endpoints.manageGroupRule
      .replace('{groupId}', groupId)
      .replace('{ruleId}', ruleId),
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
      body: JSON.stringify(rule),
    }
  );
};

const deleteGroupRule = (groupId, ruleId) => {
  return fetch(
    endpoints.manageGroupRule
      .replace('{groupId}', groupId)
      .replace('{ruleId}', ruleId),
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    }
  );
};

const addGroupInterest = (groupId, interestId) => {
  return fetch(
    endpoints.manageGroupInterest
      .replace('{groupId}', groupId)
      .replace('{interestId}', interestId),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    }
  );
};

const deleteGroupInterest = (groupId, interestId) => {
  return fetch(
    endpoints.manageGroupInterest
      .replace('{groupId}', groupId)
      .replace('{interestId}', interestId),
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    }
  );
};

const getGroupPosts = (groupId) => {
  return fetch(endpoints.groupPosts.replace('{groupId}', groupId), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

const createGroupPost = (groupId, formData) => {
  return fetch(endpoints.groupPosts.replace('{groupId}', groupId), {
    method: 'POST',
    headers: {
      Authorization: authorization(),
    },
    body: formData,
  });
};

const editGroupPost = (postId, formData) => {
  return fetch(endpoints.manageGroupPost.replace('{postId}', postId), {
    method: 'PUT',
    headers: {
      Authorization: authorization(),
    },
    body: formData,
  });
};

const deleteGroupPost = (postId) => {
  return fetch(endpoints.managePost.replace('{postId}', postId), {
    method: 'DELETE',
    headers: {
      Authorization: authorization(),
    },
  });
};

const createGroupThread = (groupId, formData) => {
  return fetch(endpoints.createGroupThread.replace('{groupId}', groupId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
    body: formData,
  });
};

const editGroupThread = (threadId, formData) => {
  return fetch(endpoints.manageGroupThread.replace('{threadId}', threadId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
    body: formData,
  });
};

const deleteGroupThread = (threadId) => {
  return fetch(endpoints.manageGroupThread.replace('{threadId}', threadId), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

const createGroupThreadAnswer = (threadId, answer) => {
  return fetch(
    endpoints.createGroupThreadAnswer.replace('{threadId}', threadId),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
      body: JSON.stringify(answer),
    }
  );
};

const editGroupThreadAnswer = (answerId, answer) => {
  return fetch(
    endpoints.manageGroupThreadAnswer.replace('{answerId}', answerId),
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
      body: JSON.stringify(answer),
    }
  );
};

const deleteGroupThreadAnswer = (answerId) => {
  return fetch(
    endpoints.manageGroupThreadAnswer.replace('{answerId}', answerId),
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    }
  );
};

const createGroupThreadAnswerReview = (answerId, rate) => {
  return fetch(
    endpoints.createGroupThreadAnswerReview.replace('{answerId}', answerId),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
      body: JSON.stringify(rate),
    }
  );
};

const editGroupThreadAnswerReview = (reviewId, rate) => {
  return fetch(
    endpoints.manageGroupThreadAnswerReview.replace('{reviewId}', reviewId),
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
      body: JSON.stringify(rate),
    }
  );
};

const deleteGroupThreadAnswerReview = (reviewId) => {
  return fetch(
    endpoints.manageGroupThreadAnswerReview.replace('{reviewId}', reviewId),
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    }
  );
};

const setGroupMemberPermission = (groupId, memberId) => {
  return fetch(
    endpoints.groupMemberPermission
      .replace('{groupId}', groupId)
      .replace('{memberId}', memberId),
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    }
  );
};

export default {
  createGroup,
  editGroup,
  deleteGroup,
  getGroups,
  getUserGroups,
  getInterestingGroups,
  getGroupDetails,
  inviteToGroup,
  respondToGroupInvitation,
  getGroupInvitations,
  requestToJoinGroup,
  getUsersWantedJoinGroup,
  decideAboutUserGroupJoinRequest,
  createGroupRule,
  editGroupRule,
  deleteGroupRule,
  addGroupInterest,
  deleteGroupInterest,
  getGroupPosts,
  createGroupPost,
  editGroupPost,
  deleteGroupPost,
  createGroupThread,
  editGroupThread,
  deleteGroupThread,
  createGroupThreadAnswer,
  editGroupThreadAnswer,
  deleteGroupThreadAnswer,
  createGroupThreadAnswerReview,
  editGroupThreadAnswerReview,
  deleteGroupThreadAnswerReview,
  setGroupMemberPermission,
};
