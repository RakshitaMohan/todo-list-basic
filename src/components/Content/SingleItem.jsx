'use client';

import React, { useState } from 'react';
import { observer } from 'mobx-react';
import TodoListStore from '../../stores/TodoListStore';
import { Flex, Typography, Input, Button} from 'antd';
import {EditOutlined, StarOutlined, StarFilled, RedoOutlined, StrikethroughOutlined } from '@ant-design/icons';


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
          <Flex gap={8}>
            <div
              style={{
                minWidth: '20px'
              }}
              onClick={() => {
                item.toggleStarred();
              }}
            >
              {
                item.isStarred ? <StarFilled /> : <StarOutlined />
              }
            </div>
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
                delete={item.isCompleted}
                ellipsis={{ tooltip: item.text }}          
                style={{
                  maxWidth: '800px',
                  color: 'inherit'
                }}
              >
                {item.text}
                </Text>
            }
          </Flex>
          <Flex gap={16}>
            <Button
              type='text'
              icon={<EditOutlined />}
              onClick={() => {
                setEditing(true);
              }}
            />
            <Button
              type='text'
              onClick={() => {
                item.toggleComplete()
              }}
              icon={item.isCompleted ? <RedoOutlined /> : <StrikethroughOutlined />}
            />
          </Flex>
        </Flex>
    )
}

export default observer(SingleItem);