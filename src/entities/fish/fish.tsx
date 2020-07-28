import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { IRootState } from 'src/shared/reducers';
import { getEntities as getFishList, getEntity as getFish } from './fish.reducer';
import './fish.scss';
import { myNameKey } from 'src/shared/util/localization-util';
import { Card, CardTitle, CardImg } from 'reactstrap';

export interface IFishPageProps extends StateProps, DispatchProps {}

const FishPage: React.FC<IFishPageProps> = props => {
  useEffect(() => {
    props.getFishList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <div id="fish-page">
      <h2>fish page!</h2>
      <div id="fish-page-body">
        {props.fishList && props.fishList.map(fish => (
          <Card key={'fish-' + fish.id} className="critter-card">
            <CardImg top src={fish.image_uri} alt={fish['file-name']} />
            <CardTitle>
              {fish.name?.[myNameKey(fish.name)]}
            </CardTitle>
          </Card>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = ({ fish }: IRootState) => ({
  fishList: fish.entities,
  fish: fish.entity
});

const mapDispatchToProps = {
  getFishList,
  getFish
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FishPage);
