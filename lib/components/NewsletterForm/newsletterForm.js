import React, { useCallback, useEffect } from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { func, shape, string } from 'prop-types';
import defaultClasses from './newsletterForm.css';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNewsletterForm } from '../../talons/NewsletterForm/useNewsletterForm';
import { useToasts } from '@magento/peregrine';
import { Form } from 'informed';
import Field from '@magento/venia-ui/lib/components/Field';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import Button from '@magento/venia-ui/lib/components/Button';
import { AlertCircle, CheckCircle } from 'react-feather';
import Icon from '@magento/venia-ui/lib/components/Icon';
import Loading from '@magento/venia-ui/lib/components/LoadingIndicator';

const NewsletterForm = props => {
  const { onSuccess } = props;
  const classes = mergeClasses(defaultClasses, props.classes);
  const {
    initialValues,
    formApiRef,
    handleSubmit,
    success,
    error,
    loading
  } = useNewsletterForm({
    onSuccess
  });
  const { formatMessage } = useIntl();
  const [, { addToast }] = useToasts();

  const handleSuccessToast = useCallback(() => {
    addToast({
      type: 'info',
      icon: <Icon src={CheckCircle} attrs={{ width: 18 }} />,
      message: formatMessage({
        id: 'newsletter.successMessage',
        defaultMessage: 'Newsletter subscribed successfully!'
      }),
      timeout: 6000
    });
  }, [addToast, success]);

  useEffect(() => {
    if (success) {
      handleSuccessToast();
    }
  }, [success]);

  const parseErrorMessage = error => {
    const str = error.toString();

    if (str.includes('already subscribed')) {
      return formatMessage({
        id: 'newsletter.alreadySubscribed',
        defaultMessage: 'This email address is already subscribed.'
      });
    }
    
    if (str.includes('valid email address')) {
      return formatMessage({
        id: 'newsletter.enterValidEmailAddress',
        defaultMessage: 'Enter a valid email address.'
      });
    }

    return formatMessage({
      id: 'newsletter.genericError',
      defaultMessage: 'There was an unexpected error.'
    });
  };

  const handleError = useCallback(() => {
    addToast({
      type: 'error',
      icon: <Icon src={AlertCircle} attrs={{ width: 18 }} />,
      message: parseErrorMessage(error),
      timeout: 6000
    });
  }, [addToast, error]);

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);

  const submitButton = (
    <Button
      className={classes.submitButton}
      disabled={loading}
      type="submit"
      priority="high"
    >
      {loading ? (
        <Loading />
      ) : (
        <FormattedMessage id={'newsletter.subscribe'} defaultMessage={'Subscribe'} />
      )}
    </Button>
  );

  return (
    <div className={classes.root}>
      <Form
        getApi={formApi => (formApiRef.current = formApi)}
        initialValues={initialValues}
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Field optional={true}>
          <TextInput
            field="email"
            autoComplete="email"
            placeholder={formatMessage({
              id: 'newsletter.emailPlaceholder',
              defaultMessage: 'Your e-mail address'
            })}
          />
        </Field>
        {submitButton}
      </Form>
    </div>
  );
};

NewsletterForm.propTypes = {
  classes: shape({ root: string }),
  onSuccess: func
};

NewsletterForm.defaultProps = {};

export default NewsletterForm;
