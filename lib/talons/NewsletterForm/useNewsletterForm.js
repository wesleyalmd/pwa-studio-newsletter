import { useCallback, useState, useMemo, useRef } from 'react';
import { useMutation } from '@apollo/client';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import DEFAULT_OPERATIONS from './newsletterForm.gql';

export const useNewsletterForm = props => {
  const { onSuccess } = props;
  const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
  const { subscribeNewsletterMutation } = operations;

  const formApiRef = useRef();
  const initialValues = {};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeNewsletter, { error, data, loading }] = useMutation(
    subscribeNewsletterMutation,
    {
      fetchPolicy: 'no-cache'
    }
  );

  const handleSubmit = useCallback(
    async formValues => {
      if (formValues.email && formValues.email.length < 5) return;

      setIsSubmitting(true);
      try {
        await subscribeNewsletter({
          variables: {
            email: formValues.email.trim()
          }
        });
        formApiRef.current.reset();
        if (onSuccess && typeof onSuccess === 'function') {
          onSuccess();
        }
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(e);
        }
      }
      setIsSubmitting(false);
    },
    [subscribeNewsletter]
  );

  const success = useMemo(() => {
    if (data && data.subscribeEmailToNewsletter) {
      const { status } = data.subscribeEmailToNewsletter;
      return status === 'SUBSCRIBED';
    }
  }, [data, error]);

  return {
    initialValues,
    formApiRef,
    handleSubmit,
    success,
    error,
    loading: isSubmitting || loading
  };
};
