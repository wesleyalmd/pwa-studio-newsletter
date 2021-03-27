import React from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import defaultClasses from './newsletterFooter.css';
import { useNewsletter } from '../../talons/Newsletter/useNewsletter';
import NewsletterForm from '../NewsletterForm';

const NewsletterFooter = props => {
  const classes = mergeClasses(defaultClasses, props.classes);
  const { handleSuccess } = useNewsletter();

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <h4>
            <FormattedMessage
              id={'newsletter.subscribeToYourNewsletter'}
              defaultMessage={'Subscribe to your Newsletter'}
            />
          </h4>
          <p>
            <FormattedMessage
              id={'newsletter.signUpForLatestNews'}
              defaultMessage={
                'Get the latest updates on news products and upcoming sales.'
              }
            />
          </p>
          <NewsletterForm onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
};

NewsletterFooter.propTypes = {
  classes: shape({ root: string })
};

NewsletterFooter.defaultProps = {};

export default NewsletterFooter;
