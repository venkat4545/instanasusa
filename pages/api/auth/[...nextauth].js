import { Session } from "inspector"
import NextAuth from "next-auth"
import googleProvider from "next-auth/providers/google"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    googleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.GOOGLE_CLIENT_SECRET,
  pages:{
    signIn:"/auth/signin",
  },
  callbacks:{
    async session({session,token,user}){
      session.user.username=session.user.name.split(' ').join("").toLocaleLowerCase
      //saai venkat
      //saaivenkat

      session.user.uid=token.sub;
      return session;
    }
  }
 // theme:{
   // logo:"https:/links.papareact.com/sq0",
    //brandColor: "#F13287",
    //colorScheme: "auto",
  //},
})