import React, { Fragment } from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { shape, string } from 'prop-types';
import defaultClasses from './newsletter.css';
import { useNewsletter } from '../../talons/Newsletter/useNewsletter';
import NewsletterForm from '../NewsletterForm';

const Newsletter = props => {
  const classes = mergeClasses(defaultClasses, props.classes);
  const { handleSuccess } = useNewsletter();

  return (
    <Fragment>
      <div className={classes.root}>
        <NewsletterForm onSuccess={handleSuccess} />
      </div>
    </Fragment>
  );
};

Newsletter.propTypes = {
  classes: shape({ root: string })
};

Newsletter.defaultProps = {};

export default Newsletter;
