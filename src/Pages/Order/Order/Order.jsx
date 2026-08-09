import { Suspense, useEffect, useState } from 'react';
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
    const categories = ['offered', 'salad', 'pizza', 'soup', 'dessert', 'drinks'];
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
    // const tabLists = ['offered', 'salad', 'pizza', 'soup', 'dessert', 'drink'];

    // if (isLoading) {
    //     return <span className="loading loading-spinner loading-lg absolute top-[50%] left-[50%]"></span>
    // }

    return (
        <div className='w-auto mx-auto relative'>
            <Helmet>
                <title>Richter | Order Food</title>
            </Helmet>

            <Cover
                img={orderCover}
                fontStyle={`cover-text-class-header`}
                title="Our Food"
                description="Would you like tp try a dish"
            ></Cover>
            <Suspense
                // fallback={<span className="loading loading-spinner loading-lg  absolute top-[50%] left-[50%]"></span>}
            >
                <Tabs
                    defaultIndex={tabIndex}
                    onSelect={(index) => { setTabIndex(index) }}
                    className="min-h-[50vh] relative"
                >
                    <TabList className="uppercase flex md:gap-8 md:text-xl inter font-medium md:mb-10 mb-5 xl:mx-[30%] 
                                        lg:mx-[25%] xl:w-auto lg:w-auto max-w-xl mx-auto"
                    >
                        {
                            categories.map(category => <Tab
                                className="w-full text-center text-[15px]
                            md:text-xl cursor-pointer"
                                selectedClassName='active-tab'
                                key={category}
                            >{category}
                            </Tab>)
                        }
                    </TabList>
                    {
                        categories.map(category => <TabPanel
                            key={category}
                        >
                            <OrderTab
                                menu={menu}
                                isLoading={isLoading}
                                currentPage={currentPage}
                                handlePrev={handlePrev}
                                handleNext={handleNext}
                            ></OrderTab>
                        </TabPanel>)
                    }
                </Tabs>
            </Suspense>
        </div>

    );
};

export default Order;