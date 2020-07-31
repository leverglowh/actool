import React from 'react';
import { useTranslation } from 'react-i18next';
import './home.scss';

export interface IHomeProps {}
const Home: React.FC<IHomeProps> = props => {
  const { t } = useTranslation();
  return (
    <div id="home-page">
      {t('welcome')}
      <br/>
      this page is empty for now, click links on the toolbar &#8593;&#8593;&#8593;!!
    </div>
  );
}

export default Home;
