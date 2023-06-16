import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import routes from './routes/routes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {routes.map(({ id, ...rest }) => (
          <Route key={id} {...rest} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
