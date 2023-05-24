'use client';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton
} from '@chakra-ui/react';
import { HamburgerIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import axios from 'axios';

interface DropDownProps {
  id: number;
  onUrlDeleted: () => void;
}

const DropDown: React.FC<DropDownProps> = (
  { id }: { id: number },
  onUrlDeleted
) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const res = await axios.delete(`/api/delete/${id}`);
      console.log(res.data);
      onUrlDeleted();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

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
        <MenuItem onClick={handleDelete} icon={<DeleteIcon />}>
          Eliminar
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default DropDown;

