import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg'
import './featured.css'
import CenteredBtn from "../../../components/CenteredBtn/CenteredBtn";

const Featured = () => {
    return (
        <div className="featured-item lg:w-[99.5vw] hero justify-center place-items-stretch bg-fixed text-white  my-8 md:my-20 relative left-1/2 right-1/2 -mx-[50vw]">
            <div className=" hero-overlay bg-black bg-opacity-75"></div>
            <SectionTitle
                subHeading="check it out"
                heading="Featured Item"
            ></SectionTitle>
            <div className="md:flex justify-center items-center mt-32 md:mt-40 pb-10 md:pb-20 pt-12 px-8 lg:px-32 xl:px-52">
                <div className="w-full">
                    <img className="w-[50%] md:w-full" src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10 mt-6 md:mt-0">
                    <p>Aug 2, 2029</p>
                    <p className="uppercase">Where can i get some?</p>
                    <p className="text-[12px] md:text-xl">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident velit enim consequatur? Reprehenderit id dolores fugit, assumenda ex quis officia doloremque impedit architecto debitis deserunt, facere dolore unde minus porro.</p>
                    <button className="btn btn-outline border-b-2 border-white border-0 inter font-semibold text-white">Order Now</button>
                    {/* <CenteredBtn buttonText='Order Now'></CenteredBtn> */}
                </div>
            </div>
        </div>
    );
};

export default Featured;