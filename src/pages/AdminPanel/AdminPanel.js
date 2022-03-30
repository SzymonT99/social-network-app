import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './adminPanel-jss';
import { PropTypes } from 'prop-types';
import { Divider, Paper, Typography } from '@mui/material';
import {
  refreshUserToken,
  setTokenRefreshing,
} from '../../redux/actions/authActions';
import { Redirect, useHistory } from 'react-router-dom';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import {
  deleteUserAccountByAdmin,
  getUserAccounts,
} from '../../redux/actions/adminActions';
import DeleteIcon from '@mui/icons-material/Delete';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const AdminPanel = (props) => {
  const { classes } = props;

  const dispatch = useDispatch();
  const history = useHistory();

  const loggedUser = useSelector((state) => state.auth.user);
  const isUserRemember = useSelector((state) => state.auth.remember);

  const isAdmin = loggedUser.roles.indexOf('ROLE_ADMIN') > -1;

  const userAccounts = useSelector((state) => state.adminPanel.accounts);

  const [pageSize, setPageSize] = useState(10);

  const handleClickDeleteUser = useCallback(
    (id) => () => {
      setTimeout(() => {
        dispatch(deleteUserAccountByAdmin(id));
      });
    },
    []
  );

  const handleRowEditCommit = useCallback((params) => {
    console.log(params);
  }, []);

  const tableColumns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', type: 'number', width: 30 },
      {
        field: 'username',
        headerName: 'Nazwa użytkownika',
        editable: true,
        width: 150,
      },
      {
        field: 'email',
        headerName: 'Email',
        editable: true,
        width: 250,
      },
      {
        field: 'firstName',
        headerName: 'Imię',
        editable: true,
        width: 140,
      },
      {
        field: 'lastName',
        headerName: 'Nazwisko',
        editable: true,
        width: 140,
      },
      {
        field: 'phoneNumber',
        headerName: 'Nr. tel.',
        editable: true,
        width: 110,
      },
      {
        field: 'incorrectLoginCounter',
        headerName: 'Nieudane logowania',
        editable: true,
        width: 150,
      },
      {
        field: 'activateAccount',
        headerName: 'Konto aktywne',
        editable: true,
        type: 'boolean',
        width: 120,
      },
      {
        field: 'isBlocked',
        headerName: 'Zablokowane',
        editable: true,
        type: 'boolean',
        width: 120,
      },
      {
        field: 'isBanned',
        headerName: 'Zbanowane',
        editable: true,
        type: 'boolean',
        width: 120,
      },
      {
        field: 'action',
        headerName: 'Akcje',
        type: 'actions',
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Usuń"
            onClick={handleClickDeleteUser(params.id)}
          />,
          <GridActionsCellItem
            icon={<ManageAccountsIcon />}
            label="Zarządzaj aktywnością"
            onClick={() => history.push('/app/profile/' + params.id)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<ChatBubbleIcon />}
            label="Sprawdź konwersacje"
            showInMenu
          />,
        ],
      },
    ],
    [handleClickDeleteUser]
  );

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
      dispatch(getUserAccounts());
    })();
  }, []);

  if (!isAdmin) {
    return <Redirect to="/app" />;
  }

  return (
    <div className={classes.wrapper}>
      <Paper elevation={4} className={classes.adminPanelContainer}>
        <Typography variant="h5">Zarządzanie kontem użytkowników</Typography>
        <Divider className={classes.divider} />
        <div className={classes.usersTableContainer}>
          <DataGrid
            columns={tableColumns}
            rows={userAccounts}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 15]}
            pagination
            disableSelectionOnClick
            onCellEditCommit={handleRowEditCommit}
          />
        </div>
      </Paper>
    </div>
  );
};

AdminPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminPanel);
