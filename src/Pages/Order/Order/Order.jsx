import { useEffect, useState } from 'react';
import orderCover from '../../../assets/shop/banner2.jpg'
import Cover from '../../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../hooks/useMenu';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import './Order.css'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const Order = () => {
    const axiosPublic = useAxiosPublic();
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePrev = (prevPage) => {
        setCurrentPage(prevPage)
    };

    const handleNext = (nextPage) => {
        setCurrentPage(nextPage)
    }

    const currentTabFood = categories[tabIndex];
    const [prevTabFood, setPrevTabFood] = useState(currentTabFood); // use this to show data properly
    const { data: menu = [], isLoading } = useQuery({
        queryKey: ['menu', currentTabFood, currentPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/menu?category=${currentTabFood}&page=${currentPage}&limit=${5}`);
            // console.log('API Response:', res.data);
            if (currentTabFood !== prevTabFood) {
                // set current page 1 and prev food to current tab food 
                setCurrentPage(1);
                setPrevTabFood(currentTabFood)
            }
            return res.data
        }
    });

    if (isLoading) {
        return <span className="loading loading-spinner loading-lg absolute top-[50%] left-[50%]"></span>
    }

    return (
        <div className=''>
            <Helmet>
                <title>Richter | Order Food</title>
            </Helmet>

            <Cover
                img={orderCover}
                fontStyle={`cover-text-class-header`}
                title="Our Food"
                description="Would you like tp try a dish"
            ></Cover>
            <Tabs defaultIndex={tabIndex} onSelect={(index) => { setTabIndex(index) }}>
                <TabList className="uppercase flex gap-4 text-xl inter font-medium mb-10 mx-[30%]">
                    {/* {
                        categories.map((tab, index) => <Tab key={index}
                            className={tabIndex === index ? 'active-tab' : ''}
                        >{tab}</Tab>)
                    } */}
                    <Tab selectedClassName='active-tab'>salad</Tab>
                    <Tab selectedClassName='active-tab'>pizza</Tab>
                    <Tab selectedClassName='active-tab'>soup</Tab>
                    <Tab selectedClassName='active-tab'>dessert</Tab>
                    <Tab selectedClassName='active-tab'>drink</Tab>
                </TabList>

                <TabPanel>
                    <OrderTab menu={menu} currentPage={currentPage} handlePrev={handlePrev} handleNext={handleNext}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab menu={menu} currentPage={currentPage} handlePrev={handlePrev} handleNext={handleNext}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab menu={menu} currentPage={currentPage} handlePrev={handlePrev} handleNext={handleNext}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab menu={menu} currentPage={currentPage} handlePrev={handlePrev} handleNext={handleNext}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab menu={menu} currentPage={currentPage} handlePrev={handlePrev} handleNext={handleNext}></OrderTab>
                </TabPanel>
            </Tabs>
        </div>

    );
};

export default Order;