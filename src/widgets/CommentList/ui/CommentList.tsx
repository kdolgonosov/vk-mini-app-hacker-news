import { Counter, Group, Header, IconButton, Spacing, Spinner } from '@vkontakte/vkui';
import { Fragment, useEffect, useState } from 'react';
import { Comment } from '../../../shared/ui';
import { IComment } from '../../../shared/model/interface';
import { fetchRootComments } from '../../../shared/model/api';
import { Icon28RefreshOutline } from '@vkontakte/icons';
type Props = {
    ids: number[];
    descendants?: number;
    sub: boolean;
};

export const CommentList = (props: Props) => {
    const { ids, descendants, sub } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [rootComments, setRootComments] = useState<IComment[]>([]);
    const getRootComments = async () => {
        setIsLoading(true);
        setRootComments([]);
        const rootComments = await fetchRootComments(ids);
        setRootComments(await Promise.all(rootComments));
        setIsLoading(false);
    };
    useEffect(() => {
        getRootComments();
    }, []);
    return (
        <Group
            header={
                !sub && (
                    <Header
                        indicator={
                            <Counter size='s' mode='primary'>
                                {descendants}
                            </Counter>
                        }
                        aside={
                            <IconButton label='Обновить' onClick={getRootComments}>
                                <Icon28RefreshOutline />
                            </IconButton>
                        }
                    >
                        Комментарии
                    </Header>
                )
            }
            style={sub ? { paddingLeft: '40px' } : {}}
            mode='plain'
        >
            {isLoading && <Spinner size='large' style={{ margin: '20px 0' }} />}
            {rootComments.map((comment, id) => (
                <Fragment key={comment.id}>
                    <Comment comment={comment} />
                    {id !== rootComments.length - 1 && <Spacing />}
                </Fragment>
            ))}
        </Group>
    );
};
