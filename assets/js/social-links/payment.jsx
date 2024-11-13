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
            <a href="#" title="Make a payment" target="_blank" key="payment">
                <button onClick={onClick} className="icon-btn money">
                    <i className="fa fa-cc-visa"></i>
                </button>
            </a>

            {isOpen && <PaymentDetails onClose={ onClose } /> }
        </>
    );
};

export default Payment;
