//  eslint-enable max-len
import React from 'react';
import {
  Card,
  Flex,
  FlexItem,
  Button,
  Grid,
  GridItem,
  CardHead,
  TextContent,
  Text,
  CardActions,
} from '@patternfly/react-core';
import {DownloadIcon, GithubIcon} from '@patternfly/react-icons';
import {
  Badge,
} from '@patternfly/react-core';
import './index.css';
import '@patternfly/react-core/dist/styles/base.css';
import avatarImg from './download.png';
import './index.css';
import store from '../redux/store';
import {API_URL} from '../../constants';
import Rating from '../rating/Rating';

export interface BasicDetailPropObject {
    id: any
    name : string;
    description : string;
    downloads : number;
    rating : number;
    yaml : string;
    github: string
    tags : []
}

export interface BasicDetailProp {
  task: BasicDetailPropObject
}

const BasicDetail: React.FC<BasicDetailProp> = (props: BasicDetailProp) => {
  const taskArr : any = [];

  if (props.task.tags != null) {
    taskArr.push(props.task.tags);
  } else {
    taskArr.push([]);
  }

  // Function to download YAML file
  const [dwnld, setDownload] = React.useState(props.task.downloads);
  function download() {
    fetch(`${API_URL}/download/${props.task.id}`, {
      method: 'POST',
    })
        .then((response) => {
          response.blob().then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = props.task.name +'.yaml';
            a.click();

            setDownload(props.task.downloads+ 1 );
            props.task.downloads = dwnld + 1;
            store.dispatch({type: 'FETCH_TASK_SUCCESS', payload: props.task});
          });
        });
  }

  return (
    <Flex>
      <Card style={{marginLeft: '-2em', marginRight: '-2em',
        marginTop: '-2em', width: '120%', paddingBottom: '2em'}}>
        <CardHead style = {{paddingTop: '2em'}}>
          <img src ={avatarImg} alt="Task"
            style={{height: '7em', paddingLeft: '9em'}}
          />
          <TextContent style={{paddingLeft: '4em', paddingTop: '2em'}}>
            <Text style={{fontSize: '2em'}}>
              {props.task.name.charAt(0).toUpperCase()+props.task.name.slice(1)}
            </Text>

            <Text style={{fontSize: '1em'}}>
              <GithubIcon size="md"
                style = {{marginRight: '0.5em', marginBottom: '-0.3em'}} />
              <a href={props.task.github} >Github</a>
            </Text>

            <Grid>
              <GridItem span={10} style = {{paddingBottom: '1.5em'}}>
                {props.task.description}
              </GridItem>
              <GridItem>
                {
                  taskArr[0].map((tag: any) =>{
                    return (
                      <Badge
                        style={{paddingRight: '1em',
                          marginBottom: '1em', marginRight: '1em'}}
                        key={tag.Name}
                        className="badge">{tag}
                      </Badge>);
                  })
                }
              </GridItem>
            </Grid>
          </TextContent>

          <CardActions style={{marginRight: '3em', paddingTop: '2em'}}>
            <Flex breakpointMods={[{modifier: 'column', breakpoint: 'lg'}]}>
              <FlexItem>
                <Rating />
              </FlexItem>
              <FlexItem>
                <DownloadIcon style={{marginRight: '1em'}}/>
                {dwnld}
              </FlexItem>
              <FlexItem style={{marginLeft: '-3em'}}>
                <Button style={{width: '9em'}} onClick={download}>
                Download
                </Button>
              </FlexItem>
            </Flex>
          </CardActions>
        </CardHead>
      </Card>
    </Flex>
  );
};


export default BasicDetail;


