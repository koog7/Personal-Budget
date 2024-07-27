import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import {useEffect, useState} from "react";
import {getCategory} from "./FetchSlice/FetchSlice.ts";

const AddTransaction = () => {
    const [type, setType] = useState('income');
    const [amount, setAmount] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('');

    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading, error } = useSelector((state: RootState) => state.finance);

    useEffect(() => {
        dispatch(getCategory())
    }, [dispatch]);

    const typeTrack = (e) => {
        setType(e.target.value);
        setSelectedCategory('');
    };
    const categoryTrack = (e) => {
        setSelectedCategory(e.target.value);
    };
    const amountTrack = (e) => {
        const value = e.target.value;
        if (value >= 0) {
            setAmount(0);
        }
    };

    const filterCategory = categories.filter(category => category.type === type);

    return (
        <div className="form-wrapper">
            <form className="add-form">
                <h2 className="title">Add transaction</h2>
                <div className="form-group">
                    <label htmlFor="type" className="label">Type</label>
                    <select id="type" name="type" className="form-input" value={type} onChange={typeTrack}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="category" className="label">Category</label>
                    <select id="category" name="category" className="form-input" value={selectedCategory} onChange={categoryTrack}>
                        {filterCategory.map((category) => (
                            <option key={category.name} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group" style={{width: '383px'}}>
                    <label htmlFor="amount" className="label">Amount (KGS)</label>
                    <input type="number" id="amount" name="amount" className="form-input" value={amount} onChange={amountTrack} />
                </div>
                <button type="submit" className="form-button">Submit</button>
            </form>
        </div>
    );
};

export default AddTransaction;