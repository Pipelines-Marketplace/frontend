import React from 'react';
import {API_URL} from '../../constants';
import UserProfileChild from './UserProfileChild';

const UserProfile: React.FC = (props: any) => {
  const userGithubId = localStorage['usetrID'];
  const [userResource, setUserResource] = React.useState();
  React.useEffect(() => {
    fetch(`${API_URL}/resources/user/${userGithubId}`)
        .then((response) => response.json())
        .then((data: any) => setUserResource(data));
  // eslint-disable-next-line
  }, []);


  if (userResource !== undefined) {
    if (userResource.length > 0) {
      return (
        <div>
          {
            <UserProfileChild task = {userResource} />

          }

        </div>
      );
    }
  };

  return (
    <div></div>
  );
};

export default UserProfile;
