import React from 'react';
import {Card,
  CardHead,
  TextContent,
  CardActions,
  Flex,
  FlexItem,
  Button,
} from '@patternfly/react-core';
import {OkIcon, Remove2Icon, DownloadIcon} from '@patternfly/react-icons';
import imgAvatar from '../assets/logo/imgAvatar.png';

const UserProfile: React.FC = (props: any) => {
  return (
    <Card style={{marginLeft: '13em', marginRight: '7em',
      marginTop: '2em', width: '100%', padding: '0'}}>
      <CardHead>
        <img src ={imgAvatar} alt="Task"
          style={{height: '3em', marginLeft: '2em'}}
        />

        <Flex breakpointMods={[{modifier: 'column', breakpoint: 'lg'}]}>
          <FlexItem>
            <TextContent style={{marginLeft: '3em', marginTop: '0.5em'}}>
          TaskName
            </TextContent>
          </FlexItem>

        </Flex>

        <CardActions style={{marginRight: '5em'}}>
          <DownloadIcon style = {{marginRight: '0.2em'}} className="download"/>
          <TextContent className="text">10</TextContent>
          <OkIcon style={{color: 'green'}}/>
          <TextContent className="text">4.5</TextContent>
          <Button variant="danger" style = {{marginLeft: '3em'}}>Delete
            <Remove2Icon style = {{marginLeft: '1em', marginTop: '0.3em'}}/>
          </Button>
        </CardActions>
      </CardHead>


    </Card>

  );
};

export default UserProfile;
