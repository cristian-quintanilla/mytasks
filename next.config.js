/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY: 'AIzaSyDRq1qNSDvVMOOc96ClJnq0H4e_45-9f-0',
    AUTH_DOMAIN: 'mytasks-26a0a.firebaseapp.com',
    DATABASE_URL: 'https://mytasks-26a0a-default-rtdb.firebaseio.com',
    PROJECT_ID: 'mytasks-26a0a',
    STORAGE_BUCKET: 'mytasks-26a0a.appspot.com',
    MESSAGING_SENDER_ID: '858220320397',
    APP_ID: '1:858220320397:web:7762fdca34810b2a89f4c4',
	}
}

module.exports = nextConfig
