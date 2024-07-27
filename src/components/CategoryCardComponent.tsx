import {CategoryProps, deleteCategory} from "../containers/FetchSlice/FetchSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../app/store.ts";
import {NavLink} from "react-router-dom";

const CategoryCardComponent: React.FC<CategoryProps> = ({name, type, id}) => {

    const textColor = type === 'income' ? 'green' : 'red';

    const dispatch = useDispatch<AppDispatch>();
    const deleteBlock = (id:string) => {
        if (confirm('Are you want to delete this category?')) {
            dispatch(deleteCategory(id));
        }
    };;

    return (
        <div>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', border:'1px solid white', padding:'10px', marginTop:'10px'}}>
                <div style={{display:'flex'}}>
                    <div style={{marginLeft:'25px'}}>
                        <p>{name}</p>
                    </div>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                    <div style={{ color: textColor, marginRight:'20px' }}>
                        <p>{type}</p>
                    </div>
                    <div>
                        <button style={{marginRight:'10px'}}><NavLink to={`/category/edit/${id}`} style={{color:'white', textDecoration:'none'}}>Edit</NavLink></button>
                        <button onClick={() => deleteBlock(id)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryCardComponent;