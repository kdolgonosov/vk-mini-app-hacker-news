import { useEffect, useState, Fragment } from 'react';
import { IArticle } from '../../../shared/model/interface';
import { Group, Header, IconButton, Spacing, Spinner } from '@vkontakte/vkui';
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
            {isLoading && <Spinner size='large' style={{ margin: '20px 0' }} />}
            {articles !== null &&
                articles.map((article) => (
                    <Fragment key={article.id.toString()}>
                        <NewsItem article={article} />
                        <Spacing />
                    </Fragment>
                ))}
        </Group>
    );
};
