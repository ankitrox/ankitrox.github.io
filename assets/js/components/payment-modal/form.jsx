import { useState } from 'react';
import { TextControl, Button, Flex } from "@wordpress/components";

const defaultState = {
    name: '',
    amount: '',
    email: '',
    phone: '',
};

export default function Form({ initiatePayment, onClose }) {
    const [formData, setFormData] = useState( defaultState );

    return (
        <>
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
                <Button variant="primary" onClick={ initiatePayment}>Make Payment</Button>
            </Flex>
        </>
    );
};