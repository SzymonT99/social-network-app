import React, { useEffect, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './groupForum-jss';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ForumStats from './ForumStats/ForumStats';
import {
  getGroupForumStats,
  getGroupForumThreads,
} from '../../redux/actions/groupActions';
import GroupThread from './GroupThread/GroupThread';
import {
  Button,
  FormControl,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import Popup from '../Popup/Popup';
import GroupThreadForm from '../Forms/GroupThreadForm';
import CircularProgress from '@mui/material/CircularProgress';

const GroupForum = (props) => {
  const { classes, groupId, memberStatusOfUser } = props;

  const dispatch = useDispatch();

  const threads = useSelector((state) => state.groups.groupForum.threads);
  const groupForumStats = useSelector((state) => state.groups.groupForum.stats);

  const [threadsOrder, setThreadsOrder] = useState(1);
  const [openThreadCreationPopup, setOpenThreadCreationPopup] = useState(false);
  const [threadExpanded, setThreadExpanded] = useState('');
  const [threadsPageNumber, setThreadsPageNumber] = useState(1);

  const handleChangeThreadExpanded = (panel) => (event, isExpanded) => {
    setThreadExpanded(isExpanded ? panel : '');
  };

  useEffect(() => {
    dispatch(getGroupForumStats(groupId));
    dispatch(getGroupForumThreads(groupId));
  }, []);

  const handleChangeThreadsOrder = (event) => {
    setThreadsOrder(event.target.value);
  };

  const handleCloseThreadCreationPopup = () => {
    setOpenThreadCreationPopup(false);
  };

  const sortThreads = (threadsOrder) => {
    if (threadsOrder === 1) {
      threads.sort((x, y) => new Date(y.createdAt) - new Date(x.createdAt));
    } else if (threadsOrder === 2) {
      threads.sort((x, y) => {
        return y.answers.length - x.answers.length;
      });
    } else if (threadsOrder === 3) {
      threads.sort((a, b) => {
        let x = a.title.toUpperCase(),
          y = b.title.toUpperCase();
        return x === y ? 0 : x > y ? 1 : -1;
      });
    }
    return threads;
  };

  const handleChangeThreadsPageNumber = (event, value) => {
    setThreadsPageNumber(value);
  };

  return (
    <>
      {threads && groupForumStats ? (
        <div className={classes.forumContainer}>
          <div className={classes.forumLeftContent}>
            <Paper elevation={4} className={classes.forumActionsContainer}>
              <div className={classes.threadsOrderBox}>
                <Typography variant="subtitle1" className={classes.orderText}>
                  Sortuj według:
                </Typography>
                <FormControl className={classes.threadsOrderSelect}>
                  <Select
                    value={threadsOrder}
                    onChange={handleChangeThreadsOrder}
                    MenuProps={{ disableScrollLock: true }}
                  >
                    <MenuItem value={1}>Daty dodania</MenuItem>
                    <MenuItem value={2}>Ilości odpowiedzi</MenuItem>
                    <MenuItem value={3}>Kolejności alfabetycznej</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <Button
                variant="contained"
                className={classes.createThreadBtn}
                onClick={() => setOpenThreadCreationPopup(true)}
              >
                Utwórz wątek
              </Button>
              <Popup
                open={openThreadCreationPopup}
                type="groupThread"
                title="Utwórz wątek na forum"
                onClose={handleCloseThreadCreationPopup}
              >
                <GroupThreadForm
                  closePopup={handleCloseThreadCreationPopup}
                  groupId={groupId}
                />
              </Popup>
            </Paper>
            {threads &&
              sortThreads(threadsOrder)
                .slice((threadsPageNumber - 1) * 5, threadsPageNumber * 5)
                .map((thread) => (
                  <GroupThread
                    key={thread.threadId}
                    threadExpanded={
                      threadExpanded === 'panel-' + thread.threadId
                    }
                    changeThreadExpanded={handleChangeThreadExpanded(
                      'panel-' + thread.threadId
                    )}
                    groupId={groupId}
                    threadId={thread.threadId}
                    authorId={thread.author.user.userId}
                    userStatus={thread.author.user.activityStatus}
                    memberName={
                      thread.author.user.firstName +
                      ' ' +
                      thread.author.user.lastName
                    }
                    userProfilePhoto={thread.author.user.profilePhoto}
                    title={thread.title}
                    content={thread.content}
                    threadImage={thread.image}
                    answers={thread.answers}
                    isEdited={thread.isEdited}
                    createdDate={thread.createdAt}
                    accessToManagement={
                      memberStatusOfUser !== 'MEMBER' &&
                      memberStatusOfUser !== 'NOT_MEMBER'
                    }
                  />
                ))}
            {threads.length > 5 && (
              <Pagination
                className={classes.threadsPagination}
                count={threads && Math.ceil(threads.length / 5)}
                color="secondary"
                size="large"
                showFirstButton
                showLastButton
                page={threadsPageNumber}
                onChange={handleChangeThreadsPageNumber}
              />
            )}
            {threads.length === 0 && (
              <div className={classes.noContent}>
                <Typography variant="h6" fontWeight="bold">
                  Brak wątków
                </Typography>
              </div>
            )}
          </div>
          <div className={classes.forumRightContent}>
            <ForumStats
              statsType="created_threads"
              heading="Utworzone wątki"
              stats={groupForumStats}
            />
            <ForumStats
              statsType="created_answers"
              heading="Dodane odpowiedzi"
              stats={groupForumStats}
            />
            <ForumStats
              statsType="average_answer_ratings"
              heading="Średnia ocena odpowiedzi"
              stats={groupForumStats}
            />
          </div>
        </div>
      ) : (
        <div className={classes.loadingContainer}>
          <CircularProgress color="secondary" size="240px" />
        </div>
      )}
    </>
  );
};

GroupForum.propTypes = {
  classes: PropTypes.object.isRequired,
  groupId: PropTypes.number.isRequired,
  memberStatusOfUser: PropTypes.string.isRequired,
};

export default withStyles(styles)(GroupForum);
