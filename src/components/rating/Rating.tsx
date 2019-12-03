/* eslint-disable react/jsx-no-undef */
/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import './index.css';
import {
  Card,
  CardHead,
} from '@patternfly/react-core';
import {OkIcon} from '@patternfly/react-icons';
import {ChartDonut} from '@patternfly/react-charts';
import {useParams} from 'react-router';
import {connect} from 'react-redux';
import checkAuthentication from '../redux/Actions/CheckAuthAction';
import store from '../redux/store';
import {Link} from 'react-router-dom';
import Login from '../Authentication/Login';
let averageRating:number = 0;
let oneStar:number =0;
let twoStar:number =0;
let threeStar:number =0;
let fourStar:number =0;
let fiveStar:number =0;
let prevStar:number =0;
let newStar:number =0;

const Rating: React.FC = (props:any) => {
  console.log('rating', props.isAuthenticated);
  // console.log('new state after token created ', store.getState());
  const [rating, setRating] = useState([]);
  const {taskId} = useParams();
  useEffect(() =>{
    fetch('http://localhost:5000/rating/'+taskId)
        .then((res) => res.json())
        .then((rating) => setRating(rating));
  }, []);

  if (rating!==undefined) {
    const arr = Array.from(Object.values(rating));
    oneStar=arr[2];
    twoStar=arr[3];
    threeStar=arr[4];
    fourStar=arr[5];
    fiveStar=arr[6];
    const totalstar = (arr[2]+arr[3]+arr[4]+arr[5]+arr[6])+1;
    averageRating = (arr[2]*1+arr[3]*2+arr[4]*3+arr[5]*4+arr[6]*5)/totalstar;
  }
  let login: any = '';
  // accesing user rating information after given by the user
  const sendrating=(event:any) =>{
    if (event.target.value !== undefined) {
      if ((prevStar === 0) && (newStar === 0)) {
        newStar = event.target.value;
        const ratingData ={
          'user_id': Number(localStorage.getItem('usetrID')),
          'task_id': Number(taskId),
          'stars': Number(newStar),
          'prev_stars': Number(prevStar),
        };
        fetch('http://localhost:5000/rating', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ratingData),
        }).then((res) => console.log(res)).
            catch((err:any) => console.log(err));
      } else {
        prevStar=newStar;
        newStar=event.target.value;
        const ratingData ={
          'user_id': Number(localStorage.getItem('usetrID')),
          'task_id': Number(taskId),
          'stars': Number(newStar),
          'prev_stars': Number(prevStar),
        };
        console.log('userid,', typeof(ratingData.user_id));
        // sending rating info to server
        fetch('http://localhost:5000/rating', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ratingData),
        }).then((res) => console.log(res)).
            catch((err:any) => console.log(err));
      }
    }
  };

  if (props.isAuthenticated == true) {
    login = <form onClick = {sendrating}>
      <ul className="rate-area" >
        <input type="radio" id="5-star" name="rating" value="5" /><label htmlFor="5-star" title="Amazing">5 stars</label>
        <input type="radio" id="4-star" name="rating" value="4" /><label htmlFor="4-star" title="Good">4 stars</label>
        <input type="radio" id="3-star" name="rating" value="3" /><label htmlFor="3-star" title="Average">3 stars</label>
        <input type="radio" id="2-star" name="rating" value="2" /><label htmlFor="2-star" title="Not Good">2 stars</label>
        <input type="radio" id="1-star" name="rating" value="1" /><label htmlFor="1-star" title="Bad">1 star</label>
      </ul>
    </form>;
  } else {
    login = <form >
      <Link to="/login">
        <ul className="rate-area" >
          <input className="rate-area" type="radio" id="5-star" name="rating" value="5" />
          <label htmlFor="5-star" title="Amazing">5 stars</label>
          <input type="radio" id="4-star" name="rating" value="4" /><label htmlFor="4-star" title="Good">4 stars</label>
          <input type="radio" id="3-star" name="rating" value="3" /><label htmlFor="3-star" title="Average">3 stars</label>
          <input type="radio" id="2-star" name="rating" value="2" /><label htmlFor="2-star" title="Not Good">2 stars</label>
          <input type="radio" id="1-star" name="rating" value="1" /><label htmlFor="1-star" title="Bad">1 star</label>
        </ul>
      </Link>
    </form>;
  }
  {return (
    <Card style={{minHeight: '40em', maxWidth: '30em', minWidth: '27em'}}>
      <div className="card-head">
        <CardHead>
          <div className="ok-icon"><OkIcon color='green' size='sm' /></div>
          <div className="rating-heading">Rating</div>
        </CardHead>
      </div>
      <div className="rating-icon">
        {login}
      </div>
      <div className="rating-icon">
        <div className="donut-chart-legend-right" >
          <ChartDonut
            ariaDesc="Average number of pets"
            ariaTitle="Task Rating "
            constrainToVisibleArea={true}
            data={[{x: '5 Star', y: 2},
              {x: '4 Star', y: {fourStar}},
              {x: '3 Star', y: {threeStar}},
              {x: '2 Star', y: {twoStar}},
              {x: '1 Star', y: {oneStar}},
            ]}
            labels={({datum}) => `${datum.x}: ${datum.y}%`}
            padding={{
              bottom: 20,
              left: 75,
              right: 75, // Adjusted to accommodate legend
              top: 10,
            }}
            subTitle="Rating"
            title={`${averageRating}`}
            width={300}
          />
        </div>
      </div>
    </Card>
  );}
};

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.isAuthenticated.isAuthenticated,
  };
};
export default connect(mapStateToProps, checkAuthentication)(Rating);

// export default Rating;
