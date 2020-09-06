import React,{useState} from 'react';
import marked from 'marked';
import {Row, Col, Input, Select, Button,DatePicker } from 'antd';
import '../static/css/AddArticle.css'
// eslint-disable-next-line
const {Option} = Select;  // 相当于 const Option = Select.Option
// eslint-disable-next-line
const {TextArea} =  Input; 

const AddArticle = () => {
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
      // eslint-disable-next-line
    const [ typeInfoList, setTypeInfoList ] = useState([])           // 文章的类别 列表
      // eslint-disable-next-line
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
    

    return (
    <div>
        <Row gutter={5}>
            <Col span={18}>
            <Row gutter={5} >
                <Col span={20}>
                    <Input 
                          placeholder="博客标题" 
                          size="large" />
                </Col>
                <Col span={4}>
                   
                    <Select defaultValue="jisuBlog" size="large">
                        <Option value="jisuBlog">技术Blog</Option>
                        <Option value="shenghuoBlog">生活Blog</Option>
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
                <Button type = "primary" size = "mid" >发布文章</Button>
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