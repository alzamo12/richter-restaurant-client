import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../../assets/home/01.jpg'
import img2 from '../../../assets/home/02.jpg'
import img3 from '../../../assets/home/03.png'
import img4 from '../../../assets/home/04.jpg'
import img5 from '../../../assets/home/05.png'
import img6 from '../../../assets/home/06.png'
import './Banner.css'
const Banner = () => {
    return (
        <div className="w-[100vw] lg:h-[95vh] relative left-1/2 right-1/2 -mx-[50vw]  ">
            <Carousel className="">
                <div className="lg:h-[85vh]">
                    <img className="h-full" src={img1} />
                </div>
                <div className="lg:h-[85vh]">
                    <img className="h-full" src={img2} />
                </div>
                <div className="lg:h-[85vh]">
                    <img className="h-full" src={img3} />
                </div>
                <div className="lg:h-[85vh]">
                    <img className="h-full" src={img4} />
                </div>
                <div className="lg:h-[85vh]">
                    <img className="h-full" src={img5} />
                </div>
                <div className="lg:h-[85vh]">
                    <img className="h-full" src={img6} />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;