import React from "react";
import usePayment from '../hooks/usePayment';

export const PaymentContext = React.createContext();

export default function PaymentProvider({ children }) {
    const paymentStatus = usePayment();

    return (
        <PaymentContext.Provider value={ paymentStatus || {} }>
            {children}
        </PaymentContext.Provider>
    );
}
