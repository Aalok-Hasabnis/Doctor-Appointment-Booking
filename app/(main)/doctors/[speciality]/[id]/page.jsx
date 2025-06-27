import { getAvailableTimeSlots, getDoctorById } from '@/actions/appointments';
import { redirect } from 'next/navigation';
import React from 'react'
import DoctorProfile from './_components/doctor-profile';

const DoctorProfilePage = async ({ params }) => {

    const { id } = await params;    
    
    try {
        const [ doctorData, slotsData ] = await Promise.all([
            getDoctorById(id),
            getAvailableTimeSlots(id),
        ]);


        return <DoctorProfile/>

    } catch(error) {
        console.error("Error Loading Doctors Page");
        redirect("/doctors");
    }
}

export default DoctorProfilePage