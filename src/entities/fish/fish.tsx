import React from 'react';
import './fish.scss';

export interface IFishPageProps {}

const FishPage: React.FC<IFishPageProps> = props => {
  // @ts-ignore
  const userLang = navigator.language || navigator.userLanguage;
  return(
    <div id="fish-page">
      fish page!
      <br />
      {userLang}
    </div>
  );
}

export default FishPage;
