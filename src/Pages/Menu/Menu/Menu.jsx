import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from '../../../assets/menu/banner3.jpg'
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'

const Menu = () => {
    const [menu] = useMenu();
    // console.log(menu)
    const deserts = menu.filter(item => item.category === 'dessert');
//    / console.log(deserts)
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const soup = menu.filter(item => item.category === 'soup')
    const offered = menu.filter(item => item.category === 'offered')
    return (
        <div>
            <Helmet>
                <title>Richter | Menu</title>
            </Helmet>

            <Cover fontStyle={`cover-text-class-header`} img={menuImg} title="Our Menu"
                description=" Would you like to try a dish?"
            ></Cover>

            <SectionTitle
                subHeading="Don't Miss"
                heading="Today's Offer"
            ></SectionTitle>
            
            {/* offered */}
            <MenuCategory
                items={offered}>
            </MenuCategory>

            {/* salads */}
            <MenuCategory
                img={saladImg}
                title={"salad"}
                items={salad}
                description="Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            ></MenuCategory>

            {/* Pizza */}
            <MenuCategory
                img={pizzaImg}
                title={"pizza"}
                items={pizza}
                description="Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            ></MenuCategory>

            {/* desserts */}
            <MenuCategory
                img={dessertImg}
                title={"dessert"}
                items={deserts}
                description="Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            ></MenuCategory>

            {/* soups */}
            <MenuCategory
                img={soupImg}
                title={"soup"}
                items={soup}
                description="Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            ></MenuCategory>
        </div>
    );
};

export default Menu;