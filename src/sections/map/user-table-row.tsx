import { useState, useCallback } from 'react';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Iconify } from 'src/components/iconify';

import { firebaseController } from '../../utils/firebaseMiddleware';

// ----------------------------------------------------------------------

export type UserProps = {
  id: string;
  title: string;
  longitude: string;
  latitude: string;
  distance: string;
  name: string;
};

type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function UserTableRow({ row, selected, onSelectRow }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  // if (row.status === 'approved') {
  //   console.log(row.status);
  // } else {
  //   row.status = 'error';
  // }

  const handleDelete = async () => {
    try {
      await firebaseController.deleteMapEntry(row.id); // Delete from Firebase
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
    handleClosePopover(); // Close the popover after deletion
  };
  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell>{row.title}</TableCell>

        <TableCell>{row.longitude}</TableCell>
        <TableCell>{row.latitude}</TableCell>
        <TableCell>{row.distance}</TableCell>

        {/* <TableCell align="center">{row.record}</TableCell> */}
        {/* 
        <TableCell>
          <Label color={(row.status === 'banned' && 'error') || 'success'}>
            {row.status === 'approved' ? 'Approved' : 'Pending'}
          </Label>
        </TableCell> */}

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleClosePopover}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" onClick={handleDelete} />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
