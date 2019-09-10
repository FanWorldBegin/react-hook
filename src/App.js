import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Navbar from './component/Navbar';
import BasicUse from './page/1.basic';
import EmojiGenerator from './page/2. State-Effect-Hook/EmojiGenerator';
import TokenApp from './page/2. State-Effect-Hook/TokenApp';
import TodoList from './page/4.todoList';
import Optimizingperformance from './page/5.optimizing-performance';
import AjaxUseEffect from './page/6.useEffect-ajax';
import GithubListClass from './page/7.hook-practice.js/index';
import HookRules from './page/7.hook-practice.js';
import UseEffectComponentWillUnmount from './page/9.useEffect-componentWillUnmount';
import {MemoDemo} from './page/10.memo';
import TodoListImprove from './page/11.improve-todolist/TodoList'
function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Route path='/1.basic' component={BasicUse}/>
        <Route path='/2.EmojiGenerator' component={EmojiGenerator}/>
        <Route path='/2.TokenApp' component={TokenApp}/>
        <Route path='/4.TodoList' component={TodoList}/>
        <Route path='/5.Optimizingperformance' component={Optimizingperformance}/>
        <Route path='/6.AjaxUseEffect' component={AjaxUseEffect}/>
        <Route path='/7.GithubListClass' component={GithubListClass}/>
        <Route path='/8.HookRules' component={HookRules}/>
        <Route path='/9.UseEffectComponentWillUnmount' component={UseEffectComponentWillUnmount}/>
        <Route path='/10.MemoDemo' component={MemoDemo}/>
        <Route path='/11.TodoListImprove' component={TodoListImprove}/>
      </div>

    </Router>
  );
}

export default App;
