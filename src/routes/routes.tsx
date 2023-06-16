import Applications from '../containers/Applications/Applications';
import Homepage from '../containers/Homepage/Homepage';
import Resources from '../containers/Resources/Resources';
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
    index: true,
    element: <Homepage />,
    path: '/'
  },
  {
    id: 2,
    path: 'applications',
    element: <Applications />
  },
  {
    id: 3,
    path: 'resources',
    element: <Resources />
  },
  {
    id: 4,
    path: 'applications/:name',
    element: <SingleApplication />
  },
  {
    id: 5,
    path: 'resources/:name',
    element: <SingleResource />
  }
];

export default routes;
