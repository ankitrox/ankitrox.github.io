import { useState } from 'react';
import { CREATE_TOKEN_PATH } from "../constants";

export default function usePayment () {
    const [status, setStatus] = useState( {
        initiated: false,
        processing: false,
        success: false,
    } );

    const doPayment = async (formData) => {
        try {
            setStatus({
                ...status,
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

                console.log('result', result);

                if ( result.error ) {
                    setStatus({
                        ...status,
                        processing: false,
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
            console.error( error );
            setStatus({
                ...status,
                processing: false,
            });
        }
    };

    const resetPaymentsStatus = () => {
        setStatus({
            initiated: false,
            processing: false,
            success: false,
        });
    };

    return {
        doPayment,
        resetPaymentsStatus,
        status,
    };
};
