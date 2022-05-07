import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './postDetailsPage-jss';
import { PropTypes } from 'prop-types';
import {
  refreshUserToken,
  setTokenRefreshing,
} from '../../redux/actions/authActions';
import PageHeader from '../../components/PageHeader/PageHeader';
import { useParams } from 'react-router-dom';
import { getPostDetails } from '../../redux/actions/postActions';
import Post from '../../components/Post/Post';

const PostDetailsPage = (props) => {
  const { classes } = props;

  let { postId } = useParams();

  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.auth.user);
  const isUserRemember = useSelector((state) => state.auth.remember);

  const currentPost = useSelector((state) => state.activity.postDetails);

  useEffect(() => {
    (async () => {
      if (
        isUserRemember &&
        new Date() > new Date(loggedUser.accessTokenExpirationDate)
      ) {
        dispatch(setTokenRefreshing(true));
        await dispatch(refreshUserToken(loggedUser.refreshToken)).then(() => {
          dispatch(setTokenRefreshing(false));
        });
      }
      dispatch(getPostDetails(postId));
    })();
  }, [postId]);

  return (
    <div className={classes.wrapper}>
      <PageHeader heading="Szczegóły posta" type="post" />
      <div className={classes.postContainer}>
        {currentPost !== null && (
          <Post
            postId={currentPost.postId}
            authorId={currentPost.postAuthor.userId}
            authorName={
              currentPost.postAuthor.firstName +
              ' ' +
              currentPost.postAuthor.lastName
            }
            profilePhoto={currentPost.postAuthor.profilePhoto}
            userStatus={currentPost.postAuthor.activityStatus}
            createdDate={new Date(currentPost.createdAt)}
            images={currentPost.images}
            likesNumber={currentPost.likes.length}
            sharesNumber={currentPost.sharing.length}
            commentsNumber={currentPost.comments.length}
            comments={currentPost.comments}
            content={currentPost.text}
            likes={currentPost.likes}
            isEdited={currentPost.isEdited}
            isPublic={currentPost.isPublic}
            isCommentingBlocked={currentPost.isCommentingBlocked}
            editionDate={currentPost.editedAt}
            accessToManagement={loggedUser.roles.includes('ROLE_ADMIN')}
          />
        )}
      </div>
    </div>
  );
};

PostDetailsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostDetailsPage);
