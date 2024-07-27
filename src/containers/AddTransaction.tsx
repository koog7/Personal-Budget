import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import {useEffect, useState} from "react";
import {CategoryProps, getCategory, postTransaction} from "./FetchSlice/FetchSlice.ts";
import {useNavigate} from "react-router-dom";

const AddTransaction = () => {
    const [type, setType] = useState('income');
    const [amount, setAmount] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading, error } = useSelector((state: RootState) => state.finance);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCategory())
        console.log(selectedCategory)
    }, [dispatch , selectedCategory]);

    const typeTrack = (e) => {
        setType(e.target.value);
        setSelectedCategory(null);
    };
    const categoryTrack = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        const category = categories.find(category => category.id === selectedId);
        setSelectedCategory(category);
    };
    const amountTrack = (e) => {
        const value = e.target.value;
        if (value >= 0) {
            setAmount(value);
        }
    };

    const filterCategory = categories.filter(category => category.type === type);

    const dataSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCategory) {
            console.error('Category selected');
            return;
        }
        const currentDate = new Date().toISOString();
        const dataWithDate = {
            createdAt: currentDate,
            amount: amount,
            category: selectedCategory.id,
        };
        await dispatch(postTransaction(dataWithDate));
        await navigate('/');
    };


    return (
        <div className="form-wrapper">
            <div id="loader-container" style={{display: loading ? 'block' : 'none'}}>
                <div className="loader"></div>
            </div>
            <form className="add-form" onSubmit={dataSubmit}>
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
                    <select id="category" name="category" className="form-input" value={selectedCategory?.id ?? ''}
                            onChange={categoryTrack}>
                        <option>Choose option</option>
                        {filterCategory.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group" style={{width: '383px'}}>
                    <label htmlFor="amount" className="label">Amount (KGS)</label>
                    <input type="number" id="amount" name="amount" className="form-input" value={amount}
                           onChange={amountTrack}/>
                </div>
                <button type="submit" className="form-button">Submit</button>
            </form>
        </div>
    );
};

export default AddTransaction;