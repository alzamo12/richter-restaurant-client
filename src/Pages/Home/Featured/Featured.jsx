import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg'
import './featured.css'

const Featured = () => {
    return (
        <div className="featured-item hero justify-center place-items-stretch bg-fixed text-white   my-20 ">
              <div className=" hero-overlay bg-opacity-60"></div>
            <SectionTitle
            subHeading="check it out"
            heading="Featured Item"
            ></SectionTitle>
            <div className="md:flex justify-center items-center mt-40 pb-20 pt-12 px-36">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10 ">
                    <p>Aug 2, 2029</p>
                    <p className="uppercase">Where can i get some?</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident velit enim consequatur? Reprehenderit id dolores fugit, assumenda ex quis officia doloremque impedit architecto debitis deserunt, facere dolore unde minus porro.</p>
                    <button className="btn btn-outline border-b-2 border-black border-0 text-white">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;