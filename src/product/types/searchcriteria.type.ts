export type SearchQuery = {
    OR: (
        { name: { contains: string; mode: 'insensitive' } }
    )[];
};