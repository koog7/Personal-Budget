const AddBlock = () => {
    return (
        <div className="form-wrapper">
            <form className="add-form">
                <h2 className="title">Add Form</h2>
                <div className="form-group">
                    <label htmlFor="type" className="label">Type</label>
                    <select id="type" name="type" className="form-input">
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div className="form-group" style={{width:'383px'}}>
                    <label htmlFor="name" className="label">Name</label>
                    <input type="text" id="name" name="name" className="form-input"/>
                </div>
                <button type="submit" className="form-button">Submit</button>
            </form>
        </div>
    );
};

export default AddBlock;