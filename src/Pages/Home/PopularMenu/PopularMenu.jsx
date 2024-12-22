import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {
    const [menu] = useMenu();
    const popularMenu = menu.filter(item => item.category === 'popular')
    return (
        <section className='mb-12 md:mt-24 md:space-y-14 '>
            <SectionTitle
                heading="From our Menu"
                subHeading="Popular Items"
            ></SectionTitle>
          <div className="grid md:grid-cols-2 gap-10">
            {
                popularMenu.map(item => <MenuItem
                key={item._id}
                menuItem={item}
                ></MenuItem>)
            }
          </div>
            <button className="btn btn-outline inter font-medium  border-b-2 lg:ml-[560px] uppercase border-black border-0 text-black text-[16px] px-8">View Full Now</button>
        </section>
    );
};

export default PopularMenu;