### react-router
安装 `yarn add react-router-dom`
编写简单的路由程序
##### src/index.js
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';

ReactDOM.render(<AppRouter>, document.getElementById('root'));
```

##### src/ 目录下创建 AppRouter.js
```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function Index() {
  return (
    <h2>Jorna</h2>
  )
}

function List() {
  return (
    <h2>List-page</h2>
  )
}

function AppRouter() {
  return (
    <Router>
      <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link to="/list/">列表</Link></li>
      </ul>
      <Route path="/" exact component={Index}></Route>
      <Route path="/list/" component={List}></Route>
    </Router>
  )
}

export default AppRouter;
```

编写 Index 组件
##### 在 src/ 目录建立一个 views，然后建立一个组件 Index.js，代码如下：
```javascript
import React, { Component } from 'react';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <h2>Jorna in here</h2>
    )
  }
}

export default Index;
```
##### 创建并编写 List.js 组件
```javascript
import React, { Component } from 'react';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <h2>List Page</h2>
    )
  }
}

export default List;
```

##### 修改 AppRouter.js
```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Index from './views/Index';
import List from './vies/List';

function AppRouter() {
  return (
    <Router>
      <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link to="/list/">列表</Link></li>
      </ul>
      <Route path="/" exact component={Index}></Route>
      <Route path="/list/" component={List}></Route>
    </Router>
  )
}

export default AppRouter;
```

#### `exact` 精确匹配，路径信息要完全匹配，才可以实现跳转，匹配一部分是不行的。
`exact`: bool
When true, will only match if the path matches the location.pathname exactly.
如果为 true，则仅在路径与 `location.pathname` 完全匹配时才匹配。
```
path: one/
location.pathname: /one/two
exact: true
matches: no

path: one/
location.pathname: /one/two
exact: false
matches: yes
```
##### react-router 动态传值
在 Route 上设置允许动态传值，这个是以 `:` 开始的，然后紧跟着传递的 `key` 名称，例子如下：
```javascript
// 在 path 上加 id, 这样设置了允许传值规则。
<Route path="/list/:id" component={List} />
```
##### Link 上传值
设置规则后，就可以在 `Link` 上设置值了，现在设置传递的 id 值了，这时候就不用再添加 id，直接写就可以。
```javascript
<li><Link to="/list/123">列表</Link></li>
```
##### 更新 AppRouter.js 代码
```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Index from './views/Index';
import List from './views/List';

function AppRouter() {
  return (
    <Router>
      <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link to="/list/123">列表</Link></li>
      </ul>
      <Route path="/" exact component={Index} />
      <Route path="/list/:id" component={List} />
    </Router>
  )
}

export default AppRouter;
```
##### 在 List 组件上接收并显示传递值
组件接收传递过来的值的时候，可以在声明周期 `componentDidMout` 中进行，传递的值在 `this.props.match` 中，代码如下：
```javascript
import React, { Component } from 'react';

class List extends Component {
  constructor(props) {
    super(props);
    this.state ={};
  }
  componentDidMount() {
    console.log(this.props.match)
  }
}

export default List;
```
`match` 对象包含三个部分：
- path: 自己定义的路由规则，可以清楚的看到 id 参数的
- url: 真实的访问路径，可以清楚的看到传递过来的参数是什么
- params: 传递过来的参数，`key` 和 `value` 值。

根据 `match` 对象属性，获得传递过来的 id 值。代码如下：
```javascript
import React, { Component } from 'react'

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // console.log(this.props.match)
    const tempId = this.props.match.params.id;
    this.setState({ id: tempId })
  }
  render() {
    return (
      <h2>List page->{this.state.id}</h2>
    )
  }
}
```
##### src/ 目录下 Index 组件模拟一个列表数组，相当于从后台动态获取到内容，然后数组中包含文章的 cid 和 title。直接在 `state` 初始化进行设置，代码如下：
```javascript
constructor(props) {
  super(props);
  this.state = {
    list: [
      { cid: 123, title: 'Jorna blog-1' },
      { cid: 456, title: 'Jorna blog-2' },
      { cid: 789, title: 'Jorna blog-3' }
    ]
  }
}
```
遍历 `list` 数组
```javascript
render() {
  return (
    <ul>
      {
        this.state.list.map((item, index) => {
          return <li key={index}>{item.title}</li>
        })
      }
    </ul>
  )
}
```
##### 引入 Link 组件，配置 Link 并更新 Index.js 组件
```javascript
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Index extends Component {
  constructor(props) {
    super(props);
      this.state = {
        list: [
        { cid: 123, title: 'Jorna blog-1' },
        { cid: 456, title: 'Jorna blog-2' },
        { cid: 789, title: 'Jorna blog-3' }
      ]
    }
  }
  render() {
    return (
      <ul>
        {
          this.state.list.map((item, index) => {
            return <li key={index}>
              <Link to={'/list/' + item.cid}>{item.title}</Link>
            </li>
          })
        }
      </ul>
    )
  }
}
```
##### react-router 重定向 `Redirect` 使用
- 标签式重定向：就是利用标签 `Redirect` 进行重定向，业务不复杂时，建议使用这种。
- 编程式重定向：一般用于业务逻辑当中，比如登陆成功到会员中心页面。

<span style="background-color:#A52A2A;color:#fff;">注意：重定向和跳转有一个重要的区别，就是跳转式可以用浏览器的返回按钮返回上一级，而重定向是不可以的。</span>

##### 标签式重定向，一般不是用在很复杂的业务逻辑中 例如进入 Index.js 组件，直接重定向到 Home 组件
创建 Home.js 组件
```javascript
import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <h2>我是 Home 组件</h2>
  }
}

export default Home;
```
##### 在 AppRouter.js 中添加 Route 配置，配置时引入 Home 组件
```javascript
import Home from './views/Home';
<Route path='/home/' component={Home} />
```
更新 `Index.js` 组件，从 Index 组件重定向到 Home, 需要先引入 `Redirect`。
```javascript
import { Link, Redirect } from 'react-router-dom';
```
引入 `Redirect` 后，直接在 `render` 函数里使用即可。
```javascript
<Redirect to="/home/">
```
##### 编程式重定向，不再利用标签 Redirect，直接使用 JS 重定向，一般用在业务逻辑比较复杂的场景或需要多次判断的场景
比如直接在构造函数里 `constructor` 加入重定向代码：
```javascript
this.props.history.push('/home/')
```

