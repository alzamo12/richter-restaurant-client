import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Rating } from "@smastrom/react-rating";
import coma from '../../../assets/icon/quotation-mark.png'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import '@smastrom/react-rating/style.css'

import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import axios from "axios";


const Testimonials = () => {
    const axiosPublic = useAxiosPublic();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axiosPublic.get('/reviews')
        .then(res => setReviews(res.data))
    }, [])

    return (
        <section className="my-10 md:my-20 inter">
            <SectionTitle
                subHeading="What Our Client say"
                heading="Testimonials"
            >
            </SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}
                    >
                        <div className=" flex flex-col items-center mx-12 md:mx-24 mt-7 md:my-8">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <img src={coma} className="w-12 h-10 md:w-24 md:h-20 mx-[46%] mt-6 md:mt-6" alt="" />
                            <p className="py-8">{review.details}</p>
                            <h3 className="text-2xl text-orange-400">{review.name}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Testimonials;