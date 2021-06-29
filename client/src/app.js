import React from 'react';
import Header from './components/common/header';
// import Footer from './components/common/footer';
import Routes from './components/routes';
import AuthProvider from './authContext';

function App() {
  return(
    <div className="appContainer">
      
      <AuthProvider>
          <Header/>
          <Routes/>
          {/* <Footer/> */}
      </AuthProvider>
    </div>
  );
}
export default App;
