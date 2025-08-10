import React, { useState, useMemo, useRef, useLayoutEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode'; // We continue to use our BaseNode for consistent styling

// --- Helper Function ---
// A simple regex to find all instances of {{variable}} in the text.
// It looks for valid JavaScript variable names inside the curly brackets.
const findVariables = (text) => {
  const regex = /{{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*}}/g;
  const matches = [...text.matchAll(regex)];
  // Use a Set to automatically handle duplicates, then convert back to an array
  const uniqueVars = [...new Set(matches.map(match => match[1]))];
  return uniqueVars;
};


export const TextNode = ({ id, data }) => {
  // --- STATE MANAGEMENT ---

  // State for the text content of the textarea
  const [currText, setCurrText] = useState(data?.text || 'Hello {{name}}! Type here.');
  
  // State to hold the array of extracted variable names (e.g., ['name'])
  const [variables, setVariables] = useState(() => findVariables(currText));
  
  // A ref to access the textarea DOM element for height calculation
  const textareaRef = useRef(null);


  // --- DYNAMIC HANDLES LOGIC ---

  // `useMemo` is used for performance. This code only re-runs when the `variables` array changes.
  // It creates the configuration for all handles on the node.
  const allHandles = useMemo(() => {
    // Create a dynamic "target" handle for each variable found in the text
    const dynamicHandles = variables.map((variable, index) => ({
      type: 'target',
      position: Position.Left,
      id: variable, // The variable name is the unique ID for the handle
      // This formula distributes the handles evenly along the left side
      top: `${(index + 1) * 100 / (variables.length + 1)}%`, 
    }));

    // The static "source" handle that is always present on the right side
    const staticHandle = {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`,
    };

    return [...dynamicHandles, staticHandle];
  }, [variables, id]); // Dependencies: re-run only if these change


  // --- AUTO-RESIZING TEXTAREA LOGIC ---

  // This effect runs after the component renders but before the screen is painted.
  // It's perfect for DOM measurements and adjustments to avoid visual flickering.
  useLayoutEffect(() => {
    if (textareaRef.current) {
      // Temporarily set height to 'auto' to allow the textarea to shrink if text is deleted
      textareaRef.current.style.height = 'auto';
      // Set the height to the scrollHeight to fit the content perfectly
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]); // Dependency: re-run this logic every time the text changes


  // --- EVENT HANDLER ---

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    // On every change, re-parse the text to find the current variables
    setVariables(findVariables(newText));
  };


  // --- RENDER ---

  const textareaStyle = {
    width: '100%',
    padding: '8px',
    marginTop: '4px',
    borderRadius: '4px',
    border: '1px solid #d1d5db',
    boxSizing: 'border-box',
    resize: 'none', // Disable manual resizing by the user
    overflow: 'hidden', // Hide the scrollbar
    fontFamily: 'inherit',
    fontSize: 'inherit',
  };

  return (
    // We pass our dynamically generated handles to the BaseNode
    <BaseNode title="Text" icon={'📝'} handles={allHandles} borderColor="#10B981">
      <label style={{display: 'block', fontWeight: 500}}>
        Text
        <textarea
          ref={textareaRef}
          style={textareaStyle}
          value={currText}
          onChange={handleTextChange}
          rows={1} // Start with a single row
        />
      </label>
    </BaseNode>
  );
};
