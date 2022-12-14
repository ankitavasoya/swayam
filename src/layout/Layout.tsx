import { FC, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import $ from "jquery";
interface Props {
  // any props that come into the component
}
const Layout: FC<Props> = ({ children, ...props }) => {

  const [top, setTop] = useState(false);
  useEffect(() => {
    $(document).ready(function () {
      $(window).scrollTop(0);
    });
  }, [children, top]);


  return (
    <>
      <div className="main-page">
        <div className="px-0">
          <Header />
          <div className="" {...props}>{children}</div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
