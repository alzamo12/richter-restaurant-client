import { Parallax } from 'react-parallax';
import './Cover.css'

const Cover = ({ img, title, fontStyle, description }) => {
    return (
        <div className='w-[99.5vw] left-1/2 right-1/2 relative -mx-[50vw] mb-8 lg:mb-24'>
            <Parallax
                blur={{ min: -50, max: 50 }}
                bgImage={img}
                bgImageAlt="the dog"
                strength={200}
            >
                <div
                    className={`hero h-[250px] lg:h-[700px] ${fontStyle}`}
                >
                    <div className="hero-overlay h-1/2 w-[80%] bg-black bg-opacity-60"></div>
                    <div className="hero-content text-neutral-content text-center brightness-150">
                        <div className="">
                            <h1 className=" font-bold uppercase">{title}</h1>
                            <p className="mb-5 font-semibold w-[80%] md:w-3/4 mx-auto">
                                {description}
                            </p>
                        </div>
                    </div>

                </div>
            </Parallax>
        </div>

    );
};

export default Cover;