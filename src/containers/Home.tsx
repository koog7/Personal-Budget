import HomeCardComponent from "../components/HomeCardComponent.tsx";
import {useEffect} from "react";
import {getCategory, getTransaction} from "./FetchSlice/FetchSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories , transaction = [], loading, error } = useSelector((state: RootState) => state.finance);

    useEffect(() => {
        dispatch(getTransaction())
        dispatch(getCategory())
        console.log(transaction)
    }, []);

    const categoryId = (id: string) => {
        const category = categories.find(category => category.id === id);
        return category ? category.name : 'Unknown Category';
    };

    let totalIncome = 0;
    let totalExpense = 0;

    for (const transact of transaction) {
        const category = categories.find(category => category.id === transact.category);

        if (category) {
            if (category.type === 'income') {
                totalIncome += Number(transact.amount);
            } else if (category.type === 'expense') {
                totalExpense += Number(transact.amount);
            }
        }
    }
    const totalBalance = totalIncome - totalExpense;

    return (
        <div>
            <h1>Total: <span>{totalBalance} KGS</span></h1>

            {transaction.length === 0 ? (
                <p>No transactions available.</p>
            ) : (
                transaction.map((transaction) => {
                    return (
                        <HomeCardComponent
                            key={transaction.id}
                            amount={transaction.amount}
                            category={categoryId(transaction.category)}
                            createdAt={transaction.createdAt.replace(/T/, ' ').replace(/\.\d+Z$/, '')}
                            id={transaction.id}
                            type={categories.find(category => category.id === transaction.category)?.type || 'Type corrupted'}
                        />
                    );
                })
            )}
        </div>
    );
};

export default Home;