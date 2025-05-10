

import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import  { useState } from 'react'
import { useLogin } from '../hook/authHooks';
import { ErrorComponents } from '../components/content';
import { InlineIcon } from "@iconify/react"

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  }

  if (loginMutation.isError) {
    return <div className='text-red-500 text-sm flex justify-center items-center'>{
      <ErrorComponents error={loginMutation.error} />
    }</div>
  }

  return (
    <div className="grid place-items-center h-full px-5">
      <Card className="w-full sm:w-[550px]">
        <CardHeader>
          <CardTitle className={"text-[30px] font-bold"}>Login</CardTitle>
          <CardDescription>Welcome back please enter your details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="flex flex-col gap-2">
            <Label  htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
            {loginMutation.error?.response.data.detail.map(e=>{return e.loc[1] === "email" ? <p className="text-red-500">{e.msg}</p> : null})}

            <Label className={"mt-3"} htmlFor="password">Password</Label>
            <Input
            className={``}
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            {loginMutation.error?.response.data.detail.map(e=>{return e.loc[1] === "password" ? <p className="text-red-500">{e.msg}</p> : null})}

            <Button type="submit" className={"mt-8 cursor-pointer"} disabled={loginMutation.isPending}>
              {loginMutation.isPending ? <InlineIcon icon={"svg-spinners:180-ring"}/>
              : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage



