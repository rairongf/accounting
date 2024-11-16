//import { useSessionState } from '@/modules/session/state';
import { IInitializeSessionStateUsecase } from './interface';

export function useInitializeSessionState(
) {
  /* const {
    userState: [, setUser],
  } = useSessionState(); */

  const initializeState: IInitializeSessionStateUsecase = async () => {
    try {

      return;
    } catch (err) {
      console.log('Caught error:', err);
      return;
    }
  };

  return { initializeState };
}
