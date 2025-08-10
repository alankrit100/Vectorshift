import React from 'react';
import { PipelineUI } from './ui';
import { PipelineToolbar } from './toolbar'; // This will now be our header
import { SubmitButton } from './submit';

// URL for a high-quality, abstract background that matches the theme.
const backgroundUrl = "https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2070&auto=format&fit=crop";

const appStyle = {
  // Use the background image and style it to cover the whole page
  backgroundImage: `url(${backgroundUrl})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',

  // Use flexbox to create the header-content-footer layout
  display: 'flex',
  flexDirection: 'column',
  height: '100vh', // Take up the full viewport height
  overflow: 'hidden', // Prevent all scrolling
  fontFamily: "'Inter', sans-serif", // Set a modern, clean font for the whole app
};

const mainContentStyle = {
  flexGrow: 1, // Allow the pipeline UI to take up all available space
  position: 'relative', // Needed for positioning child elements like the submit button
};

function App() {
  return (
    <div style={appStyle}>
      <PipelineToolbar />
      <main style={mainContentStyle}>
        <PipelineUI />
        <SubmitButton />
      </main>
    </div>
  );
}

export default App;