
const SectionTitle = ({subHeading, heading}) => {
    return (
        <div className="flex flex-col mt-10 items-center">
            <p className="text-yellow-600 text-sm lg:text-lg mb-2">---{subHeading}---</p>
            <h2 className="uppercase text-2xl md:text-4xl border-y-4 py-4">{heading}</h2>
        </div>
    );
};

export default SectionTitle;