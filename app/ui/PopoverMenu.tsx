'use client';

import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, Settings } from '@mui/icons-material';

import { useState } from 'react';

export default function PopoverMenu() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) =>
		setAnchorEl(e.currentTarget);

	const handleMenuClose = () => setAnchorEl(null);

	return (
		<Box sx={{ display: 'flex' }}>
			<Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
				<MenuItem onClick={handleMenuClose}>Menu 1</MenuItem>
				<MenuItem onClick={handleMenuClose}>Menu 2</MenuItem>
				<MenuItem onClick={handleMenuClose}>Menu 3</MenuItem>
			</Menu>

			{/* Menu button */}
			<IconButton
				onClick={handleMenuOpen}
				size="large"
				sx={{ color: '666' }}
			>
				<Settings />
			</IconButton>
		</Box>
	);
}
