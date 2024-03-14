// Import necessary modules
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SignupForm from './signup';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51OryqRKsSMFhuga1wGU0xYUfS6OYQeBJFnxgy7zecfvEB1SeiGAO2syLedWRGEHSyrKDXaLN17PcT2qMqWZTDbDr00fdtZ3B9S');

// Wrap your component tree with the <Elements> provider
const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <SignupForm />
      {/* Other components */}
    </Elements>
  );
};

export default App;
