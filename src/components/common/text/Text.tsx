import React from 'react';

import './Text.scss';

interface TextProps {
  text: string
}

export default function Text({text}: TextProps) {
  return (
    <p className="text">{text}</p>
  );
}
