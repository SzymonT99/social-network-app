import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './adminPanel-jss';
import { PropTypes } from 'prop-types';
import { Badge, Divider, IconButton, Paper, Typography } from '@mui/material';
import {
  refreshUserToken,
  setTokenRefreshing,
} from '../../redux/actions/authActions';
import { Redirect, useHistory } from 'react-router-dom';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import {
  deleteUserAccountByAdmin,
  getUserAccounts,
  getUserReports,
  manageUserAccount,
} from '../../redux/actions/adminActions';
import DeleteIcon from '@mui/icons-material/Delete';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ReportIcon from '@mui/icons-material/Report';
import { setSelectedUser } from '../../redux/actions/chatAction';
import Popup from '../../components/Popup/Popup';
import UserReport from '../../components/UserReport/UserReport';

const useQuery = (page, pageSize) => {
  const dispatch = useDispatch();

  const [rowCount, setRowCount] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let active = true;

    setIsLoading(true);
    setRowCount(undefined);
    dispatch(getUserAccounts(page, pageSize)).then((data) => {
      if (!active) {
        return;
      }
      setIsLoading(false);
      setRowCount(data.totalItems);
    });

    return () => {
      active = false;
    };
  }, [page, pageSize]);

  return { isLoading, rowCount };
};

const AdminPanel = (props) => {
  const { classes } = props;

  const dispatch = useDispatch();
  const history = useHistory();

  const loggedUser = useSelector((state) => state.auth.user);
  const isUserRemember = useSelector((state) => state.auth.remember);

  const isAdmin = loggedUser.roles.indexOf('ROLE_ADMIN') > -1;

  const userAccounts = useSelector((state) => state.adminPanel.accounts);
  const reports = useSelector((state) => state.adminPanel.reports);

  const [rowsState, setRowsState] = useState({
    page: 0,
    pageSize: 5,
  });
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [openUserReportsPopup, setOpenUserReportsPopup] = useState(false);

  const { isLoading, rowCount } = useQuery(rowsState.page, rowsState.pageSize);

  const [rowCountState, setRowCountState] = useState(rowCount || 0);

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      rowCount !== undefined ? rowCount : prevRowCountState
    );
  }, [rowCount, setRowCountState]);

  const handleClickDeleteUser = useCallback(
    (id) => () => {
      setTimeout(() => {
        dispatch(deleteUserAccountByAdmin(id));
      });
    },
    [userAccounts]
  );

  const handleClickShowUserChats = useCallback(
    (id) => () => {
      setTimeout(() => {
        dispatch(setSelectedUser(id));
        history.push('/app/chat');
      });
    },
    []
  );

  const handleCellEditCommit = useCallback(
    (params, event) => {
      const currentAccount = userAccounts.find(
        (account) => account.id === params.id
      );
      let updatedAccount = {
        ...currentAccount,
        [params.field]: params.value,
      };
      if (JSON.stringify(currentAccount) !== JSON.stringify(updatedAccount)) {
        delete updatedAccount.id;
        dispatch(manageUserAccount(params.id, updatedAccount));
      }
    },
    [userAccounts]
  );

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
        width: 140,
      },
      {
        field: 'activateAccount',
        headerName: 'Konto aktywne',
        editable: true,
        type: 'boolean',
        width: 110,
      },
      {
        field: 'isBlocked',
        headerName: 'Zablokowane',
        editable: true,
        type: 'boolean',
        width: 110,
      },
      {
        field: 'isBanned',
        headerName: 'Zbanowane',
        editable: true,
        type: 'boolean',
        width: 110,
      },
      {
        field: 'action',
        headerName: 'Akcje',
        width: 80,
        type: 'actions',
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Usuń"
            title="Usuń konto"
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
            onClick={handleClickShowUserChats(params.id)}
            showInMenu
          />,
        ],
      },
      {
        field: 'reports',
        headerName: 'Zgłoszenia',
        width: 110,
        type: 'actions',
        renderCell: (params) => (
          <div className={classes.reportCellContainer}>
            <IconButton
              onClick={() => {
                setSelectedUserId(params.id);
                setOpenUserReportsPopup(true);
              }}
            >
              <Badge
                variant="dot"
                overlap="circular"
                color="secondary"
                badgeContent={
                  reports.filter(
                    (report) =>
                      report.suspectUser.userId === params.id &&
                      report.isConfirmed === null
                  ).length > 0
                    ? 1
                    : 0
                }
              >
                <ReportIcon className={classes.reportIcon} />
              </Badge>
            </IconButton>
          </div>
        ),
      },
    ],
    [reports, handleClickDeleteUser, handleClickShowUserChats]
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
      dispatch(getUserReports());
    })();
  }, []);

  if (!isAdmin) {
    return <Redirect to="/app" />;
  }

  const handleCloseUserReportsPopup = () => {
    setOpenUserReportsPopup(false);
  };

  return (
    <div className={classes.wrapper}>
      <Paper elevation={4} className={classes.adminPanelContainer}>
        <Typography variant="h5">Zarządzanie kontem użytkowników</Typography>
        <Divider className={classes.divider} />
        <div className={classes.usersTableContainer}>
          <DataGrid
            columns={tableColumns}
            rows={userAccounts}
            rowCount={rowCountState}
            loading={isLoading}
            rowsPerPageOptions={[5, 10, 15]}
            pagination
            {...rowsState}
            paginationMode="server"
            onPageChange={(page) => setRowsState((prev) => ({ ...prev, page }))}
            onPageSizeChange={(pageSize) =>
              setRowsState((prev) => ({ ...prev, pageSize }))
            }
            disableSelectionOnClick
            onCellEditCommit={handleCellEditCommit}
          />
        </div>
      </Paper>
      <Popup
        open={openUserReportsPopup}
        type="reports"
        title="Zgłoszenia użytkownika"
        onClose={handleCloseUserReportsPopup}
      >
        <>
          {reports
            .filter((report) => report.suspectUser.userId === selectedUserId)
            .map((report) => (
              <UserReport
                key={report.reportId}
                reportId={report.reportId}
                reportType={report.reportType}
                description={report.description}
                createdAt={report.createdAt}
                isConfirmed={report.isConfirmed}
                senderUser={report.senderUser}
              />
            ))}
          {reports.filter(
            (report) => report.suspectUser.userId === selectedUserId
          ).length === 0 && (
            <Typography variant="subtitle2">Brak zgłoszeń</Typography>
          )}
        </>
      </Popup>
    </div>
  );
};

AdminPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminPanel);
