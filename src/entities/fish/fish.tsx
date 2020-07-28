import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { IRootState } from 'src/shared/reducers';
import { getEntities as getFishList } from './fish.reducer';
import './fish.scss';

export interface IFishPageProps extends StateProps, DispatchProps {}

const FishPage: React.FC<IFishPageProps> = props => {
  useEffect(() => {
    props.getFishList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // @ts-ignore
  const userLang = (navigator.language || navigator.userLanguage).split('-')[0];
  return(
    <div id="fish-page">
      fish page!
      <br />
      {userLang}
      {props.fishList[0] && (
        <>
          <img src={props.fishList[0].image_uri} alt="fish"/>
          {props.fishList[0].name?.['name-CNzh']}
        </>
      )}
    </div>
  );
}

const mapStateToProps = ({ fish }: IRootState) => ({
  fishList: fish.entities
});

const mapDispatchToProps = {
  getFishList
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FishPage);
