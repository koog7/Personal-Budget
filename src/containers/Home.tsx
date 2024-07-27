import HomeCardComponent from "../components/HomeCardComponent.tsx";
import {useEffect} from "react";
import {getTransaction} from "./FetchSlice/FetchSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories , transaction = [], loading, error } = useSelector((state: RootState) => state.finance);

    useEffect(() => {
        dispatch(getTransaction())
        console.log(transaction)
    }, []);

    const getCategoryNameById = (id: string) => {
        const category = categories.find(category => category.id === id);
        return category ? category.name : 'Unknown Category';
    };

    return (
        <div>
            <h1>Total: <span>{3000} KGS</span></h1>

            {transaction.length === 0 ? (
                <p>No transactions available.</p>
            ) : (
                transaction.map((transaction) => {
                    return (
                        <HomeCardComponent
                            key={transaction.id}
                            amount={transaction.amount}
                            category={getCategoryNameById(transaction.category)}
                            createdAt={transaction.createdAt.replace(/T/, ' ').replace(/\.\d+Z$/, '')}
                            id={transaction.id}
                        />
                    );
                })
            )}
        </div>
    );
};

export default Home;