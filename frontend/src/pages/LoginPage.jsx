


import React, { useState } from 'react'
import { useLogin } from '../hook/authHooks';
import { ErrorComponents } from '../components/content';

const LoginPage = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  }


  return (
    <form onSubmit={handleLogin}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </button>
      {loginMutation.error && <ErrorComponents error={loginMutation.error} />}
    </form>
  )
}

export default LoginPage



