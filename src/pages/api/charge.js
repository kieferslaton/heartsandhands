import Stripe from 'stripe';
const stripe = new Stripe("sk_test_51GvjsmGJc8kSpHFEH6rZsGgl1eg1PNpODAaHRsRpB3evnALqVaDhIpN3yyM5ArkxcV4apefpn3rKkLz75OJXpOzh00uvDT2jAb")

export default async (req, res) => {
    const {id, amount} = req.body;

    try{
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Donation",
            payment_method: id,
            confirm: true
        });

        console.log(payment);

        return res.status(200).json({
            confirm: 'abc123'
        });
    }catch(error){

    }
};

