import { Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import ClassSchedule from './components/ClassSchedule';
import Main from './components/Main';
import { pageRoutes } from './routes';
import Navbar from './components/Navbar';
import { PrivateRoutes } from './components/PrivateRoutes';

function App() {
  return (
    <div className="App">
      <Navbar>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Main />} />
            <Route
              path={pageRoutes.schedule}
              element={<ClassSchedule />}
              exact
            />
          </Route>

          <Route path={pageRoutes.auth} element={<Auth />} exact />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </Navbar>
    </div>
  );
}

export default App;
