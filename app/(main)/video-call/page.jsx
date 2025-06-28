import React from 'react'
import VideoCall from './video-call';

const VideoCallPage = async ({ searchParams }) => {

  const { sessionId, token } = await searchParams;

  return (
      <VideoCall sessionId={sessionId} token={token} />
  )
}

export default VideoCallPage