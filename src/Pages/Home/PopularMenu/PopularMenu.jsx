import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';
import CenteredBtn from '../../../components/CenteredBtn/CenteredBtn';

const PopularMenu = () => {
    const [menu] = useMenu();
    const popularMenu = menu.filter(item => item.category === 'popular')
    return (
        <section className='md:mx-0 md:mt-20 md:space-y-14 grid justify-center mx-auto'>
            <SectionTitle
                heading="From our Menu"
                subHeading="Popular Items"
            ></SectionTitle>
          <div className="mt-8 grid md:grid-cols-2 gap-10 mx-4 md:mx-6 lg:mx-0">
            {
                popularMenu.map(item => <MenuItem
                key={item._id}
                menuItem={item}
                ></MenuItem>)
            }
          </div>
          {/* <button className="btn btn-outline w-[30%] mt-4 inter font-medium  border-b-2 mx-[35%] lg:mx-[35%] uppercase border-black border-0 text-black text-[10px] md:text-[16px] md:px-8">View Full Now</button> */}
            <CenteredBtn buttonText="View full now"></CenteredBtn>
        </section>
    );
};

export default PopularMenu;