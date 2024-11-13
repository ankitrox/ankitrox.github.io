/**
 * External dependencies
 */
import { useState } from 'react';
import { Modal } from "@wordpress/components";
import Form from './form';
import usePayment from '../../hooks/usePayment';

const PaymentDetails = ({ onClose = () => {} }) => {
    const [processing, setProcessing] = useState( false );
    const { doPayment } = usePayment();

    const initiatePayment = async (formData) => {
        setProcessing( true );
        await doPayment( formData );
        setProcessing( false );
    };

    return (
        <Modal
            title="Payment"
            onRequestClose={onClose}
            size={ 'medium' }
        >
            { ! processing && 
                <Form
                    onClose={ onClose }
                    initiatePayment={ initiatePayment }
                />
            }
        </Modal>
    );
};

export default PaymentDetails;
