type KeyFilter = Partial<{
  type: "keydown" | "keyup";
  key: string;
}>;

type KeyListener = KeyFilter & {
  callback: (event: KeyboardEvent) => void;
};

type MouseFilter = Partial<{
  type: "mousedown" | "mousemove" | "mouseup";
}>;

type MouseListener = MouseFilter & {
  callback: (event: MouseEvent) => void;
};

export type AggregateListener = {
  keyListeners: KeyListener[];
  mouseListeners: MouseListener[];
};

export default function listen(controller: AggregateListener): () => void {
  const onKeyEvent = (event: KeyboardEvent) => {
    emitKeyEvent(event, controller.keyListeners);
  };
  const onMouseEvent = (event: MouseEvent) => {
    emitMouseEvent(event, controller.mouseListeners);
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
