"use server"

import Stripe from "stripe";

export async function createPaymentIntent(_number: number) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: "2025-01-27.acacia",
    });

    try {
        const amount = _number * 100; /// Convert to cents (e.g., 20 becomes 2000)
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            // Optionally, you can add metadata or other parameters
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return {
            clientSecret: paymentIntent.client_secret,
        };
    } catch (error) {
        // In a real app, you should handle the error properly
        console.error(error);
        throw error;
    }
}
