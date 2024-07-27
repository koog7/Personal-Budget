const AddTransaction = () => {
    return (
        <div className="form-wrapper">
            <form className="add-form">
                <h2 className="title">Add transaction</h2>
                <div className="form-group">
                    <label htmlFor="type" className="label">Type</label>
                    <select id="type" name="type" className="form-input">
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="category" className="label">Category</label>
                    <select id="category" name="category" className="form-input">
                        <option value="tbp">type of category</option>
                    </select>
                </div>
                <div className="form-group" style={{width: '383px'}}>
                    <label htmlFor="amount" className="label">Amount</label>
                    <input type="number" id="amount" name="amount" className="form-input"/>
                </div>
                <button type="submit" className="form-button">Submit</button>
            </form>
        </div>
    );
};

export default AddTransaction;