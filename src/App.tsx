import React, { useState } from 'react';
import './index.scss';
import { Header, Navbar, Notes } from "./components";

const App = () => {
  const [hideNavbar, setHideNavbar] = useState(false);
  const [isNoteListColumn, setIsNoteListColumn] = useState(false);

  const onBurgerClick = () => setHideNavbar(!hideNavbar);
  const onGridIconClick = () => setIsNoteListColumn(!isNoteListColumn);

  return (
    <div>
      <Header
        onBurgerClick={onBurgerClick}
        isNoteListColumn={isNoteListColumn}
        onGridIconClick={onGridIconClick}
      />
      <main className="main">
        <Navbar
          hideNavbar={hideNavbar}
        />
        <Notes
          isNoteListColumn={isNoteListColumn}
        />
      </main>
    </div>
  );
};

export default App;
