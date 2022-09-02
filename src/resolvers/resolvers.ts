import * as bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const JWTSECRET = process.env.JWTSECRET ?? ''
const users : {id:number, account:string, password:string, name: string, birthday: string}[]=[
  {
    id:1,
    account: "tina",
    password: "$2a$10$Nx3lzPbLtZq78Cf5z2zI/et3jLkJakBLjj8HyZbp5lC.yQ7Vypu1S",
    name: "Tina",
    birthday: "01/23"
  }
]
const saltRounds = 10

interface User{
    id:number,
    iat:number
}
const resolvers = {
  Query: {
    createUser: async(parent: any, args: {userInput:{account:string, password:string, name: string, birthday: string}}, context: any, info: any) => {
      const { account, password,name,birthday } = args.userInput 
      let idCount = users.length + 1  
      let pwdHash = await bcrypt.hash(password,saltRounds)
      const user = {
        "id": idCount,
        "account": account,
        "password": pwdHash,
        "name": name,
        "birthday": birthday,
      }
      users.push(user)
      return user
    },
    getUsers: async(parent: any, args: any, context: any, info: any) => {
      return users
    },
    login: async(parent: any, args: {loginInput:{account:string, password:string}}, context: any, info: any) => {
      const { account, password } = args.loginInput;  
      if(account===""||password==="") return {message:"Please make sure all fields are valid"};
      const userPwd = users.find(user=>user.account===account)?.password
      const userId = users.find(user=>user.account===account)?.id
      if(userPwd){
        const isVerified = await bcrypt.compare( password, userPwd)
        if(isVerified){
          const message:string="login Sucessfully"
          const userData = {
            id: userId
          }
          const token = jwt.sign(userData, JWTSECRET)
          return {message:message, token:token}
        }
        else{
          const message:string="The password is wrong, Please try again"
          return {message:message}
        }
      }
      else{
        const message:string="The account is wrong, Please try again";
        return {message:message}
      }
      
    },
    me: async(parent: any, args: {userInput:{account:string, password:string, name: string, birthday: string}}, context: {auth:string}, info: any) => {
      const auth = context.auth
      if(auth==='')return {message: "There is no token"}
      const userVerify = jwt.verify(auth, JWTSECRET) as User
      if(userVerify){
        const idx = users.findIndex(u=>u.id==userVerify.id)
        const user = users[idx]
        return user
      }
    },
  }
}

export default resolvers
  