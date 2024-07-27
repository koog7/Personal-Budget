import CategoryCardComponent from "../components/CategoryCardComponent.tsx";
import {NavLink} from "react-router-dom";

const CategoryBlock = () => {
    return (
        <div>
            <div style={{display:'flex', alignItems:'center' , justifyContent:'space-between'}}>
                <h1>Categories</h1>
                <NavLink to={'/category/add'}>Add</NavLink>
            </div>

            <CategoryCardComponent />
            <CategoryCardComponent />
            <CategoryCardComponent />
        </div>
    );
};

export default CategoryBlock;