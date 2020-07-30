import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import Routes from './routes';

import { Modal, ModalFooter, Button } from 'reactstrap';

import Header from './shared/layout/header/header';
import { getLanguage } from './shared/util/localization-util';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

function App() {
  const [hemiModal, setHemiModal] = useState(false);
  useEffect(() => {
    getLanguage();
    if (!localStorage.getItem('hemi')) {
      toggleHemiModal();
    }
    // eslint-disable-next-line
  }, []);

  const toggleHemiModal = () => {
    setHemiModal(!hemiModal);
  };

  const handleHemiChoice = e => {
    e.persist();
    if (e.target.dataset.hemi === 'northern' || e.target.dataset.hemi === 'southern') {
      localStorage.setItem('hemi', JSON.stringify(e.target.dataset.hemi));
    }
    toggleHemiModal();
  }

  return (
      <div className="App">
        <Header />
        <Routes />
        <Modal isOpen={hemiModal}>
          What is your hemisphere?
          <ModalFooter>
            <Button data-hemi="northern" onClick={handleHemiChoice}>North</Button>
            <Button data-hemi="southern" onClick={handleHemiChoice}>South</Button>
          </ModalFooter>
        </Modal>
      </div>
  );
}

export default connect()(App);
