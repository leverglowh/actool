import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { IRootState } from 'src/shared/reducers';

import { useTranslation } from 'react-i18next';
import { Card, CardTitle, CardBody } from 'reactstrap';

import { getEntities as getFishList, getEntity as getFish } from './fish.reducer';
import { myNameKey } from 'src/shared/util/localization-util';
import { sortByAvailability } from 'src/shared/util/critters-util';
import { capitalizeFirst } from 'src/shared/util/general-utils';

import 'src/shared/util/critter.scss';
import './fish.scss';

export interface IFishPageProps extends StateProps, DispatchProps {}

const FishPage: React.FC<IFishPageProps> = props => {
  const [nameKey, setNameKey] = useState('name-USen');
  const { t } = useTranslation();
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
      <h1>
        {props.user.username}
      </h1>
      <div id="fish-page-body">
        {props.fishList && [...props.fishList].sort(sortByAvailability).map(fish => (
          <Card key={'fish-' + fish.id} className="critter-card">
            <CardTitle>
              {capitalizeFirst(fish.name?.[nameKey])} &nbsp;
              {fish.isCatchable[0] && fish.isCatchable[1] ? (<> &#10003;</>) : (<> &times;</>)}
            </CardTitle>
            <img src={fish.image_uri} alt={fish['file-name']} />
            <CardBody>
              <div className="critter-card-body-fst-row">
                <div className="critter-card-location">
                  {fish.availability.location?.split('&').map((loc, i) => (
                    <span key={`fish-${fish.id}-loc-${i}`}>
                      {i === 1 ? '/' : null}
                      {t(`location.${loc.trim().toLowerCase().replace('(', '').replace(')', '').replace(/\s/g, '-')}`)}
                    </span>
                  ))}
                </div>
                <div className="critter-card-time-range">
                  {fish.availability.isAllDay ? t('all-day') : fish.availability.time}
                </div>
              </div>
              <div className="critter-card-body-snd-row">
                <div className="critter-card-months">
                  N: {[...Array(12)].map((m, index) => <div key={fish.id + '-month-' + index} className="month-square" style={fish.availability['month-array-northern']?.includes(index + 1) ? { backgroundColor: '#bcf8cb' } : {} }>{index + 1}</div>)}
                </div>
                <div className="critter-card-months">
                  S: {[...Array(12)].map((m, index) => <div key={fish.id + '-month-' + index} className="month-square" style={fish.availability['month-array-southern']?.includes(index + 1) ? { backgroundColor: '#bcf8cb' } : {} }>{index + 1}</div>)}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = ({ fish, authentication }: IRootState) => ({
  user: authentication.user,
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
