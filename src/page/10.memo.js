import React, { Component } from 'react';


export class MemoDemo extends Component {
  state = {
    time: new Date()
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        time: new Date()
      })
    }, 1000)
  }

  render() {
    return (
      <div>
        <h3>没有生命周期函数的component 没有shouldComponentUpdate</h3>
        <h3>为了实现pureComponent的功能MemoDemo</h3>
        <h3>父组件需要重更新渲染，但子组件不需要</h3>
        <h3>ChildMemo 子组件 传入没有变化不需要渲染</h3>
        <ChildMemo seconds={ 1 } />
        { this.state.time.toString() }
      </div>
    )
  }
}


const Child = ({ seconds }) => {
  console.log('I am rendering');
  return <p>I am updating every { seconds } seconds.</p>;
}

const ChildMemo =  React.memo(Child);