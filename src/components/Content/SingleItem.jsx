'use client';

import React, { useState } from 'react';
import { observer } from 'mobx-react';
import TodoListStore from '../../stores/TodoListStore';
import { Flex, Typography, Input, Divider} from 'antd';


const { Text, Title } = Typography;

function SingleItem (props) {
    const { item } = props;

    return (
        <Flex 
          gap={8}
          style={{
            padding: '0 8px 0 32px'
          }}
        >
            <Text
              editable={{
                triggerType: ['icon'],
                onChange: (value) => {
                    item.updateText({ text: value });
                }
              }}
            >
                {item.text}
            </Text>
        </Flex>
    )
}

export default observer(SingleItem);