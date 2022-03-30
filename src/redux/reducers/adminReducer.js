import adminTypes from '../types/adminTypes';

const initialState = {
  accounts: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.FETCH_USER_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload.accounts,
      };
    case adminTypes.MANAGE_USER_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.map((account) =>
          account.id === action.payload.userId
            ? action.payload.updatedAccount
            : account
        ),
      };
    case adminTypes.DELETE_USER_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter(
          (account) => account.id !== action.payload.userId
        ),
      };
    case adminTypes.CLEAR_ALL:
      return initialState;
    default:
      return state;
  }
};

export default adminReducer;
