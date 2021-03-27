import { useState, useCallback, useEffect, useMemo } from 'react';
import { useUserContext } from '@magento/peregrine/lib/context/user';

export const getLocalStorangeStore = () => {
  if (window && window.localStorage) {
    const data = window.localStorage.getItem('LOCAL_STORE_CONFIG');
    if (data) {
      const parsaed = JSON.parse(data);
      return parsaed;
    }
    window.localStorage.setItem('LOCAL_STORE_CONFIG', '{}');
    return {};
  }
};

export const setLocalStorangeStoreDisplayModal = bool => {
  if (window && window.localStorage) {
    const current = getLocalStorangeStore();
    window.localStorage.setItem(
      'LOCAL_STORE_CONFIG',
      JSON.stringify({
        ...current,
        displayNewsletterModal: bool
      })
    );
  }
};

export const useNewsletterModal = () => {
  const { displayNewsletterModal } = getLocalStorangeStore();
  const [{ isSignedIn }] = useUserContext();
  const [newsletterModalOpen, setNewsletterModalOpen] = useState(true);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const showNewsletterModal = useMemo(() => {
    return !isSignedIn && displayNewsletterModal;
  }, [isSignedIn, displayNewsletterModal]);

  // disable modal after login
  useEffect(() => {
    if (isSignedIn) {
      setLocalStorangeStoreDisplayModal(false);
    }
  }, [isSignedIn]);

  // display modal on first access
  useEffect(() => {
    const storange = getLocalStorangeStore();
    if (!storange.hasOwnProperty('displayNewsletterModal')) {
      setLocalStorangeStoreDisplayModal(true);
    }
  }, []);

  const handleSuccessModal = useCallback(() => {
    setLocalStorangeStoreDisplayModal(false);
    setNewsletterModalOpen(false);
  }, [displayNewsletterModal]);

  const handleCancelModal = useCallback(() => {
    setNewsletterModalOpen(isOpen => !isOpen);
    if (dontShowAgain) setLocalStorangeStoreDisplayModal(false);
  }, [dontShowAgain, newsletterModalOpen, setNewsletterModalOpen]);

  const handleDontShowAgain = useCallback(
    event => {
      const { checked } = event.target;

      setDontShowAgain(checked);
    },
    [dontShowAgain]
  );

  return {
    showNewsletterModal,
    newsletterModalOpen,
    handleSuccessModal,
    handleCancelModal,
    dontShowAgain,
    handleDontShowAgain
  };
};
