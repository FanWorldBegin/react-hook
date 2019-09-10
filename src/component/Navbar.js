import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss'

export default class Navbar extends Component {
  render() {
    return (
      <div className='navbar-isContainer'>
        <h1>React 进阶提高 Hook</h1>
        <ul>
          <li>
            <Link className="nav-link" to='/1.basic'>1.基本使用</Link>
          </li> 
          <li>
            <Link className="nav-link" to='/2.EmojiGenerator'>2.实践 State Hook</Link>
          </li> 
          <li>
            <Link className="nav-link" to='/3.TokenApp'>3.实践 Effect Hook</Link>
          </li> 
          <li>
            <Link className="nav-link" to='/4.TodoList'>4. 实现 TodoList</Link>
          </li> 
          <li>
            <Link className="nav-link" to='/5.Optimizingperformance'>5. 通过跳过 React Hook Effect 来优化性能</Link>
          </li> 
          <li>
            <Link className="nav-link" to='/6.AjaxUseEffect'>6. 使用 React Hooks useEffect 发送 ajax 请求获取数据全攻略</Link>
          </li> 
          <li>
            <Link className="nav-link" to='/7.GithubListClass'>7. 使用 React Hooks useEffect 发送 ajax 请求获取数据全攻略</Link>
          </li> 
          <li>
            <Link className="nav-link" to='/8.HookRules'>8. React Hook 的规则</Link>
          </li> 
          <li>
            <Link className="nav-link" to='/9.UseEffectComponentWillUnmount'>9. useEffect 中的 componentWillUnmount </Link>
          </li> 
          <li>
            <Link className="nav-link" to='/10.MemoDemo'>10.MemoDemo </Link>
          </li> 
        </ul> 
      </div>
    )
  }

}