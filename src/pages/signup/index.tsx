import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const SignupForm: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        try {
            // Call your backend to create a PaymentIntent
            const response = await fetch('http://localhost:3001/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: 2000, // Amount in cents
                    currency: 'usd',
                }),
            });


            if (!response.ok) {
                throw new Error('Failed to create payment intent');
            }

            const responseData = await response.json();

            console.log(responseData);

            const { clientSecret } = responseData;

            // Confirm PaymentIntent
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        // You can include additional billing details here
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
                return;
            }

            // Payment successful, proceed with user registration process
            console.log('Payment successful:', result.paymentIntent);

            // Proceed with user registration process...
        } catch (error) {
            console.error('Error creating payment intent:', error);
            setError('Failed to create payment intent');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Sign Up
            </button>
            {error && <div>{error}</div>}
        </form>
    );
};

export default SignupForm;
