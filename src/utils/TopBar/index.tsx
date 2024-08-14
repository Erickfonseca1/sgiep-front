// @ts-ignore
import React from "react";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'

type TopBarProps = {
	toggleDrawer: () => void;
}

const TopBar = ({toggleDrawer}: TopBarProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						sx={{ mr: 2 }}
						onClick={toggleDrawer}
						>
							<MenuIcon />
						</IconButton>
				</Toolbar>
			</AppBar>
    </Box>
  )
};

export default TopBar;
