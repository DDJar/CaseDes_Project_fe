import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Fragment } from 'react';
import DefaultLayout from './layouts/DefaultLayout';
import publicRoutes from './router/publicRouter';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
     <Router>
    <Routes>
        {publicRoutes.map((route, index) => {
            let Layout = DefaultLayout;
            if (route.Layout) {
                Layout = route.Layout;
            } else if (route.Layout === null) {
                Layout = Fragment;
            }
            let Page = route.component;
            return (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <Layout>
                            <Page />
                        </Layout>
                    }
                />
            );
        })}
    </Routes>
</Router>
    <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
   
  );
}

export default App;
