import React, { useState } from 'react';
import { TextControl, Button, Flex, Notice, Spinner, __experimentalSpacer as Spacer } from "@wordpress/components";
import { PaymentContext } from '../PaymentProvider';

const defaultState = {
    name: '',
    amount: '',
    email: '',
    phone: '',
};

export default function PaymentForm({ onClose }) {
    const { processing, success, error, doPayment: initiatePayment } = React.useContext(PaymentContext);
    const [formData, setFormData] = useState( defaultState );

    if( success ) {
        return null;
    }

    if( processing ) {
        return <Spinner />;
    }

    const DisplayErrorMessage = () => {
        const showErrorMessagesForErrorType = [
            'validation_error',
            'invalid_request_error',
            'failed_payment_error',
        ];

        if ( showErrorMessagesForErrorType.includes( error?.type ) ){
            return error.message;
        }

        return 'Payment failed. Please try again.';
    };

    return (
        <>
            { error && 
                (
                    <>
                        <Notice status="error" isDismissible={ false }>
                            { DisplayErrorMessage() }
                        </Notice>
                        <Spacer marginBottom={ 4 } />
                    </>
                )
            }
            <TextControl
                label="Name"
                type="text"
                value={
                    formData.name
                }
                onChange={
                    (name) => setFormData({ ...formData, name })
                }
                required
            />
            <TextControl
                label="Email"
                type="email"
                value={
                    formData.email
                }
                onChange={
                    (email) => setFormData({ ...formData, email })
                }
                required
            />
            <TextControl
                label="Phone Number"
                type="number"
                value={
                    formData.phone
                }
                min={ 10 }
                max={ 12 }
                onChange={
                    (phone) => setFormData({ ...formData, phone })
                }
                required
            />
            <TextControl
                label="Amount (in INR)"
                type="number"
                value={
                    formData.amount
                }
                onChange={
                    (amount) => setFormData({ ...formData, amount })
                }
                required
            />
            <Flex
                gap="4"
                justify="flex-start"
            >
                <Button variant="secondary" onClick={ onClose }>Cancel</Button>
                <Button variant="primary" onClick={ () => {
                    initiatePayment( formData );
                } }>Make Payment</Button>
            </Flex>
        </>
    );
};