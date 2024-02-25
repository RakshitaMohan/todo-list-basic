'use client';

import React, { useState } from 'react';
import { observer } from 'mobx-react';
import TodoListStore from '../../stores/TodoListStore';
import { Flex, Typography, Input, Divider} from 'antd';
import IdGeneratorService from '../../Service/IdGeneratorService';
import SingleItem from './SingleItem';

const { Title } = Typography;


function ListItems (props) {
    const { listId } = props;
    const [itemValue, setValue ] = useState();
    const list = TodoListStore.allTodoList[listId];

    const items = TodoListStore.allTodoList[listId].items || [];

    return (
        <Flex vertical
          style={{
            height: '100%',
            width: '100%'
          }}
        >
            <Title
              editable={{
                onChange: (value) => {
                    list.updateListName({ listName: value });
                }
              }}
              level={2}
            >
                {list.listName}
            </Title>
            <Divider />
            <Flex
              align='center'
              justify='center'
              style={{
                width: '100%',
                marginBottom: '32px'
              }}
            >
                <Input
                style={{
                    width: '50%',
                    height: '56px',
                    borderBottom: '2px solid black'
                }}
                placeholder='Lets write before you forget'
                value={itemValue}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                onPressEnter={() => {
                    const itemId = IdGeneratorService.generateId();
                    list.addItem({
                        item: {
                            itemId: `list:${itemId}`,
                            text: itemValue,
                            time: new Date().getTime()
                        }
                    });

                    setValue();
                }}
                />
            </Flex>
            <Flex 
              vertical
              style={{
                overflow: 'scroll',
                width: '100%',
                height: '500px',
                marginLeft: '32px'
              }}
            >
                {
                    items?.map((item) => {
                        return <SingleItem item={item} />
                    })
                }
            </Flex>
        </Flex>
    )


}

export default observer(ListItems);