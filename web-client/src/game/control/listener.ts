/** A filter for keyboard events to determine if the listener should be called. */
type KeyFilter = Partial<{
  type: "keydown" | "keyup" | "keyheld";
  key: string;
}>;

/** A listener that receives keyboard events. */
type KeyListener = KeyFilter & {
  callback: (event: KeyboardEvent) => void;
};

/** A filter for mouse events to determine if the listener should be called. */
type MouseFilter = Partial<{
  type: "mousedown" | "mousemove" | "mouseup";
}>;

/** A listener that receives mouse events. */
type MouseListener = MouseFilter & {
  callback: (event: MouseEvent) => void;
};

/** A collection of {@link KeyListener}s and {@link MouseListener}s. */
export type AggregateListener = {
  keyListeners: KeyListener[];
  mouseListeners: MouseListener[];
};

/**
 * Binds the listeners in the {@link AggregateListener} to the window events.
 *
 * @param listeners the listeners to bind
 * @returns a callback to remove the listeners
 */
export default function listen(listeners: AggregateListener): () => void {
  const onKeyEvent = (event: KeyboardEvent) => {
    emitKeyEvent(event, listeners.keyListeners);
  };
  const onMouseEvent = (event: MouseEvent) => {
    emitMouseEvent(event, listeners.mouseListeners);
  };

  window.addEventListener("keydown", onKeyEvent);
  window.addEventListener("keyup", onKeyEvent);
  window.addEventListener("mousedown", onMouseEvent);
  window.addEventListener("mousemove", onMouseEvent);
  window.addEventListener("mouseup", onMouseEvent);
  return () => {
    window.removeEventListener("keydown", onKeyEvent);
    window.removeEventListener("keyup", onKeyEvent);
    window.removeEventListener("mousedown", onMouseEvent);
    window.removeEventListener("mousemove", onMouseEvent);
    window.removeEventListener("mouseup", onMouseEvent);
  };
}

function emitKeyEvent(event: KeyboardEvent, listeners: KeyListener[]) {
  listeners
    .filter((listener) => filterKeyListener(event, listener))
    .forEach((listener) => listener.callback(event));
}

function emitMouseEvent(event: MouseEvent, listeners: MouseListener[]) {
  listeners
    .filter((listener) => filterMouseListener(event, listener))
    .forEach((listener) => listener.callback(event));
}

const filterKeyListener = (event: KeyboardEvent, listener: KeyListener) =>
  (listener.key === undefined || event.key === listener.key) &&
  (listener.type === undefined || event.type === listener.type);

const filterMouseListener = (event: MouseEvent, listener: MouseListener) =>
  listener.type === undefined || event.type === listener.type;
