import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import PopularMenu from '../PopularMenu/PopularMenu';
import Featured from '../Featured/Featured';
import Testimonials from '../Testimonials/Testimonials';
import { Helmet } from 'react-helmet-async';
import Richter from '../Richter/Richter';
import CallUs from '../CallUs/CallUs';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Richter Restaurant | Home</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <Richter></Richter>
            <PopularMenu></PopularMenu>
            <CallUs></CallUs>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;