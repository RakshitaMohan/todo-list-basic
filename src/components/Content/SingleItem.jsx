'use client';

import React, { useState } from 'react';
import { observer } from 'mobx-react';
import TodoListStore from '../../stores/TodoListStore';
import { Flex, Typography, Input, Button} from 'antd';
import {EditOutlined} from '@ant-design/icons';


const { Text, Title } = Typography;

function SingleItem (props) {
    const { item } = props;
    const [value, setValue] = useState(item.text);
    const [isEditing, setEditing] = useState(false);

    return (
        <Flex 
          gap={8}
          justify='space-between'
          style={{
            padding: '0 8px 0 32px',
          }}
        >
          {
            isEditing ? 
            <Input
              autoFocus
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              onPressEnter={() => {
                item.updateText({ text: value });
                setEditing(false);
              }}
            /> :
            <Text
              ellipsis={{ tooltip: item.text }}          
              style={{
                maxWidth: '800px',
                color: 'inherit'
              }}
            >
              {item.text}
              </Text>
          }
          <Button
             icon={<EditOutlined />}
             onClick={() => {
              setEditing(true);
             }}
          />
        </Flex>
    )
}

export default observer(SingleItem);