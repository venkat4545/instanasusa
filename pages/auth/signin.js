import React from 'react'
import Header from '../../components/Header'
import {getProviders,signIn as SignIntoProvider} from 'next-auth/react'
function signIn({providers}) {
  return (
    <>

<div>
  <img className='w-50 h-40 mt-16 ml-52' src="https://links.papareact.com/OCW" alt=''/>
</div>
{Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button className=' ml-64 mt-24 cursor-pointer p-3 bg-blue-600 mb-10 rounded-lg text-white' onClick={() => SignIntoProvider(provider.id,{callbackUrl: "/"})}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );

}

//server side
export async function getServerSideProps(){
  const providers= await getProviders();
  
  
  return {
    props:{
      providers,
    },
  };
}
export default signIn