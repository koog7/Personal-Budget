import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import {useEffect, useState} from "react";
import {getCategory} from "./FetchSlice/FetchSlice.ts";
import {useNavigate, useParams} from "react-router-dom";
import axiosAPI from "../axios/AxiosAPI.ts";

const AddTransaction = () => {
    const [type, setType] = useState('income');
    const [amount, setAmount] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading, error } = useSelector((state: RootState) => state.finance);
    const navigate = useNavigate();
    const { id } = useParams<string>();

    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);

    const typeTrack = (e) => {
        setType(e.target.value);
        setSelectedCategory(null);
    };
    const categoryTrack = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setSelectedCategory(selectedId);
    };
    const amountTrack = (e) => {
        const value = e.target.value;
        if (value >= 0) {
            setAmount(value);
        }
    };

    const filterCategory = categories.filter(category => category.type === type);
    useEffect(() => {
        const fetchTransaction = async () => {
            if (id) {
                try {
                    const response = await axiosAPI.get(`/finance/transaction/${id}.json`);
                    const data = response.data;

                    setType(data.type);
                    setAmount(data.amount);

                    const categoryResponse = await axiosAPI.get(`/finance/categories/${data.category.id}.json`);
                    const categoryData = categoryResponse.data;
                    setSelectedCategory(categoryData.id);
                } catch (error) {
                    console.error('error:', error);
                }
            }
        };

        fetchTransaction();
    }, [id]);

    const dataSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCategory) {
            console.error('Category must be selected');
            return;
        }
        const currentDate = new Date().toISOString();
        const dataWithDate = {
            createdAt: currentDate,
            amount: amount,
            category: selectedCategory,
            type: type,
        };
        try {
            if (id) {
                await axiosAPI.put(`/finance/transaction/${id}.json`, dataWithDate);
            } else {
                await axiosAPI.post('/finance/transaction.json', dataWithDate);
            }
            navigate('/');
        } catch (error) {
            console.error('error:', error);
        }
    };

    return (
        <div className="form-wrapper">
            <div id="loader-container" style={{display: loading ? 'block' : 'none'}}>
                <div className="loader"></div>
            </div>
            {error && <div className="error">Something gone wrong...</div>}
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
                    <select id="category" name="category" className="form-input" value={selectedCategory ?? ''}
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