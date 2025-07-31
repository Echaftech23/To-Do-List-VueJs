// Echo configuration for Laravel real-time broadcasting
// Development mode: Uses mock implementation to avoid Pusher errors
// Production mode: Uses real Laravel Echo with Pusher

// Check if we're in development mode (no Pusher credentials)
const isDevelopment = import.meta.env.DEV || !import.meta.env.VITE_PUSHER_APP_KEY

let echo

if (isDevelopment) {
  // Mock Echo implementation for development
  console.log('🔧 Echo: Running in DEVELOPMENT mode (mock implementation)')

  echo = {
    private: (channelName) => {
      console.log(`🔧 Mock Echo: Created private channel "${channelName}"`)
      return {
        listen: (eventName) => {
          console.log(`🔧 Mock Echo: Listening to "${eventName}" on "${channelName}"`)
          return {
            stopListening: () => console.log(`🔧 Mock Echo: Stopped listening to "${eventName}"`),
          }
        },
      }
    },
    leaveChannel: (channelName) => {
      console.log(`🔧 Mock Echo: Left channel "${channelName}"`)
    },
    disconnect: () => {
      console.log(`🔧 Mock Echo: Disconnected`)
    },
  }
} else {
  // This will only run in production when VITE_PUSHER_APP_KEY is set
  console.log('🔴 Echo: Running in PRODUCTION mode (real Pusher)')

  // Dynamic imports only in production
  try {
    const Echo = (await import('laravel-echo')).default
    const Pusher = (await import('pusher-js')).default

    window.Pusher = Pusher

    echo = new Echo({
      broadcaster: 'pusher',
      key: import.meta.env.VITE_PUSHER_APP_KEY,
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER || 'mt1',
      forceTLS: true,
      disableStats: true, // Disable stats for development
      wsHost: import.meta.env.VITE_PUSHER_HOST || window.location.hostname,
      wsPort: import.meta.env.VITE_PUSHER_PORT || 6001,
      wssPort: import.meta.env.VITE_PUSHER_PORT || 6001,
      authEndpoint: `${import.meta.env.VITE_API_URL}/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    })

    console.log('✅ Real Echo initialized successfully')
  } catch (error) {
    console.error('❌ Failed to initialize real Echo:', error)
    // Fallback to mock implementation
    echo = {
      private: () => ({ listen: () => ({ stopListening: () => {} }) }),
      leaveChannel: () => {},
      disconnect: () => {},
    }
  }
}

export default echo
