'use client';

import { useState } from 'react';

import { Box, Container, Drawer, Tab, Tabs } from '@mui/material';
import { Bookmarks, MenuBook, Settings } from '@mui/icons-material';

import { BookmarkList, MobileChapters } from '@/app/ui/index';

import { Recipe } from '@/app/lib/definitions';

interface Props {
	bookmarks: Recipe[];
	drawerOpen: boolean;
	removeBookmark: any;
	setDrawerOpen: any;
}

export default function MobileNavDrawer({
	bookmarks,
	drawerOpen,
	removeBookmark,
	setDrawerOpen,
}: Props) {
	const [value, setValue] = useState(0);

	const handleChange = (_e: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const handleScrollToTop = () => {
		const top = document.getElementById('tabs');

		top?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<Drawer
			anchor={'bottom'}
			open={drawerOpen}
			onClose={() => setDrawerOpen(false)}
			PaperProps={{
				square: false,
				sx: {
					marginX: { xs: '0.5rem', sm: '0.75rem' },
				},
			}}
		>
			<Container>
				{/* Display tab headings */}
				<Tabs
					id={'tabs'}
					onChange={handleChange}
					sx={{
						// Disable uppercase tab names
						'& button': { textTransform: 'none' },
					}}
					value={value}
					variant={'fullWidth'}
				>
					<Tab icon={<Bookmarks />} label={'Bookmarks'} />
					<Tab icon={<MenuBook />} label={'Chapters'} />
					{/* <Tab disabled icon={<Settings />} label={'Settings'} /> */}
				</Tabs>

				{/* Display tab content */}
				<TabPanel index={0} value={value}>
					<BookmarkList
						bookmarks={bookmarks}
						removeBookmark={removeBookmark}
						setDrawerOpen={setDrawerOpen}
					/>
				</TabPanel>

				<TabPanel index={1} value={value}>
					<Box sx={{ paddingTop: '2rem' }}>
						<MobileChapters bottomFunc={handleScrollToTop} />
					</Box>
				</TabPanel>

				{/* <TabPanel index={2} value={value}>
						Settings
					</TabPanel> */}
			</Container>
		</Drawer>
	);
}

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel({ children, index, value }: TabPanelProps) {
	return (
		<Box hidden={value !== index} sx={{ height: '50svh' }}>
			{value === index && <Box>{children}</Box>}
		</Box>
	);
}
