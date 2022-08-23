import React, { useState } from 'react';
import './index.scss';
import { Header, Navbar } from "./components";

const App = () => {
  const [hideNavbar, setHideNavbar] = useState(false);
  const onBurgerClick = () => setHideNavbar(!hideNavbar);

  return (
    <div>
      <Header onBurgerClick={onBurgerClick}/>
      <Navbar hideNavbar={hideNavbar}/>
    </div>
  );
};

export default App;
