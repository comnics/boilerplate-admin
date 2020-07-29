import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Button from 'antd/lib/button'

function LandingPage(props) {
    const onClickHandler = (event) => {
        axios.get('/api/users/logout')
        .then(response => {
            if(response.data.success) {
                props.history.push('/login');
            }else {
                alert('로그아웃에 실패했습니다.');
            }
        });
    }

    return (
        <div style={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '100%', 
            height: '100vh'
            }}>
            <h2>LandingPage</h2>
            <Button type="primary">Button</Button>
            <button onClick={onClickHandler}>로그아웃</button>
        </div>
    )
}

export default withRouter(LandingPage)
