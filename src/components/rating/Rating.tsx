/* eslint-disable react/jsx-no-undef */
/* eslint-disable max-len */
import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import './index.css';
import {
  Card,
  CardHead,
} from '@patternfly/react-core';
import {OkIcon} from '@patternfly/react-icons';
import {ChartDonut} from '@patternfly/react-charts';
import {useParams} from 'react-router';

const Rating: React.FC = () => {
  const {taskId} = useParams();
  console.log(taskId);
  const sendrating=(event:any) =>{
    if (event.target.value !== undefined) {
      console.log(event.target.value);
    }
  };
  return (
    <Card style={{minHeight: '40em', maxWidth: '30em', minWidth: '27em'}}>
      <div className="card-head">
        <CardHead>
          <div className="ok-icon"><OkIcon color='green' size='sm' /></div>
          <div className="rating-heading">Rating</div>
        </CardHead>
      </div>
      <div className="rating-icon" >
        <form onClick={sendrating}>
          <ul className="rate-area" >
            <input type="radio" id="5-star" name="rating" value="5" /><label htmlFor="5-star" title="Amazing">5 stars</label>
            <input type="radio" id="4-star" name="rating" value="4" /><label htmlFor="4-star" title="Good">4 stars</label>
            <input type="radio" id="3-star" name="rating" value="3" /><label htmlFor="3-star" title="Average">3 stars</label>
            <input type="radio" id="2-star" name="rating" value="2" /><label htmlFor="2-star" title="Not Good">2 stars</label>
            <input type="radio" id="1-star" name="rating" value="1" /><label htmlFor="1-star" title="Bad">1 star</label>
          </ul>
        </form>
      </div>
      <div className="rating-icon">
        <div className="donut-chart-legend-right" >
          <ChartDonut
            ariaDesc="Average number of pets"
            ariaTitle="Task Rating "
            constrainToVisibleArea={true}
            data={[{x: '5 Star', y: 60}, {x: '3 Star', y: 20}, {x: '2 Star', y: 20}]}
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
