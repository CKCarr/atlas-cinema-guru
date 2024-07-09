import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './WireframeWrapper.css';

const setDepthBorders = (element, depth = 1) => {
  if (!element) return;

  element.classList.add(`depth-${depth}`);
  Array.from(element.children).forEach(child => {
    if (child.tagName.toLowerCase() === 'div') {
      setDepthBorders(child, depth + 1);
    }
  });
};

const WireframeWrapper = ({ children }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    setDepthBorders(wrapperRef.current);
  }, []);

  return (
    <div ref={wrapperRef}>
      {children}
    </div>
  );
};

WireframeWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WireframeWrapper;
