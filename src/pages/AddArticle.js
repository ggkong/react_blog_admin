import React,{useState, useEffect} from 'react';
import marked from 'marked';
import axios from 'axios';
import servicePath from '../config/apiUrl'
// eslint-disable-next-line
import {Row, Col, Input, Select, Button, DatePicker, message } from 'antd';
import '../static/css/AddArticle.css'
const {Option} = Select;  // 相当于 const Option = Select.Option
const {TextArea} =  Input; 


const AddArticle = (props) => {
    // 设置marked
    marked.setOptions({
        renderer: marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
      }); 
    // 使用 useState 主要有三个方面的作用 声明 读取 使用
    // 以下 赋值 均使用数组结构的的形式
    // 如 const [ articleId, setArticleId ] = useState(0) 可以拆分为三句 
    // let _useState = userState(0)
    // let articleId = _useState[0]
    // let setArticleId = _useState[1]
    // eslint-disable-next-line
    const [ articleId, setArticleId ] = useState(0);  // 文章的ID
      // eslint-disable-next-line
    const [ articleTitle, setArticleTitle ] = useState('');
    const [ articleContent, setArticleContent ] = useState('')
    const [ articleContentHtml, setArticleContentHmtl ] = useState('预览内容')  // 文章内容的 html
    const [ introduce, setIntroduce ] = useState('') // 简介的markdown 内容
    const [ introduceHtml, setIntroduceHtml ] = useState('等待编辑')    // 简介的 Html
    // eslint-disable-next-line
    const [ showDate, setShowData ] = useState()                     // 发布的时间
    // eslint-disable-next-line
    const [ upDate, setUpDate ] = useState()                         // 更新的时间
    const [ typeInfoList, setTypeInfoList ] = useState([])           // 文章的类别 列表
    const [ selectType, setSelectType ] = useState(1)                // 默认为第一个
    
    // 编写实时预览的 函数 两个 Html 都需要
    // 原理是监听 改变 然后对应做出修改
    // 文章主要内容
    // 实时监听 而后对页面进行更新 可能会存在性能问题 可以更改为 局部 节点刷新 减少资源消耗 
    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html =  marked(e.target.value)
        setArticleContentHmtl(html)
    }
    
    // 简介部分的预览
    const changeIntroduce = (e) => {
        setIntroduce(e.target.value)
        let html = marked(e.target.value)
        setIntroduceHtml(html)
    }

    // 前后端交互 进行 获取 列表的操作
    const getTypeInfo = () => {
        // 因为这个地方 是需要进行cookie 验证的 所以必须要带着 cookie 否则是不会成功的
        axios({
            method:'get',
            url:servicePath.getTypeInfo,
            header:{ 'Access-Control-Allow-Origin':'*' },
            withCredentials: true
        }).then((res) => {
            // eslint-disable-next-line
            console.log(`res 中的数据是什么${res.data.data}`)
            if(res.data.data === '没有登录') {
                console.log('没有登录')
                localStorage.removeItem('openId');
                props.history.push('/')
            } else {
                console.log('已经登陆了')
                console.log(res.data.data)
                setTypeInfoList(res.data.data)
            }
        });
    }

    // 选择 blog 的内容
    const selectTypeHandler = (value) => {
        console.log(value);
        setSelectType(value); // 将 type设置为 传进来的 value
    }

    // 文章进行保存 校验 
    const saveArticle = () => {
        // 进行教研
        if (articleTitle === ''){
            message.error('文章题目不能为空')
            return false
        }else if (articleContent === ''){
            message.error('文章内容不能为空')
            return false
        }else if (introduce === ''){
            message.error('文章简介不能为空')
            return false
        }else if (!showDate){
            message.error('发布日期不能为空')
            return false
        }

        // 文章通过校验 
        const dataProps = {} // 传递给后台的参数
        dataProps.type_id = selectType;
        dataProps.title = articleTitle;
        dataProps.article_content = articleContent;
        dataProps.introduce = introduce;
        dataProps.addTime = showDate;

        // 如果文章 是第一次 编辑
        if (articleId === 0){
            dataProps.view_count = Math.ceil(Math.random()*100) + 1000; //ceil 向上取整
            axios({
                method:'post',
                url:servicePath.addArticle,
                data:dataProps,
                withCredentials:true
            }).then((res) => {
                // setArticleId(res.data.insertId)
                console.log(res.data);
                if (res.data.isScussess) {
                    message.success('文章保存成功');
                }else {
                    message.error('文章保存失败');
                }
            })
        }
    }
    
    // 在useEffect 中进行使用
    useEffect(() => {
        getTypeInfo();
    // eslint-disable-next-line
    },[])   // 如果什么东西都不加 表示 就是当组件将被销毁时才进行解绑
    

    return (
    <div>
        <Row gutter={5}>
            <Col span={18}>
            <Row gutter={5} >
                <Col span={20}>
                    <Input 
                          placeholder="博客标题" 
                          size="large" 
                          onChange = {(e) => {
                              console.log(e.target.value)
                              setArticleTitle(e.target.value)
                          }}
                    />
                </Col>
                <Col span={4}>
                   
                    <Select defaultValue={selectType} size="large" onChange = {selectTypeHandler} >
                        {
                            typeInfoList.map((item, index) => {
                            return (<Option key = {index} value = {item.Id} >{item.typeName}</Option>)
                            })
                        }
                    </Select>
                </Col>
            </Row>
            <br/>
            <Row gutter={10} >
                <Col span={12}>
                    <TextArea 
                        value = {articleContent}
                        className="markdown-content" 
                        rows={35}  
                        onChange = {changeContent}
                        onPressEnter = {changeContent}
                        placeholder="文章内容"
                        />
                </Col>
                <Col span={12}>
                    <div 
                        className="show-html"
                        dangerouslySetInnerHTML = {{__html:articleContentHtml}}    
                    >
                    </div>

                </Col>
            </Row>  

    </Col>
            <Col span={6}>
        <Row style = {{margin:'2px 0px'}}>
            <Col span ={24}>
                
                <Button size = "mid" >暂存文章</Button>&nbsp;&nbsp;
                <Button type = "primary" size = "mid" onClick = {saveArticle}>发布文章</Button>
            </Col>
        </Row>

        <Row>
            <Col span = {24}>
                <br></br>
                <TextArea 
                    rows = {4}
                    placeholder = "文章简介"
                    value = {introduce}
                    onChange = {changeIntroduce}
                    onPressEnter = {changeIntroduce}
                />
                <br></br>
                <br></br>
                <div 
                    className = "introduce-html"
                    dangerouslySetInnerHTML = {{__html:introduceHtml}} 
                ></div>
            </Col>
        </Row>

        <Row gutter = {5}>
            <Col span={12}>
                <div className="date-select">
                    <DatePicker
                        placeholder="发布日期"
                        size="large"
                        onChange = {(value, dataSting) => {
                            console.log(`${value}++++${dataSting}`);
                            // 将时间进行选择 关于data-select 的两个参数 value 以及 dataSting  都可以在antd 上找到
                            setShowData(dataSting)  // set 进去
                        }}  
                    />
                </div>
            </Col>
            <Col span={12}>
                <div className="date-select">
                    <DatePicker
                        placeholder="修改日期"
                        size="large"  
                    />
                </div>
            </Col>
        </Row>
    </Col>
        </Row>
    </div>
    )
}

export default AddArticle;