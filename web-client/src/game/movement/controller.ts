import { Observer, WorldAPI } from "../World";

export const movement = (): Observer => {
  return {
    onUpdate: function (api: WorldAPI): void {
      api.forEach((entity) => {
        if (entity.input) {
          entity.location.x += entity.input.speed.x;
          entity.location.y += entity.input.speed.y;
        }
      });
    },
  };
};
