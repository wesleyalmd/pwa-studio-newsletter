import { useCallback } from 'react';
import {
  setLocalStorangeStoreDisplayModal,
  getLocalStorangeStore
} from '../NewsletterModal/useNewsletterModal';

export const useNewsletter = () => {
  const { displayNewsletterModal } = getLocalStorangeStore();

  const handleSuccess = useCallback(() => {
    if (displayNewsletterModal) {
      setLocalStorangeStoreDisplayModal(false);
    }
  }, [displayNewsletterModal]);

  return {
    handleSuccess
  };
};
