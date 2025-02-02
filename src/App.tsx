import React from 'react';

import { Provider } from 'react-redux';
import { store } from './store/store';
import {  RouterProvider } from 'react-router-dom';
import router from './common/route/route';


function App() {
  return (
    <Provider store={store}>
      
        <RouterProvider router={router} />

      
    
    </Provider>
  );
}

export default App;
