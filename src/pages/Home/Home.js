import AppNavbar from '../../components/AppNavbar';
import './Home.css';
const Home = () => {

    return (
        <div className="page">
            <AppNavbar/>
            <div className="container">
                <div className="title">АВТОМАТИЗОВАНЕ РОБОЧЕ МІСЦЕ</div>
                <div className="authors">Автори: Мар'яна Пізь, Лілія Паращак</div>
            </div>
        </div>
    );
};

export default Home;