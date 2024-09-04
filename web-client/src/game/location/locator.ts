import { MessagingInterface } from "../events/messaging";
import { Observer } from "../World";

const FRAMES_PER_LOCATE = 180;

const locator = (entityId: string, messaging: MessagingInterface): Observer => {
  let framesSinceLastUpdate = 0;
  return {
    onUpdate: function (api): void {
      if (FRAMES_PER_LOCATE < framesSinceLastUpdate) {
        const entity = api.entity(entityId);
        if (entity !== null) {
          messaging.locate(entity.location);
        }
        framesSinceLastUpdate = 0;
      }
      framesSinceLastUpdate++;
    },
  };
};

export default locator;
