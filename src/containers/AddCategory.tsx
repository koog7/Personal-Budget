import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {RootState} from "../app/store.ts";
import axiosAPI from "../axios/AxiosAPI.ts";

const AddCategory = () => {

    const [categoryData, setCategoryData] = useState({
        type: 'income',
        name: ''
    });
    const {loading} = useSelector((state: RootState) => state.finance);
    const navigate = useNavigate();
    const {id} = useParams<{string}>();
    const inputTrack = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCategoryData({...categoryData, [name]: value});
    };

    useEffect(() => {
        const fetchCategory = async () => {
            if (id) {
                try {
                    const response = await axiosAPI.get(`/finance/categories/${id}.json`);
                    const category = response.data;
                    setCategoryData({
                        type: category.type,
                        name: category.name
                    });
                } catch (err) {
                    console.error('Error fetching category:', err);
                }
            }
        };
        fetchCategory();
    }, [id]);

    const dataSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            await axiosAPI.put(`/finance/categories/${id}.json`, categoryData);
        } else {
            await axiosAPI.post(`/finance/categories.json`, categoryData);
        }
        await navigate('/category');
    };

    return (
        <div className="form-wrapper">
            <div id="loader-container" style={{display: loading ? 'block' : 'none'}}>
                <div className="loader"></div>
            </div>
            <form className="add-form" onSubmit={dataSubmit}>
                <h2 className="title">Add Form</h2>
                <div className="form-group">
                    <label htmlFor="type" className="label">Type</label>
                    <select id="type" name="type" className="form-input" value={categoryData.type}
                            onChange={inputTrack}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div className="form-group" style={{width: '383px'}}>
                    <label htmlFor="name" className="label">Name</label>
                    <input type="text" id="name" name="name" className="form-input" value={categoryData.name}
                           onChange={inputTrack}/>
                </div>
                <button type="submit" className="form-button">Submit</button>
            </form>
        </div>
    );
};

export default AddCategory;