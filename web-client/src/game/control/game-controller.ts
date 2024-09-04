import { MessagingInterface } from "../events/messaging";
import { EntityInput, Vector } from "../types";
import { Observer } from "../World";
import listen, { AggregateListener } from "./listener";

export const controller = (messaging: MessagingInterface): Observer => {
  const { listener, state } = listeners();
  let oldInput: EntityInput | null = null;

  let stopListening: () => void | null;
  return {
    onStart: function (): void {
      // Start listening for user input
      stopListening = listen(listener);
    },
    onUpdate: function (): void {
      if (newInput(oldInput, state.input)) {
        messaging.input(state.input);
        oldInput = { speed: { ...state.input.speed } };
      }
    },
    onStop: function (): void {
      stopListening?.();
    },
  };
};

const newInput = (
  oldInput: EntityInput | null,
  newInput: EntityInput,
): boolean =>
  oldInput === null ||
  oldInput.speed.x !== newInput.speed.x ||
  oldInput.speed.y !== newInput.speed.y;

/**
 * Creates a {@link AggregateListener} instance that allows the user to control
 * the player entity using the keyboard.
 *
 * @param playerId the ID of the player entity
 * @param messaging the messaging interface to send move events
 * @returns an {@link AggregateListener} instance
 */
const listeners = (): {
  listener: AggregateListener;
  state: {
    input: EntityInput;
  };
} => {
  const speed: Vector = { x: 0, y: 0 };
  const state = { input: { speed } };
  return {
    state,
    listener: {
      keyListeners: [
        {
          key: "w",
          type: "keydown",
          callback: (e) => {
            if (e.repeat) return;
            speed.y = -1;
          },
        },
        {
          key: "a",
          type: "keydown",
          callback: (e) => {
            if (e.repeat) return;
            speed.x = -1;
          },
        },
        {
          key: "s",
          type: "keydown",
          callback: (e) => {
            if (e.repeat) return;
            speed.y = 1;
          },
        },
        {
          key: "d",
          type: "keydown",
          callback: (e) => {
            if (e.repeat) return;
            speed.x = 1;
          },
        },
        {
          key: "w",
          type: "keyup",
          callback: () => {
            speed.y = 0;
          },
        },
        {
          key: "a",
          type: "keyup",
          callback: () => {
            speed.x = 0;
          },
        },
        {
          key: "s",
          type: "keyup",
          callback: () => {
            speed.y = 0;
          },
        },
        {
          key: "d",
          type: "keyup",
          callback: () => {
            speed.x = 0;
          },
        },
      ],
      mouseListeners: [],
    },
  };
};
