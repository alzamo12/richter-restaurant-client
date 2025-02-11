import { useState } from "react";
import FoodCard from "../../../components/FoodCard/FoodCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const OrderTab = ({ menu, handlePrev, handleNext, currentPage }) => {
    // const [currentPage, setCurrentPage] = useState(1);
    const items = menu.result
    const itemsPerPage = 5;

    // calculate total pages from the data
    const totalPages = Math.ceil(menu.total / itemsPerPage) || 1;

    return (
        <div className="mx-5">
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-10 '>
                {
                    items?.map(item => <FoodCard
                        item={item}
                        key={item._id}>
                    </FoodCard>)
                }
            </div>
            {/* pagination button */}
            <div>
                <div className="w-80 mx-auto md:mx-0 grid grid-cols-3 mt-12">
                    {/* previous button */}
                    <button
                        onClick={() => handlePrev(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="w-14 h-14 rounded-full btn btn-outline">
                        <FaArrowLeft></FaArrowLeft>
                    </button>
                    <div className="flex justify-center">
                        <span className="mt-4">{currentPage} / {totalPages}</span>
                    </div>
                    {/* next button  */}
                    <div className="flex justify-end">
                        <button
                            onClick={() => handleNext(currentPage + 1)}
                            disabled={items?.length < 5}
                            className="w-14 h-14 rounded-full btn btn-outline">
                            <FaArrowRight></FaArrowRight>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTab;