import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PT from 'prop-types'

const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`

class Login extends React.Component {
  state = {
    login: '',
    password: '',
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onLogin = () => {
    this.props
      .login({
        variables: { email: this.state.login, password: this.state.password },
      })
      .then(response => {
        alert(response.data.signinUser.token)
      })
      .catch(console.log)
  }

  render() {
    return (
      <div>
        <input name="login" onChange={this.onChange} value={this.state.login} />
        <input
          name="password"
          onChange={this.onChange}
          value={this.state.password}
          type="password"
        />
        <button onClick={this.onLogin}>Login</button>
      </div>
    )
  }
}

Login.propTypes = {
  login: PT.func,
}

export default graphql(LOGIN, { name: 'login' })(Login)
