import React from 'react';
// import '../UseBookCreate/style.css';
// import '../../../assets/css/bootstrap.css';
import '../../../assets/css/style.css';
import '../../../assets/css/responsive.css';
import '../../../assets/css/color.css';
import BannerSection from '../../../components/BannerSection/BannerSection';

const HomePage: React.FC = () => {
  return (
    <div>
      <div className='grid-line'>
        <span className='line-one'></span>
        <span className='line-two'></span>
        <span className='line-three'></span>
        <span className='line-four'></span>
      </div>
      <BannerSection />
    </div>
  );
};

export default HomePage;
