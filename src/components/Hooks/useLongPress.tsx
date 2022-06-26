import { useRef, useCallback, useMemo } from "react";

export default function useLongPress({
  onClick = () => {},
  onLongPress = () => {},
  ms = 500,
} = {}) {
  const timerRef: any = useRef(false);
  const eventRef: any = useRef({});

  const callback = useCallback(() => {
    // @ts-ignore
    onLongPress(eventRef.current);
    eventRef.current = {};
    timerRef.current = false;
  }, [onLongPress]);

  const start = useCallback(
    // @ts-ignore
    (ev) => {
      ev.persist();
      eventRef.current = ev;
      timerRef.current = setTimeout(callback, ms);
    },
    [callback, ms]
  );

  const stop = useCallback(
    // @ts-ignore
    (ev) => {
      ev.persist();
      eventRef.current = ev;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        // @ts-ignore
        onClick(eventRef.current);
        timerRef.current = false;
        eventRef.current = {};
      }
    },
    [onClick]
  );

  return useMemo(
    () => ({
      onMouseDown: start,
      onMouseUp: stop,
      onMouseLeave: stop,
      onTouchStart: start,
      onTouchEnd: stop,
    }),
    [start, stop]
  );
}
