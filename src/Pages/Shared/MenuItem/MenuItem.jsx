import React from 'react';

const MenuItem = ({menuItem}) => {

    const {name, image, price, recipe, } = menuItem;

    return (
        <div className='flex gap-5'>
            <img className='max-w-20 max-h-20 lg:w-[120px] rounded-r-[200px] rounded-bl-[200px] rounded-tl-none ' src={image} alt="" />
            <div>
                <h3 className='uppercase  cinzel text-lg md:text-2xl '>{name} ------------------</h3>
                <p className='text-[#737373] text-sm lg:text-[16px]'>{recipe}</p>
            </div>
            <p className='text-[#BB8506] text-lg lg:text-[20px] inter'>${price}</p>
        </div>
    );
};

export default MenuItem;