import React from "react"
import '@patternfly/react-core/dist/styles/base.css';
import { Tabs, Tab, Card, CardHead } from '@patternfly/react-core';
import { InfoCircleIcon } from '@patternfly/react-icons';

const Description: React.FC = () => {
    const [activeTabKey, setActiveTabKey] = React.useState(0);
    const handleTabClick = (event: any, tabIndex: any) => {
        setActiveTabKey(tabIndex);
    }
    return (
        <Card>
            <CardHead>
                <div className="ok-icon"><InfoCircleIcon color='blue' size='sm' /></div>
                <div className="rating-heading">Rating</div>
            </CardHead>
            <Tabs isFilled activeKey={activeTabKey} onSelect={handleTabClick}>
                <Tab eventKey={0} title="Description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi omnis, sint est quaerat architecto, amet ducimus, aliquid suscipit fuga itaque enim nostrum. Voluptatem, maxime magnam. Molestiae fugit facere nam expedita.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem deleniti facere iure inventore ex odio, necessitatibus omnis veritatis accusantium cumque odit voluptatum voluptate corrupti saepe quis rem consequuntur, ullam autem.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga sapiente vitae ipsa? Rem nobis, quae eligendi consequatur eos impedit. Incidunt, in aliquam. Repellendus minima aliquam voluptate culpa quis in voluptatem.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A inventore architecto voluptate atque voluptatibus ad cupiditate placeat exercitationem tempora dolor corrupti iure reprehenderit totam necessitatibus, ab, repellendus aut nisi eaque.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi omnis, sint est quaerat architecto, amet ducimus, aliquid suscipit fuga itaque enim nostrum. Voluptatem, maxime magnam. Molestiae fugit facere nam expedita.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem deleniti facere iure inventore ex odio, necessitatibus omnis veritatis accusantium cumque odit voluptatum voluptate corrupti saepe quis rem consequuntur, ullam autem.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga sapiente vitae ipsa? Rem nobis, quae eligendi consequatur eos impedit. Incidunt, in aliquam. Repellendus minima aliquam voluptate culpa quis in voluptatem.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A inventore architecto voluptate atque voluptatibus ad cupiditate placeat exercitationem tempora dolor corrupti iure reprehenderit totam necessitatibus, ab, repellendus aut nisi eaque.
            </Tab>
                <Tab eventKey={1} title="YAML">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus maxime odit aspernatur assumenda neque dolorum suscipit sit expedita totam quas asperiores veniam eveniet quae recusandae, alias laborum facere aperiam pariatur.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi omnis, sint est quaerat architecto, amet ducimus, aliquid suscipit fuga itaque enim nostrum. Voluptatem, maxime magnam. Molestiae fugit facere nam expedita.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem deleniti facere iure inventore ex odio, necessitatibus omnis veritatis accusantium cumque odit voluptatum voluptate corrupti saepe quis rem consequuntur, ullam autem.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga sapiente vitae ipsa? Rem nobis, quae eligendi consequatur eos impedit. Incidunt, in aliquam. Repellendus minima aliquam voluptate culpa quis in voluptatem.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A inventore architecto voluptate atque voluptatibus ad cupiditate placeat exercitationem tempora dolor corrupti iure reprehenderit totam necessitatibus, ab, repellendus aut nisi eaque.
            </Tab>
                <Tab eventKey={2} title="Example">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea voluptate consequuntur autem harum quasi, natus sequi temporibus perferendis eos! Assumenda id nulla ratione quidem libero officiis asperiores aut veritatis odio.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi omnis, sint est quaerat architecto, amet ducimus, aliquid suscipit fuga itaque enim nostrum. Voluptatem, maxime magnam. Molestiae fugit facere nam expedita.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem deleniti facere iure inventore ex odio, necessitatibus omnis veritatis accusantium cumque odit voluptatum voluptate corrupti saepe quis rem consequuntur, ullam autem.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga sapiente vitae ipsa? Rem nobis, quae eligendi consequatur eos impedit. Incidunt, in aliquam. Repellendus minima aliquam voluptate culpa quis in voluptatem.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A inventore architecto voluptate atque voluptatibus ad cupiditate placeat exercitationem tempora dolor corrupti iure reprehenderit totam necessitatibus, ab, repellendus aut nisi eaque.
            </Tab>
            </Tabs>
        </Card>
    );
}

export default Description;