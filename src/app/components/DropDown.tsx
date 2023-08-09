// 'use client';

// import {
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   IconButton
// } from '@chakra-ui/react';
// import { HamburgerIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
// import { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { useSWRConfig } from 'swr';
// import { useContext } from 'react';
// import { UrlsContext } from '@/context/UrlsContext';

// interface DropDownProps {
//   id: number;
//   onUrlDeleted: () => void;
// }

// const DropDown: React.FC<DropDownProps> = ({
//   id,
//   onUrlDeleted
// }: {
//   id: number;
//   onUrlDeleted: () => void;
// }) => {
//   const [loading, setLoading] = useState(false);
//   const { mutate } = useSWRConfig();
//   const { data, error } = useContext(UrlsContext);

//   const handleDelete = async () => {
//     setLoading(true);

//     try {
//       const res = await axios.delete(`/api/delete/${id}`);
//       console.log(res.data);
//       onUrlDeleted();
//       toast.success('La Url ha sido eliminada');
//       mutate('/api/urls');
//     } catch (error: any) {
//       console.log(error.message);
//       if (error.response) {
//         toast.error(error.response.data);
//       }
//     }
//     setLoading(false);
//   };

//   return (
//     <Menu isLazy>
//       <MenuButton
//         as={IconButton}
//         aria-label='Options'
//         icon={<HamburgerIcon />}
//         variant='outline'
//       />
//       <MenuList>
//         <MenuItem icon={<EditIcon />}>Editar</MenuItem>
//         <MenuItem onClick={handleDelete} icon={<DeleteIcon />}>
//           Eliminar
//         </MenuItem>
//       </MenuList>
//     </Menu>
//   );
// };

// export default DropDown;

