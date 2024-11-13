import React, { useState } from "react";
import { Modal, TextControl, Button, Flex } from "@wordpress/components";

const defaultState = {
    name: '',
    amount: '',
    email: '',
    phone: '',
};

const Payment = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState( defaultState );
    const [processing, setProcessing] = useState( false );

    const onClick = (e) => {
        e.preventDefault();
        setIsOpen(true);
    };

    const onClose = () => {
        // Prevent closing the modal while processing
        if ( processing ) {
            return;
        }

        setIsOpen(false);
    };

    const doPayment = async () => {
        setProcessing( true );
        //setFormData( defaultState );

        const response = await fetch(
            'https://api.ankitgade.in/wp-json/cashfree/v1/create-token',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( formData ),
            }
        );

        const data = await response.json();

        const cashfree = Cashfree({
            mode:"sandbox" //or production
        });

        const result = await cashfree.checkout({
            paymentSessionId: data?.payment_session_id,
            redirectTarget: "_modal",
        });

        setProcessing( true );
        console.log( result );
    };

    return (
        <>
            <a href="#" target="_blank" key="github">
                <button onClick={onClick} className="icon-btn paypal">
                    <i className="fa fa-paypal"></i>
                </button>
            </a>
            
            {isOpen && (
                <Modal
                    title="Payment"
                    onRequestClose={onClose}
                    size={ 'medium' }
                >
                    <TextControl
                        label="Name"
                        type="text"
                        value={
                            formData.name
                        }
                        onChange={
                            (name) => setFormData({ ...formData, name })
                        }
                    />
                    <TextControl
                        label="Amount"
                        type="number"
                        value={
                            formData.amount
                        }
                        onChange={
                            (amount) => setFormData({ ...formData, amount })
                        }
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
                    />
                    <Flex
                        gap="4"
                        justify="flex-start"
                    >
                        <Button variant="secondary" onClick={ onClose }>Cancel</Button>
                        <Button variant="primary" onClick={ doPayment }>Make Payment</Button>
                    </Flex>
                </Modal>
            )}
        </>
    );
};

export default Payment;
