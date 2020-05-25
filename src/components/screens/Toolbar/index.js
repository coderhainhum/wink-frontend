import React from 'react';
import './Toolbar.css';

export default function Toolbar(props) {
    const { title } = props;
    return (
      <div className="toolbar">
        <div className="left-items"><i className="material-icons toolbar-button">settings</i></div>
        <h1 className="toolbar-title">{ title }</h1>
        <div className="right-items"><i className="material-icons toolbar-button">add</i></div>
      </div>
    );
}