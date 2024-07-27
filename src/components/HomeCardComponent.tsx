import {useDispatch} from "react-redux";
import {deleteCategory, deleteTransaction} from "../containers/FetchSlice/FetchSlice.ts";

interface TransactionProps {
    amount: string;
    category: string;
    createdAt: string;
    id: string;
}
const HomeCardComponent: React.FC<TransactionProps> = ({ amount, category, createdAt, type , id}) => {
    const dispatch = useDispatch();

    const amountSign = type === 'income' ? '+' : '-';
    const textColor = type === 'income' ? 'green' : 'red';

    const deleteBlock = (id:string) => {

        if (confirm('Are you want to delete this category?')) {
            dispatch(deleteTransaction(id));
        }
    }

    return (
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', border:'1px solid white', padding:'10px', marginTop:'10px'}}>
            <div style={{display:'flex'}}>
                <div>
                    <p>{createdAt}</p>
                </div>
                <div style={{marginLeft:'50px'}}>
                    <p>{category}</p>
                </div>
            </div>
            <div style={{display:'flex', alignItems:'center'}}>
                <div style={{marginRight:'20px', color: textColor}}>
                    <p>{amountSign}{amount} KGS</p>
                </div>
                <div>
                    <button style={{marginRight:'10px'}}>Edit</button>
                    <button onClick={() => deleteBlock(id)}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default HomeCardComponent;