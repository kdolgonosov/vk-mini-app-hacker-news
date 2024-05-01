const baseUrl = 'https://hacker-news.firebaseio.com';
const numberOfNews = 100;

export const fetchNews = async () => {
    const articleIds = await fetch(
        `${baseUrl}/v0/newstories.json?print=pretty&orderBy="$key"&limitToFirst=${numberOfNews}`,
    ).then((data) => data.json());
    const articles = await Promise.all(
        articleIds.map((id: number) => {
            return fetch(`${baseUrl}/v0/item/${id}.json`).then((data) => data.json());
        }),
    );
    return articles;
};
export const fetchNewsItem = async (id: string) => {
    const article = await fetch(`${baseUrl}/v0/item/${id}.json`).then((data) => data.json());
    return article;
};
export const fetchRootComments = async (ids: number[]) => {
    const rootComments = ids.map((commentId) => {
        return fetch(`${baseUrl}/v0/item/${commentId}.json`).then((data) => data.json());
    });
    return rootComments;
};
