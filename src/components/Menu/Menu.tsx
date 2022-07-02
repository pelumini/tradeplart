import React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { RouteType } from '../../routes';

interface Props {
  links: RouteType[];
  menuClickHandler: (link: string) => void;
}

export const Menu: React.FC<Props> = ({ links, menuClickHandler }) => {
  return (
    <div>
      <MenuList>
        {links?.map((link) => (
          <MenuItem key={link.path} onClick={() => menuClickHandler(link.path)}>
            <ListItemIcon>
              <link.icon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{link.label}</ListItemText>
          </MenuItem>
        ))}
      </MenuList>
    </div>
  );
};
