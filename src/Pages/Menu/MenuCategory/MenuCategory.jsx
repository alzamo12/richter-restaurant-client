import { Link } from "react-router";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import CenteredBtn from "../../../components/CenteredBtn/CenteredBtn";

const MenuCategory = ({ items, img, title, description }) => {
    return (
        <div className="pt-8">
            {title ? <Cover img={img} title={title} description={description} fontStyle={`cover-text-class-food`}></Cover> : null}
            <div className="grid md:grid-cols-2 gap-10
              ">
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        menuItem={item}
                    ></MenuItem>)
                }
            </div>
            <Link to={`/order/${title}`}>
                <CenteredBtn buttonText="Order your favorite food"></CenteredBtn>
            </Link>
        </div>
    );
};

export default MenuCategory;