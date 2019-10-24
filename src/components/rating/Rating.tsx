import React from "react";
import '@patternfly/react-core/dist/styles/base.css';
import "./index.css";
import {
    Card,
    CardHead,
} from '@patternfly/react-core';
import { OkIcon } from '@patternfly/react-icons';

const Rating: React.FC = () => {
    return (
        <Card style={{minHeight:'40em',maxWidth:'30em'}}>
            <CardHead>
                <div className="ok-icon"><OkIcon color='green' size='sm' /></div>
                <div className="rating-heading">Rating</div>
            </CardHead>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, praesentium voluptatem iure esse natus ab veniam cumque? Libero eum asperiores explicabo labore eius consequatur reiciendis eveniet animi, quae aspernatur ipsam.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque commodi architecto voluptates molestias! Corrupti asperiores tempore fuga perferendis, officia modi, pariatur dolorem a, excepturi animi inventore harum facilis earum accusamus!
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. A nobis, culpa iure ab id reprehenderit cum voluptates aperiam ratione illum repudiandae suscipit aut ad consequatur quis accusantium! Expedita, esse molestiae!
        </Card>
    );
}

export default Rating;