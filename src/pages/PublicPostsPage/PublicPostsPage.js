import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './publicPostsPage-jss';
import { PropTypes } from 'prop-types';
import PageHeader from '../../components/PageHeader/PageHeader';
import { getPublicPosts } from '../../redux/actions/postActions';
import postTypes from '../../redux/types/postTypes';
import Post from '../../components/Post/Post';
import { Link } from '@mui/material';
import { getAllUsersInformation } from '../../redux/actions/userActivityActions';

const PublicPostsPage = (props) => {
  const { classes } = props;

  const dispatch = useDispatch();
  const [postsPageNumber, setPostsPageNumber] = useState(0);
  const [areMorePosts, setAreMorePosts] = useState(false);

  const publicPosts = useSelector((state) => state.activity.publicPosts);

  useEffect(() => {
    dispatch({
      type: postTypes.CLEAR_PUBLIC_POSTS,
    });
    dispatch(getAllUsersInformation());
    dispatch(getPublicPosts(postsPageNumber, 5)).then((data) => {
      if (data.posts.length === 5) {
        setAreMorePosts(true);
      } else {
        setAreMorePosts(false);
      }
    });
  }, []);

  const fetchMorePosts = () => {
    dispatch(getPublicPosts(postsPageNumber + 1, 5)).then((data) => {
      if (data.posts.length === 5) {
        setAreMorePosts(true);
      } else {
        setAreMorePosts(false);
      }
    });
    setPostsPageNumber(postsPageNumber + 1);
  };

  return (
    <div className={classes.wrapper}>
      <PageHeader heading="Publiczne posty" type="post" />
      <div className={classes.postContainer}>
        {publicPosts.map((item) => (
          <Post
            key={item.postId}
            postId={item.postId}
            authorId={item.postAuthor.userId}
            authorName={
              item.postAuthor.firstName + ' ' + item.postAuthor.lastName
            }
            profilePhoto={item.postAuthor.profilePhoto}
            userStatus={item.postAuthor.activityStatus}
            createdDate={new Date(item.createdAt)}
            images={item.images}
            likesNumber={item.likes.length}
            sharesNumber={item.sharing.length}
            commentsNumber={item.comments.length}
            comments={item.comments}
            content={item.text}
            likes={item.likes}
            isEdited={item.isEdited}
            isPublic={item.isPublic}
            isCommentingBlocked={item.isCommentingBlocked}
            editionDate={item.editedAt}
            actionsBlocked
          />
        ))}
        {areMorePosts && (
          <div className={classes.moreItemsContainer} onClick={fetchMorePosts}>
            <Link
              component="button"
              variant="subtitle2"
              className={classes.moreCommentsLink}
            >
              Zobacz więcej
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

PublicPostsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PublicPostsPage);
