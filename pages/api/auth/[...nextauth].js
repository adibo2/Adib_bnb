import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import GoogleProvider from "next-auth/providers/google"
import clientPromise from "../../../lib/mongodb"


export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: "701235870925-t7j8fje2go2brneuehtneeko61p35g5t.apps.googleusercontent.com",
      clientSecret: "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 ",
    }),
  ],
  secret: process.env.JWT_SECRET, 
  

  
})