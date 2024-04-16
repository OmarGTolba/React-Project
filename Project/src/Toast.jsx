import React from 'react';
import { toast } from 'react-toastify';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TestToast = () => {
    const notify = () => toast.success("Wow so easy!");
  const handleShowToast = () => {
  };

  return (
    <div>
      <h2>Test Toast Component</h2>
      <button onClick={notify}>Show Toast</button>
    </div>
  );
};

export default TestToast;
