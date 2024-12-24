import { CardElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useCart from '../../../hooks/useCart';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const CheckoutForm =  () => {
    // const navigate = useNavigate()
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const [cart, refetch] =  useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)


    useEffect(() => {
       if(totalPrice){
        axiosSecure.post('/create-payment-intent', { price: totalPrice })
        .then(res => {
            console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
        })
       }
    }, [totalPrice, axiosSecure])

    const handleSubmit = async (event) => {
        event.preventDefault()
        // check if stripe or element value is null or false
        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return
        };

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error)
            setErrorMessage(error.message)
        }
        else {
            console.log('payment method', paymentMethod)
            setErrorMessage('')
        }
        // confirm payment
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if(confirmError){
            console.log('payment error')
        }   
        else{
            console.log('payment intent', paymentIntent)
            if(paymentIntent.status === 'succeeded'){
                console.log('transaction id:', paymentIntent.id)
                setTransactionId(paymentIntent.id)

                const payment ={
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                }
               const res = await axiosSecure.post('/payments', payment);
               console.log('payment saved', res.data)
               refetch()
               if(res.data?.paymentResult?.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
               }
            }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            ':: placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146'
                        }
                    }
                }}
            ></CardElement>
            <button type='submit' disabled={!stripe || !clientSecret}> Pay </button>
            <p className='text-red-600'>{errorMessage}</p>
            {
                transactionId && <p>Your transaction Id is: <span className='text-green-600'>{transactionId}</span></p>
            }
        </form>
    );
};

export default CheckoutForm;