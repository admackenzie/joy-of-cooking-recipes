import { Box, Container } from '@mui/material';

import { RecipeCard } from '@/app/ui/index';

import { findByID } from '@/app/lib/CRUD';

import { Recipe } from '@/app/lib/definitions';

interface Props {
	params: {
		id: string;
	};
}

export default async function Page({ params }: Props) {
	// const [fullSize] = useState(true);
	const { id } = params || 'NO ID';

	try {
		const recipe: Recipe | null = await findByID(id);

		return (
			// <SizeContext.Provider value={true}>
			<Container className={'py-4'}>
				<RecipeCard recipe={recipe} />
			</Container>
			// </SizeContext.Provider>
		);
	} catch (err) {
		// FIXME: error handling
		console.log(err);
	}
}