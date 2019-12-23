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
  TextVariants,
  Tooltip,
} from '@patternfly/react-core';
import {DownloadIcon, StarIcon, CopyIcon} from '@patternfly/react-icons';
import {
  Badge,
} from '@patternfly/react-core';
import './index.css';
import '@patternfly/react-core/dist/styles/base.css';
import avatarImg from './download.png';
import './index.css';
import store from '../redux/store';
import {API_URL} from '../../constants';
// import SyntaxHighlighter from 'react-syntax-highlighter';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';

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
  const link =' kubectl apply -f https://raw.githubusercontent.com/tektoncd/catalog/master/golang/golang.yaml';

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
  // function for copy Task installation link
  const copy= (event:any) =>{
    const el = document.createElement('textarea');
    el.value = link;
    el.setAttribute('readonly', '');
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    document.body.removeChild(el);
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

                <div>
                  { document.queryCommandSupported('copy')}
                  <Popup trigger={<Button className="button"> Install </Button>} modal>
                    {(close) => (
                      <div className="modal">
                        <a className="close" onClick={close}>
                              &times;
                        </a>
                        <div className="header">
                          {props.task.name.charAt(0).toUpperCase()+props.task.name.slice(1)}
                        </div>
                        <div className="content" >
                          {' '}
                          <div style={{marginBottom: '2em'}}>
                            <span style={{fontSize: '1.5em'}}> Install on Kubernetes  </span>
                            <br />
                          In order to use {props.task.name} Task
                          you need to first install the Task.
                            <br />
                          </div>
                          <TextContent>

                            <Text component={TextVariants.blockquote}>
                              {link}
                              <Tooltip content="Copy to Clipboard">
                                <CopyIcon
                                  style = {{position: 'absolute', marginLeft: '6em', cursor: 'pointer'}}
                                  size="md"
                                  onClick = {copy}
                                >
                                </CopyIcon>
                              </Tooltip>
                            </Text>

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


