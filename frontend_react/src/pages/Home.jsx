// Home.js
import React from 'react';
import GetStarted from './components/GetStarted';
import MarketingTextBox from './components/MarketingTextBox';
import ContentInfo from './components/Mission';

const Home = () => {
    return (
        <div>            
            <GetStarted />
            <MarketingTextBox />
            <ContentInfo />
        </div>  
    );
};

export default Home;
