import { FC, useEffect, useState } from 'react';
import {
    Text,
    Group,
    NavIdProps,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Placeholder,
    Link,
    Spacing,
    Button,
    PanelSpinner,
} from '@vkontakte/vkui';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { CommentList } from '../widgets/CommentList';
import { IArticle } from '../shared/model/interface';
import { formatDate } from '../shared/model/utils';
import { fetchNewsItem } from '../shared/model/api';

export const Item: FC<NavIdProps> = ({ id }) => {
    const routeNavigator = useRouteNavigator();
    const params = useParams<'id'>();
    const [isLoading, setIsLoading] = useState(false);
    const [article, setArticle] = useState<IArticle | null>(null);
    const fetchItem = async () => {
        setIsLoading(true);
        setArticle(null);
        if (params && params.id) {
            const article = await fetchNewsItem(params!.id);
            setArticle(article);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchItem();
    }, []);
    if (!params || !article) return null;
    return (
        <Panel id={id}>
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
                Пост: <span>{article.title}</span>
            </PanelHeader>
            {isLoading ? (
                <PanelSpinner>Загрузка...</PanelSpinner>
            ) : (
                <Group>
                    <Text weight='1'>{article.title}</Text>
                    <Text weight='3'>
                        {article.by}, {formatDate(article.time)}
                    </Text>
                    <Spacing />
                    <Text weight='3'>
                        Ссылка: <Link href={article.url}>{article.url}</Link>
                    </Text>
                </Group>
            )}

            {article.kids ? (
                <CommentList ids={article.kids} descendants={article.descendants} sub={false} />
            ) : (
                <Placeholder>
                    <Text weight='2'>Комментариев нет!</Text>
                    <Spacing />
                    <Button onClick={fetchItem}>Обновить</Button>
                </Placeholder>
            )}
        </Panel>
    );
};
