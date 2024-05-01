import { useEffect, useState } from 'react';
import { IArticle } from '../../../shared/model/interface';
import { Group, Header, IconButton, Spinner } from '@vkontakte/vkui';
import { NewsItem } from '../../../shared/ui/NewsItem/NewsItem';
import { fetchNews } from '../../../shared/model/api';
import { Icon28RefreshOutline } from '@vkontakte/icons';

export const NewsList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [articles, setArticles] = useState<IArticle[]>([]);
    const getNews = async () => {
        setIsLoading(true);
        setArticles([]);
        const articles = await fetchNews();
        setArticles(articles);
        setIsLoading(false);
    };
    useEffect(() => {
        getNews();
        const timerId = setInterval(getNews, 60000);
        return () => {
            clearInterval(timerId);
        };
    }, []);
    return (
        <Group
            header={
                <Header
                    aside={
                        <IconButton label='Обновить' onClick={getNews} disabled={isLoading}>
                            <Icon28RefreshOutline />
                        </IconButton>
                    }
                >
                    Новости
                </Header>
            }
        >
            {isLoading && <Spinner size='large' style={{ marginBottom: '10px' }} />}
            {articles !== null &&
                articles.map((article) => (
                    <NewsItem key={article.id.toString()} article={article} />
                ))}
        </Group>
    );
};
