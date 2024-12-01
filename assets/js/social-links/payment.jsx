import React, { useState } from "react";
import { PaymentDetails } from "../components/payment-modal";
import PaymentProvider from '../components/PaymentProvider';


const Payment = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onClick = (e) => {
        e.preventDefault();
        setIsOpen(true);
    };

    const onClose = () => {
        setIsOpen(false);
    };

    return (
        <PaymentProvider>
            <a href="#" title="Make a payment" target="_blank" key="payment">
                <button onClick={onClick} className="icon-btn money">
                    <i className="fa fa-cc-visa"></i>
                </button>
            </a>

            {isOpen && <PaymentDetails onClose={ onClose } /> }
        </PaymentProvider>
    );
};

export default Payment;
