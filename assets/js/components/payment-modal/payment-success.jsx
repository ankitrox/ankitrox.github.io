const PaymentSuccess = () => {
    return (
        <div className="payment-success">
            <div className="payment-success__icon">
                <i className="fa fa-check-circle"></i>
            </div>
            <div className="payment-success__message">
                <p>Thank you for your payment.</p>
                <p>Your payment has been successfully processed.</p>
            </div>
        </div>
    );
};

export default PaymentSuccess;
