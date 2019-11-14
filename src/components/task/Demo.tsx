// import React from 'react';
// import '@patternfly/react-core/dist/styles/base.css';
// import {Flex, Avatar} from '@patternfly/react-core';
// import imgAvatar from '../assets/logo/imgAvatar.png';

// eslint-disable-next-line require-jsdoc
// function demo() {
// return (
//     <Flex>
//       <section className="pf-c-page__main-section">
//         <div className= "pf-l-gallery pf-m-gutter">
//           <div className="pf-c-card pf-m-hoverable pf-m-compact">
//             <div className="pf-c-card_head">
//               <Avatar src={imgAvatar} alt="avatar"
// style={{height: '5em', width: '5em'}}></Avatar>
//             </div>
//             <div className="pf-c-card_header pf-c-title pf-m-md"></div>
//             <p>Pipeline-Marketplace</p>
//           </div>
//         </div>
//       </section>
//     </Flex>

// );
// }

// export default demo;
import React from 'react';
import {Gallery, CardHead, CardHeader, CardFooter, CardBody, CardActions} from '@patternfly/react-core';
import {Flex, Card, Badge} from '@patternfly/react-core';
import imgAvatar from '../assets/logo/imgAvatar.png';
import {DownloadIcon, OkIcon} from '@patternfly/react-icons';
import '../task/demo.css';

// eslint-disable-next-line require-jsdoc
function demo() {
  return (
    <Gallery gutter="md">
      {/* <Flex>
        <section className="pf-c-page__main-section">
          <div className= "pf-l-gallery pf-m-gutter">
            <div className="pf-c-card pf-m-hoverable pf-m-compact">
              <div className="pf-c-card_head">
                <Avatar src={imgAvatar} alt="avatar" style={{height: '5em', width: '5em'}}></Avatar>
              </div>
              <div className="pf-c-card_header pf-c-title pf-m-md"></div>
              <p>Pipeline-Marketplace</p>
            </div>
          </div>
        </section>
      </Flex> */}

      <Flex>
        <section className="pf-c-page__main-section">
          <div>
            <span className="demo">
              <div className= "pf-l-gallery pf-m-gutter">

                <div className="pf-c-card pf-m-hoverable">
                  <Card>
                    <div className="pf-c-card_head">
                      <CardHead>
                        <img src = {imgAvatar} style={{height: '50px'}}/>
                        {/* <div className="pf-c-card_actions"> */}
                        <CardActions>
                          <DownloadIcon/>
                          {'  '}10M
                          <OkIcon />{'  '} 4.5
                        </CardActions>
                        {/* </div> */}
                      </CardHead>
                    </div>
                    <CardHeader>Task Name</CardHeader>
                    {/* <div className="pf-c-card_body"> */}
                    <CardBody>These tasks are golang tasks to build, deploy and validate Go projects.These tasks are golang tasks to build, deploy and validate Go projects.</CardBody>
                    {/* </div> */}
                    {/* <div className="pf-c-card_footer"> */}
                    <CardFooter>
                      <Badge>Build</Badge>
                      {' '}
                      <Badge>Task</Badge>
                      {' '}
                      <Badge>Deploy</Badge>
                      {' '}
                    </CardFooter>
                  </Card>
                </div>


                <div className="pf-c-card pf-m-hoverable">
                  <Card>
                    <div className="pf-c-card_head">
                      <CardHead>
                        <img src = {imgAvatar} style={{height: '50px'}}/>
                        {/* <div className="pf-c-card_actions "> */}
                        <CardActions>
                          <DownloadIcon/>
                          {'  '}10M
                          <OkIcon />{'  '} 4.5
                        </CardActions>
                        {/* </div> */}
                      </CardHead>
                    </div>
                    <CardHeader>Task Name</CardHeader>
                    {/* <div className="card-body"> */}
                    <CardBody >These tasks are golang tasks to build, deploy and validate Go projects.</CardBody>
                    {/* <span className="card-body"></span> */}
                    {/* </div> */}
                    {/* <div className="pf-c-card_footer"></div> */}
                    <CardFooter>
                      <Badge>Build</Badge>
                      {' '}
                      <Badge>Task</Badge>
                      {' '}
                      <Badge>Deploy</Badge>
                      {' '}
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </span>
          </div>
        </section>
      </Flex>

      {/* <Flex>
        <section className="pf-c-page__main-section">
          <Gallery gutter="md">
            <Card>
              <CardHead>
                <img src = {imgAvatar} style = {{height: '50px'}}/>
              </CardHead>
              <CardActions>

              </CardActions>
            </Card>
          </Gallery>
        </section>
      </Flex> */}


      {/* <GalleryItem>Gallery Item</GalleryItem>
      <GalleryItem>Gallery Item</GalleryItem>
      <GalleryItem>Gallery Item</GalleryItem>
      <GalleryItem>Gallery Item</GalleryItem>
      <GalleryItem>Gallery Item</GalleryItem>
      <GalleryItem>Gallery Item</GalleryItem> */}

    </Gallery>
  );
}

export default demo;
