import HomeCardComponent from "../components/HomeCardComponent.tsx";

const Home = () => {



    return (
        <div>
            <h1>Total: <span>{3000} KGS</span></h1>

            <HomeCardComponent />
            <HomeCardComponent />
            <HomeCardComponent />
        </div>
    );
};

export default Home;