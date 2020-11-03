import React , {useState} from 'react';
import {Card, Input,Button, Spin, message} from 'antd';
import 'antd/dist/antd.css';
import '../static/css/Login.css';
import axios from 'axios';
import servicePath from '../config/apiUrl'

const Login = (props) => {
    const [userName, setUserName ] = useState('');
    const [password, setPassword ] = useState('');
    const [isLoading, setIsLoading ] = useState(false);
    // isLoading 主要用来判断 spin 组件是否进入加载状态  防止重复提交

    // 当点击后 将 setIsLoading 变为 true 一秒钟后再变回来 模仿交互 
    const checkLogin = () => {
        setIsLoading(true)   // 将setLoading 设置为 true 就是 模仿是不是 能登陆
        if (userName === '') {
            message.error('用户名不能为空!');
            setTimeout(() => {setIsLoading(false)},500);
            console.log("用户名为空")
            return false;
        }
        if (password === '') {
            message.error('密码不能为空！');
            setTimeout(() => {setIsLoading(false)},500);
            console.log("密码为空")
            return false;
        }
        console.log(`${userName}+${password}`)
        const dataProps = {
            'userName': userName,
            'password': password,
        }

        axios({
           method:'post',
           url:servicePath.checkOpenId,
           data:dataProps,
           withCredentials:true  // 跨域请求带上cookie
        }).then((res) => {
            console.log(res)
            setIsLoading(false); // 将等待关闭
            if(res.data.data === 'success') {
                console.log("成功了")
                console.log(`res.data.openId是什么的${res.data.openId}`)
                // 其实已经set 进去了 但是 又立马 被remove了  推测原因为 根本就没有 session 进去
                localStorage.setItem('openId', `${res.data.openId}`);  // 设置localStorage
                props.history.push('/index/')
            }else {
                console.log("失败了")
                message.error('用户名或者密码错误')
            }
        })

        setTimeout(() => {
            setIsLoading(false)
        },1000)
    }
    
    return(
        <div className = 'login_div'>
            <Spin tip ="loading..." spinning={isLoading}>
                <Card className='title' title = "KongGe Blog Systema" bordered = {true} style = {{width : 400}}>
                    <Input
                        id = 'userName'
                        size = 'large'
                        placeholder = 'Enter your username'
                        
                        onChange={(e)=>{setUserName(e.target.value)}}
                    />
                    <br></br> <br></br>
                    <Input.Password
                        id = 'Password'
                        size = 'large'
                        placeholder = 'Enter your password'
                        
                        onChange = {(e) => {setPassword(e.target.value)}}
                    />
                    <br/><br/>
                    <Button type='primary' size='large' block onClick={checkLogin} >LOGIN IN</Button>

                    
                </Card>
            </Spin>
        </div>
        
    )
    
}
export default Login;