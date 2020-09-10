const ipUrl = 'http://127.0.0.1:7001/admin/'

const servicePath = {
    'checkOpenId': `${ipUrl}checkOpenId`,    // 检查登陆的 时候是不是有OpenId 即检查用户账号密码是不是真实存在以及是不是能登陆
    'getTypeInfo': `${ipUrl}getTypeInfo`,
    'outLogin'   : `${ipUrl}outLogin`,
    'addArticle' : `${ipUrl}addArticle`,
    'upDateArticle': `${ipUrl}upDateArticle`
}

export default servicePath;