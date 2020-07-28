import React from 'react';
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next';
import './App.css';
import Routes from './routes';

function App() {
  const { t } = useTranslation();
  return (
      <div className="App">
        <h1>{t('title')}</h1>
        <Routes />
      </div>
  );
}

export default connect()(App);
