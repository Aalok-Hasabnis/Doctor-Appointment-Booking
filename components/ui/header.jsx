import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Button } from './button'
import { checkUser } from '@/lib/checkUser'
const Header = async () => {
  const user = await checkUser();
  
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-10">
        <nav className='container mx-auto px-4 h-16 flex items-center justify-between'>
          <Link href="/">
            <Image src='/Logo2.png' alt="Medicool Logo" width={200} height={600} className="h-10 w-auto object-contain"/>
          </Link>

          <div className='flex items-center space-x-2'>
            <SignedOut>
              <SignInButton>
                <Button variant="secondary"> Sign in </Button>
              </SignInButton>
            </SignedOut>
            
            <SignedIn>
              <UserButton 
                appearance={{
                  elements:{
                    avatarBox: "w-10 h -10",
                    userButtonPopoverActionCard: "shadow-xl",
                    userPreviewMainIdentifier: "font semibold"
                  }
                }}
              />
            </SignedIn>
          </div>
        </nav>
    </header>
  )
}

export default Header