import React from "react";

const context = require.context("./modal-types", true, /.jsx$/);

const modules = context.keys().reduce((acc, key) => ({ ...acc, [key]: context(key).default }), {});

export default ({ active, title, type, content }) => {
  if (!active) {
    return null;
  }

  if (!modules.hasOwnProperty(`./${type}.jsx`)) {
    console.warn(`Requested unavailable modal type ${type}`);
    return null;
  }

  const ModalContent = modules[`./${type}.jsx`];

  return (
    <div className='modal is-active'>
      <div className="modal-background"/>
      <div className="modal-card">
        <ModalContent title={title} content={content}/>
      </div>
    </div>
  )
};