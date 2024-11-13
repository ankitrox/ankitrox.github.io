import { CREATE_TOKEN_PATH } from "../constants";

export default function usePayment () {
    const doPayment = async (formData) => {
        try {
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

            } else {
                alert('Payment failed');
            }
        } catch (error) {
            alert('Payment failed');
        }
    }

    return { doPayment };
};