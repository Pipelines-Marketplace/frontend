/* eslint-disable max-len */
import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import './index.css';
import {
  Card,
  CardHead,
} from '@patternfly/react-core';
import {OkIcon, StarIcon} from '@patternfly/react-icons';
import {ChartDonut} from '@patternfly/react-charts';

const Rating: React.FC = () => {
  return (
    <Card style={{minHeight: '40em', maxWidth: '30em', minWidth: '27em'}}>
      <div className="card-head">
        <CardHead>
          <div className="ok-icon"><OkIcon color='green' size='sm' /></div>
          <div className="rating-heading">Rating</div>
        </CardHead>
      </div>
      <div className="rating-icon">
        <span>
          <StarIcon color="gold" size="lg" />
          <StarIcon color="gold" size="lg" />
          <StarIcon color="gold" size="lg" />
          <StarIcon color="grey" size="lg" />
          <StarIcon color="grey" size="lg" />

        </span>

      </div>
      <div className="rating-icon">
        <div className="donut-chart-legend-right" >
          <ChartDonut
            ariaDesc="Average number of pets"
            ariaTitle="Task Rating "
            constrainToVisibleArea={true}
            data={[{x: '5 Star', y: 35}, {x: '3 Star', y: 55}, {x: '2 Star', y: 10}]}
            labels={({datum}) => `${datum.x}: ${datum.y}%`}
            padding={{
              bottom: 20,
              left: 75,
              right: 75, // Adjusted to accommodate legend
              top: 10,
            }}
            subTitle="Rating"
            title="4.5"
            width={300}
          />
        </div>
      </div>


    </Card>
  );
};

export default Rating;
