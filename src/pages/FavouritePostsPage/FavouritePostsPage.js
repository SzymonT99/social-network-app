import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './favouritePostsPage-jss';
import { PropTypes } from 'prop-types';
import { Pagination, Typography } from '@mui/material';
import {
  refreshUserToken,
  setTokenRefreshing,
} from '../../redux/actions/authActions';
import PageHeader from '../../components/PageHeader/PageHeader';
import { getUserFavouritePosts } from '../../redux/actions/postActions';
import Post from '../../components/Post/Post';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

const FavouritePostsPage = (props) => {
  const { classes } = props;

  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.auth.user);
  const isUserRemember = useSelector((state) => state.auth.remember);
  const favouritePosts = useSelector((state) => state.auth.favouritePosts);

  const [postsPageNumber, setPostsPageNumber] = useState(1);

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
      dispatch(getUserFavouritePosts(loggedUser.userId));
    })();
  }, []);

  const handleChangePostsPageNumber = (event, value) => {
    setPostsPageNumber(value);
  };

  return (
    <div className={classes.wrapper}>
      <PageHeader heading="Ulubione posty" type="favourites" />
      <div className={classes.favouritesContainer}>
        <div className={classes.favouritesContent}>
          {favouritePosts
            .slice((postsPageNumber - 1) * 6, postsPageNumber * 6)
            .map((favouritePost) => (
              <Post
                key={favouritePost.postId}
                authorId={favouritePost.postAuthor.userId}
                authorName={
                  favouritePost.postAuthor.firstName +
                  ' ' +
                  favouritePost.postAuthor.lastName
                }
                profilePhoto={favouritePost.postAuthor.profilePhoto}
                createdDate={new Date(favouritePost.createdAt)}
                images={favouritePost.images}
                likesNumber={favouritePost.likes.length}
                sharesNumber={favouritePost.sharing.length}
                commentsNumber={favouritePost.comments.length}
                comments={favouritePost.comments}
                content={favouritePost.text}
                userStatus={favouritePost.postAuthor.activityStatus}
                postId={favouritePost.postId}
                likes={favouritePost.likes}
                isEdited={favouritePost.isEdited}
                isPublic={favouritePost.isPublic}
                isCommentingBlocked={favouritePost.isCommentingBlocked}
                editionDate={favouritePost.editedAt}
                isFavourite
              />
            ))}
        </div>
        {favouritePosts ? (
          favouritePosts.length > 6 && (
            <Paper elevation={4} className={classes.paginationContainer}>
              <Pagination
                className={classes.postsPagination}
                count={favouritePosts && Math.ceil(favouritePosts.length / 6)}
                color="secondary"
                size="large"
                showFirstButton
                showLastButton
                page={postsPageNumber}
                onChange={handleChangePostsPageNumber}
              />
            </Paper>
          )
        ) : (
          <div className={classes.loadingContainer}>
            <CircularProgress color="secondary" />
          </div>
        )}
        {favouritePosts.length === 0 && (
          <div className={classes.noContent}>
            <Typography variant="h5">Brak ulubionych postów</Typography>
          </div>
        )}
      </div>
    </div>
  );
};

FavouritePostsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FavouritePostsPage);
