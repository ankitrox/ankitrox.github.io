import { useState } from 'react';
import { CREATE_TOKEN_PATH } from "../constants";

const defaultStatus = {
    initiated: false,
    processing: false,
    success: false,
    error: undefined,
};

export default function usePayment () {
    const [status, setStatus] = useState( defaultStatus );
    const { initiated, processing, success, error } = status;

    const doPayment = async (formData) => {
        try {
            setStatus({
                ...defaultStatus,
                initiated: true,
                processing: true,
            });

            const response = await fetch( CREATE_TOKEN_PATH, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                const cashfree = Cashfree({
                    mode:"sandbox" //or production
                });

                const result = await cashfree.checkout({
                    paymentSessionId: data?.payment_session_id,
                    redirectTarget: "_modal",
                });

                if ( result.error ) {
                    setStatus({
                        ...status,
                        processing: false,
                        error: result.error,
                    });
                }

                if( result.paymentDetails ) {
                    setStatus({
                        ...status,
                        processing: false,
                        success: true,
                    });
                }
            }
        } catch (error) {
            setStatus({
                ...status,
                processing: false,
                error: error,
            });
        }
    };

    const resetPaymentsStatus = () => {
        setStatus( defaultStatus );
    };

    return {
        doPayment,
        resetPaymentsStatus,
        processing: initiated && processing,
        success,
        error
    };
};
