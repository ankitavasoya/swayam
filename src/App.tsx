import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from 'react-redux';
import store from "./redux/store";
import { ToastContainer } from 'react-toastify';
import { Helmet } from "react-helmet";
import { log } from "console";
import NavbarModel from "./components/modals/NavbarModel";
import { useState } from "react";
// import "./App.css"; 

function App() {
  const [navBar, setNavBar] = useState(false)

  const handleClick = () => {
    setNavBar(false)
  }

  document.body.addEventListener('click', handleClick);

  return (
    <div>
      <Helmet>
        <title>App Title</title>
      </Helmet>
      <Provider store={store}>
        <ToastContainer />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
