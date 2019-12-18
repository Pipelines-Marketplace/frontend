//  eslint-enable max-len
import React, {useState} from 'react';
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
  CardFooter,
  Modal,
} from '@patternfly/react-core';
import {DownloadIcon, StarIcon} from '@patternfly/react-icons';
import {
  Badge,
} from '@patternfly/react-core';
import './index.css';
import '@patternfly/react-core/dist/styles/base.css';
import avatarImg from './download.png';
import './index.css';
import store from '../redux/store';
import {API_URL} from '../../constants';

export interface BasicDetailPropObject {
    id: any
    name : string;
    description : string;
    downloads : number;
    rating : number;
    yaml : string;
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
  const [modalopen, setModalopen]=useState(false);

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
  const install=() =>{
    setModalopen(!modalopen);
  };


  return (
    <Flex>
      <Card style={{marginLeft: '7em', marginRight: '7em',
        marginTop: '2em', width: '100%'}}>
        <CardHead>
          <img src ={avatarImg} alt="Task"
            style={{height: '7em', marginLeft: '3em'}}
          />
          <TextContent style={{marginLeft: '4em'}}>
            <Text style={{fontSize: '2em'}}>
              {props.task.name.charAt(0).toUpperCase()+props.task.name.slice(1)}
            </Text>
            <Grid>
              <GridItem span={10}>
                {props.task.description}
              </GridItem>
            </Grid>
          </TextContent>

          <CardActions style={{marginRight: '5em'}}>
            <Flex breakpointMods={[{modifier: 'column', breakpoint: 'lg'}]}>
              <FlexItem>
                <DownloadIcon style={{marginRight: '1em', marginTop: '2em'}}/>
                {dwnld}
              </FlexItem>
              <FlexItem>
                <StarIcon color="gold" size="md" />
              </FlexItem>
              <FlexItem style={{marginLeft: '-3em'}}>
                <Button style={{width: '9em'}} onClick={install}>
                Install
                </Button>
                <Modal className = "-pf-c-modal-box--Zindex"
                  width={'50%'}
                  title="Copy following command to install
                  the task/pipeline in your cluster"
                  isOpen={modalopen}
                  onClose={install}
                  isFooterLeftAligned
                >

  Lorem ipsum dolor sit amet
   consectetur adipiscing elit
  sed do eiusmod tempor incididunt
   ut labore et dolore

                </Modal>


              </FlexItem>
            </Flex>
          </CardActions>
        </CardHead>

        <CardFooter style={{marginLeft: '14em'}}>
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
        </CardFooter>
      </Card>
    </Flex>
  );
};


export default BasicDetail;


