import PlayerView from '../views/PlayerView';
import { Observer } from '../World';

export const movement = (views: Map<string, PlayerView>): Observer => {
    return {
        onUpdate: function (): void {
            views.forEach((entity) => entity.step());
        },
    };
};
