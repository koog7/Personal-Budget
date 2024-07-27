import {CategoryProps} from "../containers/FetchSlice/FetchSlice.ts";

const CategoryCardComponent: React.FC<CategoryProps> = ({name, type}) => {

    const textColor = type === 'income' ? 'green' : 'red';

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
                        <button style={{marginRight:'10px'}}>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryCardComponent;