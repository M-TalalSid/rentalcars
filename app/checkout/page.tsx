"use client"

import React , {useState, useEffect} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from './action';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

    export default function CheckoutPage() {
        const [clientSecret, setClientSecret] = 
        useState<string | null>(null);

        useEffect(() => {
            createPaymentIntent(2000)
            .then((res: { clientSecret: React.SetStateAction<string | null>; }) => {
                    setClientSecret(res.clientSecret);
            })
        }, []);
        console.log(clientSecret);

        if (!clientSecret) {
            return <div>Loading...</div>;
        }    

        return (
            <div style={{ width: 400, margin: "0 auto" }}>
                <h1>Checkout</h1>
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                <PaymentForm />
                </Elements>
            </div>
        );

        function PaymentForm() {
            const stripe = useStripe();
            const elements = useElements();
            const [isProcessing, setIsProcessing] = useState(false);
            const [errorMessage, setErrorMessage] = useState<string | null>(null);

            const handleSubmit = async (e: React.FormEvent) => {
                e.preventDefault();

                if (!stripe || !elements) return;

                setIsProcessing(true);

                const { error } = await stripe.confirmPayment({
                    elements,
                    redirect: "if_required",
                });

                if (error) {
                    setErrorMessage(error.message || "Something went wrong!");
                    setIsProcessing(false);
                } else {
                    setErrorMessage(null);
                    alert("Payment Successful!");
                    setIsProcessing(false);
                }
            };

            return (
                <form onSubmit={handleSubmit}>
                    <PaymentElement />
                    <button type="submit" disabled={!stripe || isProcessing}>
                        {isProcessing ? "Processing..." : "Pay Now"}
                    </button>
                    {errorMessage && <div style={{ color: "red", marginTop: 8 }}>{errorMessage}</div>}
                </form>
            );
        }
    }