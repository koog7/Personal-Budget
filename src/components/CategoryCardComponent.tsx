const CategoryCardComponent = () => {
    return (
        <div>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', border:'1px solid white', padding:'10px', marginTop:'10px'}}>
                <div style={{display:'flex'}}>
                    <div style={{marginLeft:'25px'}}>
                        <p>Salary</p>
                    </div>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                    <div style={{marginRight:'20px'}}>
                        <p>Expense</p>
                    </div>
                    <div>
                        <button style={{marginRight:'10px'}}>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryCardComponent;