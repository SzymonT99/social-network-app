import React, { useEffect, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './groupForum-jss';
import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ForumStats from './ForumStats/ForumStats';
import { getGroupForumStats } from '../../redux/actions/groupActions';
import GroupThread from './GroupThread/GroupThread';
import {
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import Popup from '../Popup/Popup';
import EventForm from '../Forms/EventForm';
import GroupThreadForm from '../Forms/GroupThreadForm';

const GroupForum = (props) => {
  const { classes, groupId, threads } = props;

  const history = useHistory();

  const dispatch = useDispatch();

  const groupForumStats = useSelector(
    (state) => state.groups.currentForumStats
  );

  const [threadsOrder, setThreadsOrder] = useState(1);
  const [openThreadCreationPopup, setOpenThreadCreationPopup] = useState(false);

  useEffect(() => {
    dispatch(getGroupForumStats(groupId));
  }, []);

  const handleChangeThreadsOrder = (event) => {
    setThreadsOrder(event.target.value);
  };

  const handleCloseThreadCreationPopup = () => {
    setOpenThreadCreationPopup(false);
  };

  return (
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
        {threads.map((thread) => (
          <GroupThread
            key={thread.threadId}
            groupId={groupId}
            threadId={thread.threadId}
            groupMemberId={thread.author.groupMemberId}
            authorId={thread.author.user.userId}
            userStatus={thread.author.user.activityStatus}
            memberName={
              thread.author.user.firstName + ' ' + thread.author.user.lastName
            }
            userProfilePhoto={thread.author.user.profilePhoto}
            title={thread.title}
            content={thread.content}
            threadImage={thread.image}
            answers={thread.answers}
            isEdited={thread.isEdited}
            createdDate={thread.createdAt}
          />
        ))}
        {threads.length === 0 && (
          <div className={classes.noContent}>
            <Typography variant="h6" fontWeight="bold">
              Brak postów
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
  );
};

GroupForum.propTypes = {
  classes: PropTypes.object.isRequired,
  groupId: PropTypes.number.isRequired,
  threads: PropTypes.array.isRequired,
};

export default withStyles(styles)(GroupForum);
