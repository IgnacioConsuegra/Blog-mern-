import { useState } from "react"

export default function LoginPage(){
  const [username, setUsername] = useState("");
  const [password, setPasword] = useState("")
  return(
    <form className="login">
      <input type="text" placeholder="username"/>
      <input type="password" placeholder="password"/>
      <button>Login</button>
    </form>
  )
}