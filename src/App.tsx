import React, { useState } from 'react';
import './index.scss';
import { Header, Navbar, Notes } from "./components";

const App = () => {
  const [hideNavbar, setHideNavbar] = useState(false);
  const onBurgerClick = () => setHideNavbar(!hideNavbar);

  return (
    <div>
      <Header onBurgerClick={onBurgerClick}/>
      <main className='main'>
        <Navbar hideNavbar={hideNavbar}/>
        <Notes/>
      </main>
    </div>
  );
};

export default App;
