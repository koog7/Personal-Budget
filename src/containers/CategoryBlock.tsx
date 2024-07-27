import CategoryCardComponent from "../components/CategoryCardComponent.tsx";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import {useEffect} from "react";
import {getCategory} from "./FetchSlice/FetchSlice.ts";

const CategoryBlock = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading, error } = useSelector((state: RootState) => state.finance);

    useEffect(() => {
        dispatch(getCategory())
    }, [dispatch]);

    console.log(categories)
    return (
        <div>
            <div id="loader-container" style={{display: loading ? 'block' : 'none'}}>
                <div className="loader"></div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <h1>Categories</h1>
                <NavLink to={'/category/add'}>Add</NavLink>
            </div>

            {categories && categories.length > 0 ? (
                categories.map((category) => (
                    <CategoryCardComponent key={category.id} id={category.id} name={category.name} type={category.type}/>
                ))
            ) : (
                <p>No categories available.</p>
            )}
        </div>
    );
};

export default CategoryBlock;