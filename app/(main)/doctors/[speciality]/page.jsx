import { getDoctors } from '@/actions/doctors-listing';
import { PageHeader } from '@/components/page-header';
import DoctorCard from '@/components/ui/doctor-card';
import { redirect } from 'next/navigation';
import React from 'react'

const SpecialityPage = async ({ params }) => {
    const { speciality } = await params;

    if(!speciality) {
        redirect("/doctors");
    }

    try {
        const { doctors, error } = await getDoctors(speciality);

        if(error) {
            console.error("Error Fetching Doctor", error);
        }
        
        return (
            <div className='space-y-5'>
                <PageHeader
                    title={speciality.split("%20").join(" ")}
                    backLink='/doctors'
                    backLabel='All Specialities'
                />
                {doctors && doctors.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {doctors.map(doctor => (
                            <DoctorCard key={doctor.id} doctor={doctor}/>
                        ))}
                    </div>
                ) : (
                    <div className='text-center py-12'>
                        <h3 className='text-xl font-medium text-white mb-2'>No Doctors Available</h3>
                        <p className='text-muted-foreground'>There are no doctors which are verified. Please check later or choose another speciality</p>
                    </div>
                )}
            </div>
        )
    } catch(error) {
        console.error("Error fetching doctors:", error);
        return (
            <div className='space-y-5'>
                <PageHeader
                    title={speciality.split("%20").join(" ")}
                    backLink='/doctors'
                    backLabel='All Specialities'
                />
                <div className='text-center py-12'>
                    <h3 className='text-xl font-medium text-white mb-2'>Error Loading Doctors</h3>
                    <p className='text-muted-foreground'>Something went wrong. Please try again later.</p>
                </div>
            </div>
        )
    }
}

export default SpecialityPage;