import { Parallax } from 'react-parallax';

const Cover = ({ img, title, fontStyle, description }) => {
    return (
        <Parallax
            blur={{ min: -50, max: 50 }}
            bgImage={img}
            bgImageAlt="the dog"
            strength={200}
        >
            <div
                className={`hero  h-[600px] ${fontStyle}`}
            >
                <div className="hero-overlay h-1/2 w-[80%] bg-black bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center brightness-150">
                    <div className="">
                        <h1 className=" font-bold uppercase">{title}</h1>
                        <p className="mb-5 font-semibold w-3/4 mx-auto">
                       {description}
                        </p>
                    </div>
                </div>

            </div>
        </Parallax>

    );
};

export default Cover;