import React from 'react';
import { createRoot } from 'react-dom';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const root = createRoot(document.getElementById('root'));
root.render(
  <ClerkProvider publishableKey={process.env.REACT_APP_CLERK_PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
);
