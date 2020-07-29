import React from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'

import { Form, Input, Button, Checkbox } from 'antd';

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

function LoginPage(props) {
    const dispatch = useDispatch();

    const onFinish = values => {
        console.log('Success:', values);

        let body = {
            email: values.email,
            password: values.password
        }

        dispatch(loginUser(body))
        .then( response => {
            if(response.payload.loginSuccess) {
                props.history.push('/')
            }else{
                alert('Error')
            }
        })        
    };
    
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '100%', 
            height: '100vh'
            }}>

            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item label="Email" name="email"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Password" name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                    Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default withRouter(LoginPage)
