import { FC } from 'react';
import { Panel, PanelHeader, NavIdProps } from '@vkontakte/vkui';
import { NewsList } from '../widgets/NewsList/ui/NewsList';
export const Home: FC<NavIdProps> = ({ id }) => {
    return (
        <Panel id={id}>
            <PanelHeader>Hacker News</PanelHeader>
            <NewsList />
        </Panel>
    );
};
