import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Header from './components/Header';
import PageInfo from './components/PageInfo';
import HomePage from './components/HomePage';
import NoCurrentProjectUi from './app/features/project/NoCurrentProjectUi';
import './App.css';
import NoMatchPage from './components/common/NoMatchPageUi';


function App() {
  return (
   <>
   <Header />
      <Routes>
        <Route path='/project' element={<HomePage />}>
        //for showing ui if there is no current project selected --------
          <Route path='' element={<NoCurrentProjectUi />} />
         <Route path='/project/:id' element={<PageInfo />} />
        </Route>
        <Route path='*' element={<NoMatchPage />}/>
      </Routes>
   </>
  )
}

export default App;