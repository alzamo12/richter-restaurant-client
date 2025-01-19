import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router";

// TODO:
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    const location = useLocation();
    return (
        <div className="my-[15%]">
            <SectionTitle
                heading="Payment"
                subHeading="Please pay to eat"
            ></SectionTitle>
            <Elements stripe={stripePromise}>
                <CheckoutForm data={location.state} ></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;