"use client";

import { useParams } from 'next/navigation';
import React from 'react';

const SpecialityPage = () => {
    const {speciality} = useParams();
    return <div>SpecialityPage : {speciality} </div>
}

export default SpecialityPage;