import CategoryCardComponent from "../components/CategoryCardComponent.tsx";

const CategoryBlock = () => {
    return (
        <div>
            <div style={{display:'flex', alignItems:'center' , justifyContent:'space-between'}}>
                <h1>Categories</h1>
                <button>Add</button>
            </div>

            <CategoryCardComponent />
            <CategoryCardComponent />
            <CategoryCardComponent />
        </div>
    );
};

export default CategoryBlock;