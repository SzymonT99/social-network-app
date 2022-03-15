import React, { useEffect } from 'react';
import { withStyles } from '@mui/styles';
import styles from './groupForum-jss';
import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ForumStats from './ForumStats/ForumStats';
import { getGroupForumStats } from '../../redux/actions/groupActions';
import GroupThread from './GroupThread/GroupThread';

const GroupForum = (props) => {
  const { classes, groupId } = props;

  const history = useHistory();

  const dispatch = useDispatch();

  const groupForumStats = useSelector(
    (state) => state.groups.currentForumStats
  );

  useEffect(() => {
    dispatch(getGroupForumStats(groupId));
  }, []);

  return (
    <div className={classes.forumContainer}>
      <div className={classes.forumLeftContent}>
        <GroupThread />
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
};

export default withStyles(styles)(GroupForum);
