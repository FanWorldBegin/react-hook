import React, { Component, useState, useEffect } from 'react';

// 存放token

class TokenForm extends Component {
  handleSubmit = event => {
    event.preventDefault();
    const { setToken } = this.props;
    const token = this.tokenInput.value;
    if (token) {
      setToken(token);
    }
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          type="text"
          name="token"
          placeholder="Enter your Github token"
          ref={input => {
            this.tokenInput = input;
          }}
        />
      </form>
    )
  }
}

export default () => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  //每次更新或重加载时候设置token
  useEffect(() => {
    sessionStorage.setItem("token", token);
  })

  return (
    <div>
      <h1>Hello, 回车存储session</h1>
      { token ? token : <TokenForm setToken={ setToken } /> }
    </div>
  )
}