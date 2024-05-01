import { View, SplitLayout, SplitCol } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import { Home } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';
import { Item } from './panels';

export const App = () => {
    const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
    return (
        <SplitLayout>
            <SplitCol>
                <View activePanel={activePanel}>
                    <Home id='home' />
                    <Item id='item' />
                </View>
            </SplitCol>
        </SplitLayout>
    );
};
