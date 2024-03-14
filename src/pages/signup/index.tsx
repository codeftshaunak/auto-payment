// components/SignupForm.tsx

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

        const { token, error } = await stripe.createToken(elements.getElement(CardElement));
        console.log(token);

        if (error) {
            setError(error.message);
        } else {
            // Send token.id to your backend for storage
            console.log(token);
            // Proceed with user registration process
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
