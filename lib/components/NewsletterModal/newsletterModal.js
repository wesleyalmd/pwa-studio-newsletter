import React from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { shape, string } from 'prop-types';
import defaultClasses from './newsletterModal.css';
import { useNewsletterModal } from '../../talons/NewsletterModal/useNewsletterModal';
import { FormattedMessage, useIntl } from 'react-intl';
import Checkbox from '@magento/venia-ui/lib/components/Checkbox';
import Image from '@magento/venia-ui/lib/components/Image';
import Modal from '../Modal';
import NewsletterForm from '../NewsletterForm';
import bannerNewsletterModal from './bannerNewsletterModal.jpg';

const NewsletterModal = props => {
  const {
    showNewsletterModal,
    newsletterModalOpen,
    handleSuccessModal,
    handleCancelModal,
    dontShowAgain,
    handleDontShowAgain
  } = useNewsletterModal();

  const classes = mergeClasses(defaultClasses, props.classes);
  const { formatMessage } = useIntl();

  return showNewsletterModal ? (
    <div className={classes.root}>
      <Modal isOpen={newsletterModalOpen} handleClose={handleCancelModal}>
        <div className={classes.wrapper}>
          <Image
            classes={{ image: classes.image, root: classes.imageContainer }}
            src={bannerNewsletterModal}
            displayPlaceholder={true}
            alt={formatMessage({
              id: 'newsletter.subscribeToYourNewsletter',
              defaultMessage: 'Subscribe to your Newsletter'
            })}
          />

          <div className={classes.body}>
            <div className={classes.heading}>
              <h2>
                <FormattedMessage
                  id={'newsletter.subscribeToYourNewsletter'}
                  defaultMessage={'Subscribe to your Newsletter'}
                />
              </h2>
              <p>
                <FormattedMessage
                  id={'newsletter.signUpForLatestNews'}
                  defaultMessage={
                    'Get the latest updates on news products and upcoming sales.'
                  }
                />
              </p>
            </div>
            <NewsletterForm onSuccess={handleSuccessModal} />

            <div className={classes.dontShowAgain}>
              <Checkbox
                field="dontShowAgain"
                label={formatMessage({
                  id: 'newsletter.dontShowAgain',
                  defaultMessage: "Don't show this popup again"
                })}
                value={dontShowAgain}
                onChange={handleDontShowAgain}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  ) : null;
};

NewsletterModal.propTypes = {
  classes: shape({ root: string })
};

NewsletterModal.defaultProps = {};

export default NewsletterModal;
