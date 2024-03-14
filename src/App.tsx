import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import Layout from './components/Layout';

function App() {
  return (
    <>
      <h1>Trybetunes</h1>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/" element={ <Layout /> }>
          <Route path="/search" element={ <Search /> } />
          <Route path="/album/:id" element={ <Album /> } />
          <Route path="/favorites" element={ <Favorites /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/*" element={ <NotFound /> } />
        </Route>
      </Routes>
    </>
  );
}

export default App;
