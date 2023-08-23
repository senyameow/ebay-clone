'use client'
import Link from 'next/link'
import React from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Auth } from '@supabase/auth-ui-react'
import {
  ThemeSupa,
} from '@supabase/auth-ui-shared'

const AuthPage = () => {

  const supabase = createClientComponentClient()

  return (
    <div id='AuthPage' className='max-w-[1200px] mx-auto min-h-screen p-5 bg-white'>
      <div className='min-w-[500px] w-full flex flex-col gap-5 items-center justify-center'>
        <Link href={'/'} className='min-w-[170px]'>
          <img src='/images/logo.svg' alt="logo" className='w-[220px]' />
        </Link>

        <div className='flex items-center justify-center w-full text-xl font-semibold pb-6'>
          Register / Login
        </div>

        <div className='max-w-[400px] w-full mx-auto px-2'>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google']}
            onlyThirdPartyProviders

          />
        </div>

      </div>
    </div>
  )
}

export default AuthPage