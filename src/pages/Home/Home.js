import React from 'react';
import Category from '../../components/Category/Category.jsx';
import Category2 from '../../components/Category/Category2.jsx';
import Services from '../../components/Services/Services.jsx';
import Banner from '../../components/Banner/Banner.jsx';
import Partners from '../../components/Partners/Partners.jsx';
import Hero from '../../components/Hero/Hero.jsx';

import headphone from '../../assets/casdes/11.png';
import caseTest from '../../assets/casdes/12.png';

import Products from '../../components/Products2/Products.jsx';
import Blogs from '../../components/Blogs/Blogs.jsx';
import Popup from '../../components/Popup/Popup.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BannerData = {
    discount: '30% OFF',
    title: 'Fine Smile',
    date: '10 Jan to 28 Jan',
    image: headphone,
    title2: 'Air Solo Bass',
    title3: 'Winter Sale',
    title4: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis',
    bgColor: '#f42c37',
};

const BannerData2 = {
    discount: '30% OFF',
    title: 'Happy Hours',
    date: '14 Jan to 28 Jan',
    image: caseTest,
    title2: 'Smart Solo',
    title3: 'Winter Sale',
    title4: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis',
    bgColor: '#2dcc6f',
};

const Home = () => {
    const [orderPopup, setOrderPopup] = React.useState(false);

    const handleOrderPopup = () => {
        setOrderPopup(!orderPopup);
    };

    React.useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-sine',
            delay: 100,
            offset: 100,
        });
        AOS.refresh();
    }, []);

    return (
        <div>
            <Hero handleOrderPopup={handleOrderPopup} />
            <Category />
            <Category2 />
            <Services />
            <Banner data={BannerData} />
            <Banner data={BannerData2} />
            <Products />
            <Blogs />
            <Partners />
            <Popup orderPopup={orderPopup} handleOrderPopup={handleOrderPopup} />
        </div>
    );
};

export default Home;
