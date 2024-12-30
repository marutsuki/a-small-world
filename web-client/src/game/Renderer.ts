import { Entity } from './types';

export default class Renderer {
    render(entity: Entity, context: CanvasRenderingContext2D) {
        context.fillStyle = 'white';
        switch (entity.type) {
            case 'polygon':
                context.fillRect(entity.location.x, entity.location.y, 10, 10);
                break;
            case 'text':
                context.font = 'bold 16px monospace';
                context.fillText(
                    entity.content,
                    entity.location.x,
                    entity.location.y
                );
                break;
        }
    }
}
