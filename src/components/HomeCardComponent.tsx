const HomeCardComponent = () => {
    return (
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', border:'1px solid white', padding:'10px', marginTop:'10px'}}>
            <div style={{display:'flex'}}>
                <div>
                    <p>2023-01-05 15:00:00</p>
                </div>
                <div style={{marginLeft:'50px'}}>
                    <p>Salary</p>
                </div>
            </div>
            <div style={{display:'flex', alignItems:'center'}}>
                <div style={{marginRight:'20px'}}>
                    <p>+1000 KGS</p>
                </div>
                <div>
                    <button style={{marginRight:'10px'}}>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default HomeCardComponent;