import React from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { bool, func, node, shape, string } from 'prop-types';
import defaultClasses from './modal.css';
import { Portal } from '@magento/venia-ui/lib/components/Portal';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { X as CloseIcon } from 'react-feather';

const Modal = props => {
  const { isOpen, children, handleClose } = props;
  const classes = mergeClasses(defaultClasses, props.classes);
  const rootClass = isOpen ? classes.root_open : classes.root;

  return (
    <Portal>
      <div className={rootClass}>
        <div className={classes.container}>
          <button className={classes.mask} onClick={handleClose} type="button" />

          <div className={classes.modal}>
            <button className={classes.close} onClick={handleClose} type="button">
              <Icon src={CloseIcon} />
            </button>
            <div className={classes.body}>{children}</div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

Modal.propTypes = {
  classes: shape({ root: string }),
  isOpen: bool.isRequired,
  handleClose: func.isRequired,
  header: node,
  actions: node
};

Modal.defaultProps = {};

export default Modal;
