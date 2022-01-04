import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';
import { endpoints } from '../../services/endpoints/endpoints';
import Button from '@mui/material/Button';

const TestPage = (props) => {
  const { children } = props;

  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState({});

  let accessToken = useSelector((state) => state.auth.accessToken);
  let refreshToken = useSelector((state) => state.auth.refreshToken);
  let userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    (async () => {
      await getUserProfileDetails();
    })();
  }, [userId]);

  const getUserProfileDetails = () => {
    fetch(endpoints.userProfile.replace('{userId}', userId), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    })
      .then((response) => {
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            console.log(data);
            setUserDetails(data);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Paper
        style={{
          margin: '60px 200px',
          padding: '60px',
          display: 'flex',
          flexDirection: 'column',
        }}
        elevation={7}
      >
        <Button
          style={{
            alignSelf: 'flex-end',
            width: '140px',
            fontSize: '18px',
          }}
          fullWidth={false}
          variant="text"
          href="/auth/login"
          onClick={() => dispatch(logoutUser())}
        >
          Wyloguj się
        </Button>
        <p>
          <b>User id:</b> {userId}
        </p>
        <p>
          <b>User accessToken:</b>
          <br /> {accessToken}
        </p>
        <p>
          <b>User refreshToken:</b> <br /> {refreshToken}
        </p>
        <h4>Dane profilowe:</h4>
        <p>
          <b>User isPublic:</b> <br /> {userDetails.isPublic ? 'true' : 'false'}
        </p>
        <p>
          <b>User firstName:</b> <br /> {userDetails.firstName}
        </p>
        <p>
          <b>User lastName:</b> <br /> {userDetails.lastName}
        </p>
        <p>
          <b>User aboutUser:</b> <br /> {userDetails.aboutUser}
        </p>
        <p>
          <b>User gender:</b> <br /> {userDetails.gender}
        </p>
        <p>
          <b>User dateOfBirth:</b> <br /> {userDetails.dateOfBirth}
        </p>
        <p>
          <b>User age:</b> <br /> {userDetails.age}
        </p>
        <p>
          <b>User job:</b> <br /> {userDetails.job}
        </p>
        <p>
          <b>User relationshipStatus:</b> <br />{' '}
          {userDetails.relationshipStatus}
        </p>
        <p>
          <b>User skills:</b> <br /> {userDetails.skills}
        </p>
        <p>
          <b>User profilePhoto:</b> <br />{' '}
          {JSON.stringify(userDetails.profilePhoto)}
        </p>
        <p>
          <b>User address:</b> <br /> {JSON.stringify(userDetails.profilePhoto)}
        </p>
        <p>
          <b>User schools:</b> <br /> {JSON.stringify(userDetails.schools)}
        </p>
        <p>
          <b>User workPlaces:</b> <br />{' '}
          {JSON.stringify(userDetails.workPlaces)}
        </p>
      </Paper>
    </>
  );
};

export default TestPage;
