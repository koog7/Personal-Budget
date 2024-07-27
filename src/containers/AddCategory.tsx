import {useState} from "react";
import {useDispatch} from "react-redux";
import {postCategory} from "./FetchSlice/FetchSlice.ts";

const AddCategory = () => {

    const [categoryData, setCategoryData] = useState({
        type: 'income',
        name: ''
    });
    const dispatch = useDispatch();
    const inputTrack = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCategoryData({...categoryData, [name]: value});
    };


    const dataSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(postCategory(categoryData))
        console.log(categoryData)
    };

    return (
        <div className="form-wrapper">
            <form className="add-form" onSubmit={dataSubmit}>
                <h2 className="title">Add Form</h2>
                <div className="form-group">
                    <label htmlFor="type" className="label">Type</label>
                    <select id="type" name="type" className="form-input" value={categoryData.type} onChange={inputTrack}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div className="form-group" style={{width:'383px'}}>
                    <label htmlFor="name" className="label">Name</label>
                    <input type="text" id="name" name="name" className="form-input" value={categoryData.name} onChange={inputTrack}/>
                </div>
                <button type="submit" className="form-button">Submit</button>
            </form>
        </div>
    );
};

export default AddCategory;