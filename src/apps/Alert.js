import React from 'react';

function Alert({ message, type }) {
  // Define Tailwind CSS classes based on the alert type
  let alertClasses = 'px-4 py-2';

  if (type === 'success') {
    alertClasses += ' bg-green-400 text-white';
  } else if (type === 'error') {
    alertClasses += ' bg-red-400 text-white';
  }

  return (
    <div className={alertClasses}>
      {message}
    </div>
  );
}

export default Alert;
