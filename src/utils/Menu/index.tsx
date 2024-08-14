import React from 'react'
import * as S from './styles'
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import HomeIcon from '@mui/icons-material/Home';
import ScheduleIcon from '@mui/icons-material/Schedule';


type MenuProps = {
	isOpen: boolean;
	toggleDrawer: () => void;
}

const Menu = ({ isOpen, toggleDrawer }: MenuProps) => {

	const handleNavigateToHome = () => {
		toggleDrawer()
		window.location.href = '/'
	}

	const handleNavigateToProfessorSchedule = () => {
		toggleDrawer()
		window.location.href = '/professorschedule'
	}

	const handleNavigateToCitizenSchedule = () => {
		toggleDrawer()
		window.location.href = '/citizenschedule'
	}
	
	return (
		<Drawer
			open={isOpen}
			onClose={toggleDrawer}
			anchor='left'
			variant='persistent'
			sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' } }}
		>
			<S.Wrapper>
				<div
					style={{
						display: 'flex',
						alignItems: 'flex-start',
						justifyContent: 'flex-end',
						margin: '10px'
					}}
				>
					<IconButton onClick={toggleDrawer}>
						<ArrowBackIosNewIcon />
					</IconButton>
				</div>
				<Divider />
				<List>
					<S.ListItemButton
						onClick={handleNavigateToHome}
					>
						<HomeIcon/>
						<ListItemText>Home</ListItemText>
					</S.ListItemButton>
					<S.ListItemButton
						onClick={handleNavigateToProfessorSchedule}
					>
						<ScheduleIcon/>
						<ListItemText>Agenda do Professor</ListItemText>
					</S.ListItemButton>
					<S.ListItemButton
						onClick={handleNavigateToCitizenSchedule}
					>
						<ScheduleIcon/>
						<ListItemText>Agenda do Cidadão</ListItemText>
					</S.ListItemButton>
				</List>
			</S.Wrapper>
		</Drawer>
	)
}

export default Menu

