import { useState ,useEffect,useCallback} from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from '../../../components/Admin/label';
import Iconify from '../../../components/Admin/iconify';
import { getAllUser } from '../../../service/UserService';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  userId,
  firstName,
  lastName,
  imgAvt,
  email,
  dob,
  gender,
  phoneNumber,
  address,
  isVerified,
  status,
  role,
  handleClick,
  handleClickEdit,
  handleClickDelete,
  handleClickUnBlock,
}) {
  const [open, setOpen] = useState(null);
  const [users, setUsers] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const userList = await getAllUser(userId);
      setUsers(userList);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [userId]); 

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEdit = () => {
    handleCloseMenu();
    handleClickEdit("edit", userId);
  };

  const handleDelete = () => {
    handleCloseMenu();
    handleClickDelete();
  }
  const handleUnbolck= () => {
    handleCloseMenu();
    handleClickUnBlock();
  }
  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const day = date.getDate().toString().padStart(2, '0'); 
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={firstName} src={imgAvt} />
            <Typography variant="subtitle2" noWrap>
              {firstName} 
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{lastName}</TableCell>
        <TableCell>{dob? formatDate(dob):""}</TableCell>

        <TableCell>{email}</TableCell>
        <TableCell>{phoneNumber}</TableCell>
        <TableCell>{gender}</TableCell>
        <TableCell>{address}</TableCell>
        <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell>

        <TableCell>
          <Label color={(status === 'Block' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Block
        </MenuItem>
        <MenuItem onClick={handleUnbolck} sx={{ color: 'success' }}>
          <Iconify icon="eva:checkmark-fill" sx={{ mr: 2 }} />
          UnBlock
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  userId:PropTypes.any,
  firstName: PropTypes.any,
  lastName: PropTypes.any,
  imgAvt: PropTypes.any,
  email: PropTypes.any,
  dob: PropTypes.any,
  gender: PropTypes.any,
  role:PropTypes.any,
  phoneNumber: PropTypes.any,
  address: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
