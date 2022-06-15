import React, {useEffect, useRef} from 'react';
export default function useAsyncState(t: any) {
  const [state, setState] = React.useState(t);
  const preState = useRef<any>(t);
  const funcCallback = useRef<any>(null);
  useEffect(() => {
    if (preState.current != state) {
      preState.current = state;
      if (funcCallback.current) {
        funcCallback.current(state);
      }
    }
  }, [state]);

  function handle(x: any, callback?: void) {
    setState(x);
    funcCallback.current = callback;
  }

  return [state, handle];
}
