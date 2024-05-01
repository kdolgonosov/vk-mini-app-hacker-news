import { IArticle } from '../../model/interface';
import { Caption, Card, Div, Link, Text } from '@vkontakte/vkui';
import { formatDate } from '../../model/utils';

type Props = {
    article: IArticle;
};

export const NewsItem = ({ article }: Props) => {
    const { id, title, score, by, time } = article;
    return (
        <Card>
            <Div>
                <Link href={'#/' + String(id)}>
                    <Text weight='1'>{title}</Text>
                </Link>
                <Text weight='3'>Рейтинг: {score}</Text>
                <Caption level='1' style={{ marginTop: '20px' }}>
                    {formatDate(time)}, {by}
                </Caption>
            </Div>
        </Card>
    );
};
