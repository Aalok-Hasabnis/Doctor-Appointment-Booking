import{ PageHeader } from '@/components/page-header';
import { Stethoscope } from 'lucide-react';
import React from 'react'

export const MetaData = {
    title: "Doctor DashBoard - MediConnect",
    description: "Manage your appointment and avialability",
};

const DoctorDashboardLayout = ({children}) => {
  return (
    <div>
        <PageHeader icon={<Stethoscope/>} title={"Doctor DashBoard"}/>
        {children}
    </div>
  );
}

export default DoctorDashboardLayout;