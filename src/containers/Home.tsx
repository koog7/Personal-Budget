import HomeCardComponent from "../components/HomeCardComponent.tsx";
import {useEffect} from "react";
import {getTransaction} from "./FetchSlice/FetchSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { transaction, loading, error } = useSelector((state: RootState) => state.finance);

    useEffect(() => {
        dispatch(getTransaction())
        console.log(transaction)
    }, []);

    return (
        <div>
            <h1>Total: <span>{3000} KGS</span></h1>

            {transaction.map((transaction) => (
                <HomeCardComponent
                    key={transaction.id}
                    amount={transaction.amount}
                    category={transaction.category}
                    createdAt={transaction.createdAt.replace(/T/, ' ').replace(/\.\d+Z$/, '')}
                    id={transaction.id}
                />
            ))}
        </div>
    );
};

export default Home;