'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Box, Container } from '@mui/material';

import {
	AppBarWithSearch,
	BookmarkList,
	CardDeck,
	ChapterList,
	MobileNav,
	Sidebar,
} from '@/app/ui/index';

import { Recipe } from '../lib/definitions';

import Landing from './Landing';

interface Props {
	data: Recipe[];
}

export default function Layout({ data }: Props) {
	const preview = !useParams<{ id: string }>().id ?? true;

	const [bookmarks, setBookmarks] = useState<Recipe[]>([]);

	// Initialize bookmarks from localStorage
	useEffect(() => {
		const storage = Object.keys(localStorage)
			.filter(key => key.startsWith('joc-'))
			.map(key => JSON.parse(localStorage.getItem(key) ?? ''));

		setBookmarks(storage);
	}, []);

	const addBookmark = (data: Recipe) => {
		setBookmarks([...bookmarks, data]);

		localStorage.setItem(`joc-${data.id}`, JSON.stringify(data));
	};

	const removeBookmark = (id: string) => {
		setBookmarks(bookmarks.filter(recipe => recipe.id !== id));

		localStorage.removeItem(`joc-${id}`);
	};

	return (
		<Box
			maxWidth={'xl'}
			// Disable vertical scrolling for the page
			sx={{
				height: '100vh',
				mx: 'auto',
				overflow: 'hidden',
				// width: '100%',
			}}
		>
			{/* Header */}
			<AppBarWithSearch />

			{/* Body */}
			<Box sx={{ display: 'flex', height: '100vh' }}>
				{/* Left */}
				<Sidebar bp={'md'} width={225}>
					<ChapterList />
				</Sidebar>

				{/* Center */}
				<Box sx={{ overflowY: 'auto' }}>
					{/* Card container */}
					<Container
						sx={{ pb: '8rem', pt: { xs: '1rem', sm: '1.5rem' } }}
					>
						{/* <Landing /> */}

						<CardDeck
							addBookmark={addBookmark}
							bookmarks={bookmarks}
							data={data}
							preview={preview}
							removeBookmark={removeBookmark}
						/>
					</Container>

					{/* Bottom navigation */}
					<Container
						disableGutters
						sx={{
							bottom: 0,
							display: { md: 'none' },
							position: 'fixed',
							top: 'auto',
							width: '100%',
						}}
					>
						<MobileNav />
					</Container>
				</Box>

				{/* Right */}
				<Sidebar bp={'lg'} width={300}>
					<BookmarkList
						bookmarks={bookmarks}
						removeBookmark={removeBookmark}
					/>
				</Sidebar>
			</Box>
		</Box>
	);
}
