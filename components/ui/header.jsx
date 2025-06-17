import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Button } from './button'
import { checkUser } from '@/lib/checkUser'
import { Calendar, ShieldCheck, Stethoscope, User } from 'lucide-react'
const Header = async () => {
  const user = await checkUser();
  
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-10 supports-[backdrop-filter]:bg-backgorund/60">
        <nav className='container mx-auto px-4 h-16 flex items-center justify-between'>
          <Link href="/">
            <Image src='/Logo2.png' alt="Medicool Logo" width={200} height={600} className="h-10 w-auto object-contain"/>
          </Link>

          <div className='flex items-center space-x-2'>
            
            <SignedIn>
              {user?.role == 'ADMIN' && (
                <Link href="/admin"> 
                  <Button variant="outline" className="hidden md:inline-flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4"/>
                      Admin Dashboard
                  </Button>
                  <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                    <ShieldCheck className='w-4 h-4'/>
                  </Button>
                </Link>
              )}  

              {user?.role == 'DOCTOR' && (
                <Link href="/doctor"> 
                  <Button variant="outline" className="hidden md:inline-flex items-center gap-2">
                    <Stethoscope className="h-4 w-4"/>
                      Doctor Dashboard
                  </Button>
                  <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                    <Stethoscope className='w-4 h-4'/>
                  </Button>
                </Link>
              )}  

              {user?.role == 'PATIENT' && (
                <Link href="/appointments"> 
                  <Button variant="outline" className="hidden md:inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4"/>
                      My Appointments
                  </Button>
                  <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                    <Calendar className='w-4 h-4'/>
                  </Button>
                </Link>
              )}

              {user?.role == 'UNASSIGNED' && (
                <Link href="/onboarding"> 
                  <Button variant="outline" className="hidden md:inline-flex items-center gap-2">
                    <User className="h-4 w-4"/>
                      Complete Profile
                  </Button>
                  <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                    <User className='w-4 h-4'/>
                  </Button>
                </Link>
              )}
            </SignedIn>



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