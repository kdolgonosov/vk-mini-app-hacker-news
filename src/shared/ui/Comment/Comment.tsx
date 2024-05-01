import { Button, Caption, Card, Div, Spacing, Text } from '@vkontakte/vkui';
import { useState } from 'react';
import { IComment } from '../../model/interface';
import { CommentList } from '../../../widgets/CommentList';
import { formatDate } from '../../model/utils';

type Props = {
    comment: IComment;
};

export const Comment = (props: Props) => {
    const { comment } = props;
    const [isSubCommentsShown, setIsSubCommentsShown] = useState(false);
    const handleOpenSubComments = () => {
        setIsSubCommentsShown((prev) => !prev);
    };
    return (
        <Card style={{ marginBottom: '10px' }}>
            <Div>
                <Text weight='2'>{comment.by}</Text>
                <Caption level='1'>{formatDate(comment.time)}</Caption>
                <Spacing />
                <Text weight='1'>{comment.deleted ? 'Комментарий удален' : comment.text}</Text>
            </Div>
            <Div>
                {comment.kids && comment.kids.length > 0 && (
                    <Button onClick={handleOpenSubComments}>
                        {isSubCommentsShown ? 'Скрыть' : 'Показать ответы'}
                    </Button>
                )}
            </Div>
            {isSubCommentsShown && comment.kids && <CommentList ids={comment.kids} sub={true} />}
        </Card>
    );
};
