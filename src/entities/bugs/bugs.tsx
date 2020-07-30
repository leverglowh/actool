import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { IRootState } from 'src/shared/reducers';

import { useTranslation } from 'react-i18next';
import { Card, CardTitle, CardBody } from 'reactstrap';

import { getEntities as getbugList, getEntity as getBug } from './bugs.reducer';
import { myNameKey } from 'src/shared/util/localization-util';
import { sortByAvailability } from 'src/shared/util/critters-util';
import { capitalizeFirst } from 'src/shared/util/general-utils';

import './bugs.scss';

export interface IBugsPageProps extends StateProps, DispatchProps {}

const BugsPage: React.FC<IBugsPageProps> = props => {
  const [nameKey, setNameKey] = useState('name-USen');
  const { t } = useTranslation();
  useEffect(() => {
    props.getbugList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.bugList.length > 0) {
      setNameKey(myNameKey(props.bugList[0].name));
    }
  }, [props.bugList]);

  return(
    <div id="bugs-page">
      <div id="bugs-page-body">
        {props.bugList && [...props.bugList].sort(sortByAvailability).map(bug => (
          <Card key={'bug-' + bug.id} className="critter-card">
            <CardTitle>
              {capitalizeFirst(bug.name?.[nameKey])} &nbsp;
              {bug.isCatchable[0] && bug.isCatchable[1] ? (<> &#10003;</>) : (<> &times;</>)}
            </CardTitle>
            <img src={bug.image_uri} alt={bug['file-name']} />
            <CardBody>
              <div className="critter-card-body-fst-row">
                <div className="critter-card-location">
                  {bug.availability.location?.split('&').map((loc, i) => (
                    <span key={`bug-${bug.id}-loc-${i}`}>
                      {i === 1 ? '/' : null}
                      {t(`location.${loc.trim().toLowerCase().replace('(', '').replace(')', '').replace(/\s/g, '-')}`)}
                    </span>
                  ))}
                </div>
                <div className="critter-card-time-range">
                  {bug.availability.isAllDay ? t('all-day') : bug.availability.time}
                </div>
              </div>
              <div className="critter-card-body-snd-row">
                <div className="critter-card-months">
                  N: {[...Array(12)].map((m, index) => <div key={bug.id + '-month-' + index} className="month-square" style={bug.availability['month-array-northern']?.includes(index + 1) ? { backgroundColor: '#bcf8cb' } : {} }>{index + 1}</div>)}
                </div>
                <div className="critter-card-months">
                  S: {[...Array(12)].map((m, index) => <div key={bug.id + '-month-' + index} className="month-square" style={bug.availability['month-array-southern']?.includes(index + 1) ? { backgroundColor: '#bcf8cb' } : {} }>{index + 1}</div>)}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = ({ bugs }: IRootState) => ({
  bugList: bugs.entities,
  bug: bugs.entity
});

const mapDispatchToProps = {
  getbugList,
  getBug
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BugsPage);
