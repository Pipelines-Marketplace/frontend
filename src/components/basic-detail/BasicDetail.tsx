//  eslint-enable max-len
import React, {useState, useEffect} from 'react';
import Popup from 'reactjs-popup';
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
  ClipboardCopy,
  ClipboardCopyVariant,
} from '@patternfly/react-core';
import {DownloadIcon, StarIcon} from '@patternfly/react-icons';
import {
  Badge,
} from '@patternfly/react-core';
import './index.css';
import '@patternfly/react-core/dist/styles/base.css';
import avatarImg from './download.png';
import './index.css';
import {API_URL} from '../../constants';
import {useParams} from 'react-router';
// import SyntaxHighlighter from 'react-syntax-highlighter';

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
  const {taskId} = useParams();
  const taskArr : any = [];
  const [resourcePath, setResourcePath]=useState();

  if (props.task.tags != null) {
    taskArr.push(props.task.tags);
  } else {
    taskArr.push([]);
  }
  useEffect(() =>{
    fetch(`${API_URL}/resource/links/${taskId}`)
        .then((resp) => resp.json())
        .then((data) => setResourcePath(data));
  }, []);
  const Myfun=(it:any) =>{
    return (

      <Flex breakpointMods={[{modifier: 'row', breakpoint: 'lg'}]}>
        <FlexItem>

          <ClipboardCopy style = {{width: '53em'}}
            isReadOnly variant={ClipboardCopyVariant.expansion}>
            {`$ ${'kubectl apply -f ' + it.it}`}</ClipboardCopy>
          <br />
        </FlexItem>
      </Flex>
    );
  };


  let taskLink :any;
  let pipelineLink:any = '';
  if (resourcePath !== undefined) {
    // for displaying resources for pipelines
    if (resourcePath['pipelines'] !== null) {
      const pipelinePath = 'kubectl apply -f ' + resourcePath['pipelines'];
      pipelineLink =
      <div>
        <Text style = {{paddingLeft: '0.5em'}}> <b>Pipeline</b> </Text>
        <ClipboardCopy style = {{width: '53em', marginLeft: '2.8em'}} isReadOnly
          variant={ClipboardCopyVariant.expansion}>
          {`$ ${pipelinePath}`}</ClipboardCopy>

      </div>;
    }


    taskLink = <ul>
      {
        resourcePath['tasks'].map((it:any) => <Myfun it={it} key={it} />)
      }
    </ul>;
  }


  return (
    <Flex>
      <Card style={{marginLeft: '7em', marginRight: '7em',
        marginTop: '2em', width: '100%', backgroundColor: '#EDEDED'}}>
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
                {/* {dwnld} */}
              </FlexItem>
              <FlexItem>
                <StarIcon color="gold" size="md" />
              </FlexItem>
              <FlexItem style={{marginLeft: '-3em'}}>

                <div>
                  { document.queryCommandSupported('copy')}
                  <Popup trigger={<Button className="button"
                  > Install </Button>} modal>
                    {(close) => (
                      <div className="modal">
                        <a className="close" onClick={close}>
                              &times;
                        </a>

                        <div className="header">
                          {props.task.name.charAt(0).toUpperCase()+
                            props.task.name.slice(1)}
                        </div>
                        <div className="content" >
                          {' '}
                          <div style={{marginBottom: '1em', marginTop: '1em'}}>
                            <span style={{fontSize: '1em', paddingLeft: '1em'}}>
                            Install on Kubernetes  </span>
                            <br />
                          </div>
                          <TextContent>
                            {/* <Text> */}
                            {/* <b>{pipelines} </b> */}
                            {pipelineLink}
                            {/* </Text> */}

                            <Text
                              style = {{paddingLeft: '0.5em',
                                marginTop: '0.5em'}}>
                              <b>Tasks</b>
                            </Text>
                            {taskLink}
                          </TextContent>
                          <br />
                        </div>
                      </div>
                    )}
                  </Popup>
                </div>

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


