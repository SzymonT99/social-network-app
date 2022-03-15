import React, { useEffect, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './forumStats-jss';
import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Paper, Typography } from '@mui/material';
import defaultUserPhoto from '../../../assets/default-profile-photo.jpg';
import Avatar from '@mui/material/Avatar';

const ForumStats = (props) => {
  const { classes, heading, statsType, stats } = props;

  const history = useHistory();

  const [membersRanking, setMembersRanking] = useState([]);

  useEffect(() => {
    let ranking = [];

    ranking = stats.map((memberStats) => ({
      userMemberId: memberStats.user.userId,
      memberName: memberStats.user.firstName + ' ' + memberStats.user.lastName,
      memberPhoto: memberStats.user.profilePhoto,
      statsValue:
        statsType === 'created_threads'
          ? memberStats.threadsNumber
          : statsType === 'created_answers'
          ? memberStats.answersNumber
          : memberStats.answersAverageRating,
    }));
    setMembersRanking(ranking.filter((item) => item.statsValue !== 0));
  }, [stats]);

  return (
    <Paper elevation={4} className={classes.statsContainer}>
      <Typography variant="h6" className={classes.statsHeading}>
        {heading}
      </Typography>
      {membersRanking.map((rankingItem, index) => {
        if (index < 3)
          return (
            <div className={classes.statsItem} key={index}>
              <Typography variant="h6">{index + 1 + '.'}</Typography>
              <div className={classes.memberInformation}>
                <Avatar
                  src={
                    rankingItem.memberPhoto
                      ? rankingItem.memberPhoto.url
                      : defaultUserPhoto
                  }
                  alt={rankingItem.memberName}
                  className={classes.memberPhoto}
                  onClick={() =>
                    history.push('/app/profile/' + rankingItem.userMemberId)
                  }
                />
                <Typography
                  variant="subtitle2"
                  noWrap
                  className={classes.memberNameText}
                  onClick={() =>
                    history.push('/app/profile/' + rankingItem.userMemberId)
                  }
                >
                  {rankingItem.memberName}
                </Typography>
              </div>
              <Typography variant="subtitle1" fontWeight="bold">
                {rankingItem.statsValue}
              </Typography>
            </div>
          );
      })}
      {membersRanking.length === 0 && (
        <Typography marginTop="10px" variant="subtitle2">
          Brak aktywności
        </Typography>
      )}
    </Paper>
  );
};

ForumStats.propTypes = {
  classes: PropTypes.object.isRequired,
  statsType: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  stats: PropTypes.array.isRequired,
};

export default withStyles(styles)(ForumStats);
