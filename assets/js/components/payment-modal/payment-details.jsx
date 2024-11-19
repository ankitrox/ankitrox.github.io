/**
 * External dependencies
 */
import React from 'react';
import { Modal } from "@wordpress/components";
import PaymentForm from './payment-form';
import PaymentSuccess from './payment-success';
import { PaymentContext } from '../PaymentProvider';

const PaymentDetails = ({ onClose = () => {} }) => {
    const { processing, resetPaymentsStatus, success } = React.useContext(PaymentContext);

    const onModalClose = () => {
        resetPaymentsStatus();
        onClose();
    };

    const modalTitle = processing ? 'Initiating Payment...' : 'Payment Details';

    return (
        <Modal
            title={ ! success ? modalTitle : null }
            onRequestClose={ onModalClose }
            size={ 'medium' }
            focusOnMount={ true }
            isDismissible={ success }
            shouldCloseOnEsc={ false }
            shouldCloseOnClickOutside={ success }
        >
            <PaymentForm onClose={ onModalClose } />
            { success && <PaymentSuccess /> }
        </Modal>
    );
};

export default PaymentDetails;
