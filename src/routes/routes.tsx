import Homepage from '../containers/Homepage/Homepage';
import SingleApplication from '../containers/SingleApplication/SingleApplication';
import SingleResource from '../containers/SingleResource/SingleResource';

interface RouteType {
  id: number;
  index?: boolean;
  element: any;
  path: string;
}

const routes: RouteType[] = [
  {
    id: 1,
    element: <Homepage />,
    path: '/'
  },
  {
    id: 4,
    path: 'applications/:name',
    element: <SingleApplication />,
    index: true
  },
  {
    id: 5,
    path: 'applications/:name/:resource',
    element: <SingleResource />
  }
];

export default routes;
