import { EntityInput, Location } from '../types';
import { WorldAPI } from '../World';

const MESSAGE_TIMEOUT = 3000;

const MESSAGE_OFFSET_Y = -5;

export default class PlayerView {
    public constructor(
        private api: WorldAPI,
        private entityId: string,
        private _location: Location,
        private _message: string | null = null,
        private _input: EntityInput | null = null
    ) {
        this.update();
    }

    public set location(value: Location) {
        this._location = value;
        this.update();
    }

    public set message(value: string) {
        this._message = value;
        setTimeout(() => {
            this._message = null;
            this.update();
        }, MESSAGE_TIMEOUT);
        this.update();
    }

    public set input(value: EntityInput | null) {
        this._input = value;
        this.api.patch(this.entityId, { input: this._input || undefined });
    }

    public update(): void {
        this.api.put(this.entityId, {
            type: 'polygon',
            location: this._location,
        });

        if (this._message === null) {
            this.api.remove(`${this.entityId}.message`);
        } else {
            this.api.put(`${this.entityId}.message`, {
                type: 'text',
                location: {
                    x: this._location.x,
                    y: this._location.y + MESSAGE_OFFSET_Y,
                },
                content: this._message,
            });
        }
    }

    public remove(): void {
        this.api.remove(this.entityId);
        this.api.remove(`${this.entityId}.message`);
    }
}
