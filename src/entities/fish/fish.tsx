import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { IRootState } from 'src/shared/reducers';
import { getEntities as getFishList, getEntity as getFish } from './fish.reducer';
import './fish.scss';
import { myNameKey } from 'src/shared/util/localization-util';
import { Card, CardTitle, CardImg, CardBody } from 'reactstrap';
import { isCatchableNow } from 'src/shared/util/critters-util';

export interface IFishPageProps extends StateProps, DispatchProps {}

const FishPage: React.FC<IFishPageProps> = props => {
  const [nameKey, setNameKey] = useState('name-USen');
  useEffect(() => {
    props.getFishList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.fishList.length > 0) {
      setNameKey(myNameKey(props.fishList[0].name));
    }
  }, [props.fishList]);

  return(
    <div id="fish-page">
      <h2>fish page!</h2>
      <div id="fish-page-body">
        {props.fishList && props.fishList.map(fish => (
          <Card key={'fish-' + fish.id} className="critter-card">
            <CardImg top src={fish.image_uri} alt={fish['file-name']} />
            <CardTitle>
              {fish.name?.[nameKey]} &nbsp;
              {fish.isCatchable ? (<> &#10003;</>) : (<> &times;</>)}
            </CardTitle>
            <CardBody>

            </CardBody>
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
