import { getCurrentUser } from '@/actions/onboarding';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata = {
  title: "Onboarding - MediConnect",
  description: "Complete the profile to get started with the application",
};

const OnboardingLayout = async ({ children }) => {
  const user = await getCurrentUser();
  if(user) {
    if(user.role==="PATIENT") {
      redirect('/doctors');
    } else if(user.role==="DOCTOR") {
        if(user.verificationStatus==="VERIFIED") {
          redirect('/doctors');
        } else {
          redirect('/doctor/verification');
        }
    } else {
      if(user.role==="ADMIN") {
        redirect('/admin');
      }
    }
  }

  return (
  <div className='pt-20 container mx-auto px-4 py-20'>
    <div className='max-w-3xl mx-auto'>
      <div className='text-center mb-10'>
        <h1 className='text-3xl md:text-4xl mb-2 gradient-title'>Welcome to MediConnect</h1>
        <p className='text-muted-foreground text-lg'>Tell us how you want to use the platform</p>
      </div>
      {children}
    </div>
  </div>
  );
};

export default OnboardingLayout;
