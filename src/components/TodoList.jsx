'use client';

import React from 'react';
import { observer } from 'mobx-react';
import { Layout } from 'antd';
import TodoWrapper from './Content/TodoWrapper';

const { Content }  = Layout;

function TodoListComponent () {
    return (
        <Layout
          style={{
            width: '100%',
            height: '100vh',
            padding: '64px'
          }}
        >
            <Content>
                <TodoWrapper />
            </Content>
        </Layout>
    )
}

export default observer(TodoListComponent);