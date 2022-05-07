import React, { useState } from 'react';
import styles from './searchItemsBox-jss';
import { withStyles } from '@mui/styles';
import { PropTypes } from 'prop-types';
import {
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

const SearchItemsBox = (props) => {
  const {
    classes,
    searchbarPlaceholder,
    updateList,
    itemsOrder,
    handleChangeItemsOrder,
    orderOptions,
  } = props;

  const [searchedItem, setSearchedItem] = useState('');

  const handleChangeSearchedItem = (event) => {
    let currentSearchedValue = event.target.value;
    setSearchedItem(currentSearchedValue);

    updateList(currentSearchedValue);
  };

  return (
    <div className={classes.actionContainer}>
      <TextField
        id="searchbar"
        placeholder={searchbarPlaceholder}
        className={classes.searchbar}
        value={searchedItem}
        onChange={handleChangeSearchedItem}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <div className={classes.itemsOrderBox}>
        <Typography
          variant="subtitle1"
          noWrap
          fontWeight="bold"
          marginRight="10px"
        >
          Sortuj według:
        </Typography>
        <FormControl sx={{ margin: 0 }}>
          <Select
            className={classes.itemsOrderSelect}
            value={itemsOrder}
            onChange={handleChangeItemsOrder}
            MenuProps={{ disableScrollLock: true }}
          >
            {orderOptions.map((name, index) => (
              <MenuItem value={index + 1}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

SearchItemsBox.propTypes = {
  classes: PropTypes.object.isRequired,
  searchbarPlaceholder: PropTypes.string.isRequired,
  updateList: PropTypes.func.isRequired,
  itemsOrder: PropTypes.number.isRequired,
  handleChangeItemsOrder: PropTypes.func.isRequired,
  orderOptions: PropTypes.array.isRequired,
};

export default withStyles(styles)(SearchItemsBox);
