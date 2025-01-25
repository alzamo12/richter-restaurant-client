import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { createContext, useState } from "react";
import { useNavigate } from "react-router";

const Reservation = () => {
    const [guests, setGuests] = useState(1)
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    const handleChange = e => {
        setGuests(e.target.value)
        // console.log(e.target.value)
    }

    // console.log(guests)

    const onSubmit = data => {
        const reservationInfo = {
            date: data.date,
            time: data.time,
            guest: guests,
            phone: data.phone,
            name: data.name,
            email: data.email,
            paymentType: 'reservation'
        }
        // console.log(reservationInfo)
        navigate('/dashboard/payment', { state: { data: reservationInfo } });
    };



    // const selectedGuests = watch('guest');
    // console.log(selectedGuests)

    return (
        <div className="mx-auto p-5">
            <SectionTitle
                heading="Book a table"
                subHeading="reservation"
            ></SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 lg:w-2/3 mx-auto gap-5 inter font-semibold text-xl mt-10" action="">
                {/* date */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Date*</span>
                    </label>
                    <input type="date" {...register("date", { required: true })} className="input input-bordered h-16" required />
                </div>
                {/* time */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Time*</span>
                    </label>
                    <input type="time" {...register("time", { required: true })} placeholder="email" className="input input-bordered h-16" required />
                </div>
                {/* guest */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Guest*</span>
                    </label>
                    <select onChange={handleChange} className="input input-bordered text-black h-16" name="" id="guest">
                        <option className="" value={1} >1 Person</option>
                        <option className="" value={2} >2 Person</option>
                        <option className="" value={3} >3 Person</option>
                        <option className="" value={4} >Family</option>
                    </select>

                </div>
                {/* Name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name*</span>
                    </label>
                    <input type="name" {...register("name", { required: true })} placeholder="Your Name" className="input input-bordered h-16" required />
                </div>
                {/* Phone */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Phone*</span>
                    </label>
                    <input type="number" {...register("phone", { required: true })} placeholder="Phone Number" className="input input-bordered h-16" required />
                </div>
                {/* Email */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email*</span>
                    </label>
                    <input type="email" {...register("email", { required: true })} placeholder="Email" className="input input-bordered h-16" required />
                </div>
                <input className="bg-[#835D23] text-white py-4 " type="submit" value="submit" />
            </form>
        </div>
    );
};

export default Reservation;