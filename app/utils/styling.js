/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { getDisplayName } from './react';

/**
 * HOC which injects `theme` prop into decorated component
 *
 * @param {Object} styles
 * @returns {function(*): function(*)}
 */
export const withStyles = styles => (Cmp) => {
  const hoc = (props) => {
    const newProps = { ...props, styles };

    return (<Cmp {...newProps} />);
  };

  hoc.displayName = `WithStyles(${getDisplayName(Cmp)})`;

  return hoc;
};
