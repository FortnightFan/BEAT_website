// MainComponent.js
import React from 'react';
import Footer from './components/Footer';
import GetStarted from './components/GetStarted';
import MarketingTextBox from './components/MarketingTextBox';
import ContentInfo from './components/Mission';
import NavigationBar from './components/NavigationBar';

const MainComponent = () => {
    return (
        <div>            
            <GetStarted />
            <MarketingTextBox />
            <ContentInfo />
        </div>  
    );
};

export default MainComponent;
