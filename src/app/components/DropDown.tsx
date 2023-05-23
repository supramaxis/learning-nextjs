'use client';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton
} from '@chakra-ui/react';
import { HamburgerIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

const DropDown = () => {
  return (
    <Menu isLazy>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<HamburgerIcon />}
        variant='outline'
      />
      <MenuList>
        <MenuItem icon={<EditIcon />}>Editar</MenuItem>
        <MenuItem icon={<DeleteIcon />}>Eliminar</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default DropDown;

