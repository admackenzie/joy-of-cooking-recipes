import { Layout } from '@/app/ui/index';

import { findBySearch } from '@/app/lib/CRUD';

import { Recipe } from '@/app/lib/definitions';

interface Props {
	searchParams?: {
		search?: string;
	};
}

export default async function Main({ ...props }: Props) {
	// FIXME: try/catch here
	const { search: query } = props.searchParams || '';
	let data: Recipe[] = [];

	if (query) {
		data = await findBySearch(query);
	}

	return <Layout data={data} />;
}
