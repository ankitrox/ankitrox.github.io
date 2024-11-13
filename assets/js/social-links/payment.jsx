import React, { useState } from "react";
import { PaymentDetails } from "../components/payment-modal";

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
        <>
            <a href="#" target="_blank" key="github">
                <button onClick={onClick} className="icon-btn paypal">
                    <i className="fa fa-paypal"></i>
                </button>
            </a>

            {isOpen && <PaymentDetails onClose={ onClose } /> }
        </>
    );
};

export default Payment;
