"use client"

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import React, { useRef, useState } from 'react'
import { toast } from 'sonner';

const VideoCall = ( sessionId, token) => {

    const [isLoading, setIsLoading] = useState(true);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);

    const sessionRef = useRef(null);
    const publisherRef = useRef(null);

    const router = useRouter();

    const appId = process.env.NEXT_PUBLIC_VONAGE_APPLICATION_ID;

    const handleScriptLoad = () => {
        setScriptLoaded(true);
        if (!window.OT) {  //OT OpenTok
            toast.error("Failed to load Vonage Video API");
            setIsLoading(false);
            return;
        }
        initializeSession();
    };

    const initializeSession = () => {};

    if(!sessionId || !token || !appId) {
        return (
            <div className='container mx-auto px-4 py-12 text-center'>
                <h1 className='text-3xl font-bold text-white mb-4'>
                    Invalid Video Call
                </h1>
                <p className='text-muted-foreground mb-6'>
                    Missing required parameters for the video call
                </p>
                <Button
                    onClick={() => router.push("/appointments")}
                    className="bg-emerald-600 hover:bg-emerald-700"
                    >
                    Back to Appointments
                </Button>
            </div>
        )
    };
    
    return (
        <>
        <Script
            src="https://unpkg.com/@vonage/client-sdk-video@latest/dist/js/opentok.js"
            onLoad={handleScriptLoad}
            onError={() => {
                toast.error("Failed to load video call script");
                setIsLoading(false);   
            }}
        />
        <div className='container mx-auto px-4 py-8'>
            <div className='text-center mb-6'>
                <h1 className='text-3xl font-bold text-white mb-2'>
                    Video Consultation
                </h1>
                <p className='text-muted-foreground'>
                    {isConnected
                        ? "Connected"
                        : isLoading
                        ? "Connecting..."
                        : "Connection Failed"}
                </p>
            </div>
        </div>
        </>
    )
}

export default VideoCall;