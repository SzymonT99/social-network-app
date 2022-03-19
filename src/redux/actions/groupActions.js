import groupService from '../../services/groupService';
import groupTypes from '../types/groupTypes';
import { showNotification } from './notificationActions';
import userProfileTypes from '../types/userProfileTypes';
import postTypes from '../types/postTypes';
import authTypes from '../types/authTypes';
import { getUserProfile } from './userProfileActions';
import { getUserFriends } from './friendAction';
import { getAllUsersInformation } from './userActivityActions';
import eventTypes from '../types/eventTypes';

export const createGroup = (groupFormData) => (dispatch) => {
  return groupService
    .createGroup(groupFormData)
    .then((response) => {
      if (response.status === 201) {
        dispatch(getGroups());
        dispatch(showNotification('success', 'Utworzono grupę'));
      } else if (response.status === 400) {
        dispatch(showNotification('warning', 'Błędny format danych'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editGroup = (groupId, groupFormData) => (dispatch, getState) => {
  return groupService
    .editGroup(groupId, groupFormData)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getGroups());
        dispatch(getGroupDetails(getState().groups.groupDetails.groupId));
        dispatch(showNotification('success', 'Edytowano informacje o grupie'));
      } else if (response.status === 404) {
        dispatch(showNotification('warning', 'Nie należysz do tej grupy'));
      } else if (response.status === 403) {
        dispatch(showNotification('warning', 'Brak dostępu do edycji grupy'));
      } else if (response.status === 400) {
        dispatch(showNotification('warning', 'Błędny format danych'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteGroup = (groupId) => (dispatch) => {
  return groupService
    .deleteGroup(groupId)
    .then((response) => {
      if (response.status === 200) {
        dispatch(showNotification('success', 'Usunięto grupę'));
      } else if (response.status === 404) {
        dispatch(showNotification('warning', 'Nie należysz do tej grupy'));
      } else if (response.status === 403) {
        dispatch(
          showNotification('warning', 'Tylko administrator może usunąć grupę')
        );
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getGroupDetails = (groupId) => (dispatch) => {
  return groupService
    .getGroupDetails(groupId)
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: groupTypes.FETCH_GROUP_DETAILS,
            payload: {
              groupDetails: data,
            },
          });
          return data;
        });
      } else if (response.status === 403) {
        dispatch(showNotification('warning', 'Grupa została usunięta'));
        window.location.href = '/app/groups';
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getGroups = () => (dispatch) => {
  return groupService
    .getGroups()
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: groupTypes.FETCH_GROUPS,
            payload: {
              publicGroups: data,
            },
          });
          return data;
        });
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserGroups = (userId) => (dispatch) => {
  return groupService
    .getUserGroups(userId)
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: userProfileTypes.FETCH_USER_GROUPS,
            payload: {
              userGroups: data,
            },
          });
          return data;
        });
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserInterestingGroups = () => (dispatch) => {
  return groupService
    .getInterestingGroups()
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: groupTypes.FETCH_USER_INTERESTING_GROUPS,
            payload: {
              userInterestingGroups: data,
            },
          });
          return data;
        });
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const inviteToGroup =
  (groupId, invitedUserId) => (dispatch, getState) => {
    return groupService
      .inviteToGroup(groupId, invitedUserId)
      .then((response) => {
        if (response.status === 201) {
          dispatch(showNotification('success', 'Wysłano zaproszenie'));
          dispatch(getGroupInvitations());
          dispatch(getGroupDetails(getState().groups.groupDetails.groupId));
        } else if (response.status === 403) {
          dispatch(
            showNotification(
              'warning',
              'Tylko administrator oraz zastępca może wysyłać zaproszenie'
            )
          );
        } else if (response.status === 409) {
          dispatch(showNotification('warning', 'Już wysłano zaproszenie'));
        } else if (response.status === 410) {
          dispatch(
            showNotification(
              'warning',
              'Użytkownik został wcześniej usunięty z grupy'
            )
          );
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const respondToGroupInvitation =
  (groupId, isInvitationAccepted) => (dispatch) => {
    return groupService
      .respondToGroupInvitation(groupId, isInvitationAccepted)
      .then((response) => {
        if (response.status === 200) {
          dispatch(getGroups());
          if (isInvitationAccepted) {
            dispatch(showNotification('success', 'Dołączono do grupy'));
          } else {
            dispatch(showNotification('success', 'Odrzucono zaproszenie'));
          }
        } else if (response.status === 409) {
          dispatch(
            showNotification('warning', 'Już odpowiedziałeś na zaproszenie')
          );
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const getGroupInvitations = () => (dispatch) => {
  return groupService
    .getGroupInvitations()
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: groupTypes.FETCH_GROUP_INVITATIONS,
            payload: {
              groupInvitations: data,
            },
          });
        });
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUsersWantedJoinGroup = (groupId) => (dispatch) => {
  return groupService
    .getUsersWantedJoinGroup(groupId)
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: groupTypes.FETCH_USER_GROUP_JOIN_REQUESTS,
            payload: {
              userGroupJoinRequests: data,
            },
          });
        });
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const requestToJoinGroup = (groupId) => (dispatch, getState) => {
  return groupService
    .requestToJoinGroup(groupId)
    .then((response) => {
      if (response.status === 201) {
        dispatch(
          showNotification('success', 'Wysłano prośbę o dodanie do grupy')
        );
        dispatch(
          getUsersWantedJoinGroup(getState().groups.groupDetails.groupId)
        );
      } else if (response.status === 409) {
        dispatch(
          showNotification(
            'warning',
            'Już wysłałeś prośbę lub otrzymałeś zaproszenie'
          )
        );
      } else if (response.status === 410) {
        dispatch(
          showNotification(
            'warning',
            'Nie możesz dołączyć do grupy, z której Cię usunięto'
          )
        );
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const decideAboutUserGroupJoinRequest =
  (groupId, requesterId, isApproved) => (dispatch, getState) => {
    return groupService
      .decideAboutUserGroupJoinRequest(groupId, requesterId, isApproved)
      .then((response) => {
        if (response.status === 200) {
          if (isApproved) {
            dispatch(
              showNotification('success', 'Zaakceptowano zgłoszenie do grupy')
            );
          } else {
            dispatch(
              showNotification('success', 'Odrzucono zgłoszenie do grupy')
            );
          }
          dispatch(getUsersWantedJoinGroup(groupId));
          dispatch(getGroupDetails(groupId));
        } else if (response.status === 403) {
          dispatch(
            showNotification(
              'warning',
              'Tylko administrator oraz zastępca może dcydować o zgłoszeniach'
            )
          );
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const createGroupRule = (groupId, rule) => (dispatch, getState) => {
  return groupService
    .createGroupRule(groupId, rule)
    .then((response) => {
      if (response.status === 201) {
        dispatch(getGroupDetails(getState().groups.groupDetails.groupId));
        dispatch(showNotification('success', 'Dodano nową zasadę w grupie'));
      } else if (response.status === 400) {
        dispatch(showNotification('warning', 'Błędny format danych'));
      } else if (response.status === 403) {
        dispatch(showNotification('warning', 'Brak uprawnienia do dodawania'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editGroupRule =
  (groupId, ruleId, rule) => (dispatch, getState) => {
    return groupService
      .editGroupRule(groupId, ruleId, rule)
      .then((response) => {
        if (response.status === 200) {
          dispatch(getGroupDetails(getState().groups.groupDetails.groupId));
          dispatch(showNotification('success', 'Edytowano zasadę w grupie'));
        } else if (response.status === 400) {
          dispatch(showNotification('warning', 'Błędny format danych'));
        } else if (response.status === 403) {
          dispatch(
            showNotification('warning', 'Brak uprawnienia do edytowania')
          );
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const deleteGroupRule = (groupId, ruleId) => (dispatch, getState) => {
  return groupService
    .deleteGroupRule(groupId, ruleId)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getGroupDetails(getState().groups.groupDetails.groupId));
        dispatch(showNotification('success', 'Usunięto zasadę w grupie'));
      } else if (response.status === 400) {
        dispatch(showNotification('warning', 'Błędny format danych'));
      } else if (response.status === 403) {
        dispatch(showNotification('warning', 'Brak uprawnienia do usuwania'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addGroupInterest =
  (groupId, interestId) => (dispatch, getState) => {
    return groupService
      .addGroupInterest(groupId, interestId)
      .then((response) => {
        if (response.status === 201) {
          dispatch(getGroupDetails(getState().groups.groupDetails.groupId));
          dispatch(
            showNotification('success', 'Dodano dziedzine zainteresowań grupy')
          );
        } else if (response.status === 409) {
          dispatch(
            showNotification('warning', 'Już dodano to zainteresowanie')
          );
        } else if (response.status === 403) {
          dispatch(
            showNotification('warning', 'Brak uprawnienia do dodawania')
          );
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const deleteGroupInterest =
  (groupId, interestId) => (dispatch, getState) => {
    return groupService
      .deleteGroupInterest(groupId, interestId)
      .then((response) => {
        if (response.status === 200) {
          dispatch(getGroupDetails(getState().groups.groupDetails.groupId));
          dispatch(
            showNotification(
              'success',
              'Usunięto dziedzine zainteresowań grupy'
            )
          );
        } else if (response.status === 400) {
          dispatch(
            showNotification('warning', 'Zainteresowanie nie należało do grupy')
          );
        } else if (response.status === 403) {
          dispatch(showNotification('warning', 'Brak uprawnienia do usuwania'));
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const createGroupPost = (groupId, postFormData) => (dispatch) => {
  return groupService
    .createGroupPost(groupId, postFormData)
    .then((response) => {
      if (response.status === 201) {
        dispatch(getGroupDetails(groupId));
        dispatch(showNotification('success', 'Utworzono nowy post w grupie'));
      } else if (response.status === 403) {
        dispatch(showNotification('warning', 'Nie należysz do danej grupy'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editGroupPost = (groupId, postId, postFormData) => (dispatch) => {
  return groupService
    .editGroupPost(postId, postFormData)
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: postTypes.EDIT_POST,
            payload: {
              postId: data.postId,
              updatedPost: data,
            },
          });
          dispatch(getGroupDetails(groupId));
          dispatch(showNotification('success', 'Edytowano post grupy'));
          return response;
        });
      } else if (response.status === 403) {
        dispatch(showNotification('warning', 'Zabroniona akcja'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteGroupPost = (groupId, postId) => (dispatch) => {
  return groupService
    .deleteGroupPost(postId)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getGroupDetails(groupId));
        dispatch(showNotification('success', 'Usunięto post grupy'));
      } else if (response.status === 403) {
        dispatch(showNotification('warning', 'Zabroniona akcja'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createGroupThread = (groupId, groupThread) => (dispatch) => {
  return groupService
    .createGroupThread(groupId, groupThread)
    .then((response) => {
      if (response.status === 201) {
        dispatch(getGroupForumThreads(groupId));
        dispatch(showNotification('success', 'Utworzono nowy wątek w grupie'));
      } else if (response.status === 404) {
        dispatch(showNotification('warning', 'Nie należysz do danej grupy'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editGroupThread =
  (groupId, threadId, groupThread) => (dispatch) => {
    return groupService
      .editGroupThread(threadId, groupThread)
      .then((response) => {
        if (response.status === 200) {
          dispatch(getGroupForumThreads(groupId));
          dispatch(showNotification('success', 'Edytowano wątek w grupie'));
        } else if (response.status === 403) {
          dispatch(showNotification('warning', 'Zabroniona akcja'));
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const deleteGroupThread = (groupId, threadId) => (dispatch) => {
  return groupService
    .deleteGroupThread(threadId)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getGroupForumThreads(groupId));
        dispatch(showNotification('success', 'Usunięto wątek w grupie'));
      } else if (response.status === 403) {
        dispatch(showNotification('warning', 'Zabroniona akcja'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createGroupThreadAnswer =
  (groupId, threadId, answer) => (dispatch) => {
    return groupService
      .createGroupThreadAnswer(threadId, answer)
      .then((response) => {
        if (response.status === 201) {
          dispatch(getGroupForumThreads(groupId));
          dispatch(
            showNotification(
              'success',
              'Utworzono nowy komentarz na wątek w grupie'
            )
          );
        } else if (response.status === 404) {
          dispatch(showNotification('warning', 'Nie należysz do danej grupy'));
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const editGroupThreadAnswer =
  (groupId, answerId, answer) => (dispatch) => {
    return groupService
      .editGroupThreadAnswer(answerId, answer)
      .then((response) => {
        if (response.status === 200) {
          dispatch(getGroupForumThreads(groupId));
          dispatch(
            showNotification('success', 'Edytowano komentarz na wątek w grupie')
          );
        } else if (response.status === 403) {
          dispatch(showNotification('warning', 'Zabroniona akcja'));
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const deleteGroupThreadAnswer = (groupId, answerId) => (dispatch) => {
  return groupService
    .deleteGroupThreadAnswer(answerId)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getGroupForumThreads(groupId));
        dispatch(
          showNotification('success', 'Usunięto komentarz na wątek w grupie')
        );
      } else if (response.status === 403) {
        dispatch(showNotification('warning', 'Zabroniona akcja'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createGroupThreadAnswerReview =
  (groupId, answerId, rate) => (dispatch) => {
    return groupService
      .createGroupThreadAnswerReview(answerId, rate)
      .then((response) => {
        if (response.status === 201) {
          dispatch(getGroupForumThreads(groupId));
          dispatch(
            showNotification(
              'success',
              'Dodano ocenę komentarza na wątek w grupie'
            )
          );
        } else if (response.status === 404) {
          dispatch(showNotification('warning', 'Nie należysz do danej grupy'));
        }
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const editGroupThreadAnswerReview =
  (groupId, reviewId, rate) => (dispatch) => {
    return groupService
      .editGroupThreadAnswerReview(reviewId, rate)
      .then((response) => {
        if (response.status === 200) {
          dispatch(getGroupForumThreads(groupId));
          dispatch(
            showNotification(
              'success',
              'Edytowano ocenę komentarza na wątek w grupie'
            )
          );
        } else if (response.status === 403) {
          dispatch(showNotification('warning', 'Zabroniona akcja'));
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const setGroupMemberPermission =
  (groupId, memberId, permission) => (dispatch) => {
    return groupService
      .setGroupMemberPermission(groupId, memberId, permission)
      .then((response) => {
        if (response.status === 200) {
          dispatch(getGroupDetails(groupId));
          dispatch(
            showNotification('success', 'Zmieniono uprawnienie członka grupy')
          );
        } else if (response.status === 400) {
          dispatch(showNotification('warning', 'Nieznane uprawnienie'));
        } else if (response.status === 403) {
          dispatch(
            showNotification(
              'warning',
              'Tylko założyciel grupy może ustalać uprawnienia'
            )
          );
        } else if (response.status === 404) {
          dispatch(showNotification('warning', 'Nie należysz do danej grupy'));
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const deleteGroupMember = (groupId, memberId) => (dispatch) => {
  return groupService
    .deleteGroupMember(groupId, memberId)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getGroupDetails(groupId));
        dispatch(showNotification('success', 'Usunięto członka grupy'));
      } else if (response.status === 403) {
        dispatch(
          showNotification(
            'warning',
            'Tylko administrator lub zastępca może usuwać członków'
          )
        );
      } else if (response.status === 404) {
        dispatch(showNotification('warning', 'Nie należysz do danej grupy'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const leaveGroup = (groupId) => (dispatch) => {
  return groupService
    .leaveGroup(groupId)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getGroupDetails(groupId));
        dispatch(showNotification('success', 'Opuszczono grupę'));
      } else if (response.status === 404) {
        dispatch(showNotification('warning', 'Nie należysz do danej grupy'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getGroupForumThreads = (groupId) => (dispatch) => {
  return groupService
    .getGroupForum(groupId)
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: groupTypes.FETCH_GROUP_FORUM,
            payload: {
              forumThreads: data,
            },
          });
          dispatch(getGroupForumStats(groupId));
          return data;
        });
      } else if (response.status === 404) {
        dispatch(showNotification('warning', 'Nie należysz do danej grupy'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getGroupForumStats = (groupId) => (dispatch) => {
  return groupService
    .getGroupForumStats(groupId)
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: groupTypes.FETCH_GROUP_FORUM_STATS,
            payload: {
              forumStats: data,
            },
          });
        });
      } else if (response.status === 404) {
        dispatch(showNotification('warning', 'Nie należysz do danej grupy'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
