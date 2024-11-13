/**
 * External dependencies
 */
import { useEffect } from 'react';
import { Modal, Spinner } from "@wordpress/components";
import usePayment from '../../hooks/usePayment';
import Form from './form';

const PaymentDetails = ({ onClose = () => {} }) => {
    const { doPayment, resetPaymentsStatus, status } = usePayment();
    const { initiated, processing, success: paymentSucceeded } = status;

    const paymentsYetToBeMade = ! initiated && ! processing;
    const paymentProcessing = initiated && processing;

    useEffect(() => {
        let timer;

        if (paymentSucceeded) {
            timer = setTimeout(() => {
                onClose();
                resetPaymentsStatus();
            }, 0);
        }

        // Cleanup to clear any pending timer when component unmounts
        return () => clearTimeout(timer);
    }, [paymentSucceeded, onClose, resetPaymentsStatus]);

    return (
        <Modal
            title="Payment"
            onRequestClose={onClose}
            size={ 'medium' }
        >
            { paymentsYetToBeMade && 
                <Form
                    onClose={ onClose }
                    initiatePayment={ doPayment }
                />
            }
            { paymentProcessing && <Spinner /> }
        </Modal>
    );
};

export default PaymentDetails;
