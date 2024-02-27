'use client';

import React from 'react';
import { observer } from 'mobx-react';
import { Flex, Tabs, Button, Typography } from 'antd';
import TodoListStore from '../../stores/TodoListStore';
import ListItems from './ListItems';
import IdGeneratorService from '../../Service/IdGeneratorService';

const { Text } = Typography;


function AddListWrapper () {
    return (
        <Button
          onClick={() => {
            const listId = IdGeneratorService.generateId();
            TodoListStore.addList({
                list: {
                    listName: 'New List',
                    listId: listId,
                    items: []
                }
            });
          }}
        >
           Add List
        </Button>
    )
}

function TodoWrapper () {
    const lists = TodoListStore.lists || [];

    const items = lists?.map((list) => {
        return {
            key: list.listId,
            label:(<Text
              ellipsis={{ tooltip: list.listName }}          
              style={{
                maxWidth: 200,
                color: 'inherit'
              }}
              >
                {list.listName}
              </Text>),
            children: <ListItems listId={list.listId} />
        }
    })

    return (
        <Flex
          style={{
            height: '100%',
            width: '100%'
          }}
        >
            <Tabs
              items={items.length ? items : []}
              tabPosition='top'
              style={{
                flexGrow: 1,
                height: '80%'
              }}
              tabBarExtraContent={{
                right: <AddListWrapper />
              }}
            >
            </Tabs>
        </Flex>
    )
}

export default observer(TodoWrapper);

