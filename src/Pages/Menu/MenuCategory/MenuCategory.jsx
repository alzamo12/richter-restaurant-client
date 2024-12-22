import { Link } from "react-router";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, img, title, description }) => {
    return (
        <div className="pt-8">
            {title ? <Cover img={img} title={title} description={description} fontStyle={`cover-text-class-food`}></Cover> : null}
            <div className="grid md:grid-cols-2 gap-10 mt-16
              ">
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        menuItem={item}
                    ></MenuItem>)
                }
            </div>
            <Link to={`/order/${title}`}>
                <button className="btn btn-outline border-b-2 border-black border-0 text-white">Order Now</button>

            </Link>
        </div>
    );
};

export default MenuCategory;