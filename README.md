# node-chandao-notifier
# 禅道监控bug并提示到windows10的通知中

### 技术栈:node
#### 使用场景分析: 禅道是使用ssr渲染模式即服务器端返回整个html页面并使用header头中的cookie判断登录信息
#### 技术实现: 使用node请求禅道页面，并使用cheerio解析html模板并选取出对应节点的text，去除空格后判断是否有待解决bug