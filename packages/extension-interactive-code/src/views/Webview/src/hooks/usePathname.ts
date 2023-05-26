import { useEffect, useSyncExternalStore } from 'react';
import { emit, addEventListener } from '@/services/event';

let pathname: string = '/';

export function usePathname(): string {
  useEffect(() => emit('get-pathname'), []);

  return useSyncExternalStore(
    onStoreChange => {
      const { dispose } = addEventListener('set-pathname', message => {
        const newPathname = message.data.payload;
        if (typeof newPathname === 'string' && newPathname !== pathname) {
          pathname = newPathname;
          onStoreChange();
        }
      });

      return dispose;
    },
    () => pathname,
    () => pathname,
  );
}
