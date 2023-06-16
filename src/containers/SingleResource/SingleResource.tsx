import { useParams } from 'react-router-dom';
import DataTable from '../../components/DataTable/DataTable';

const SingleResource = () => {
  const params = useParams();
  return (
    <div>
      <h1 className='pageH1'>{params.resource}</h1>
      <DataTable applicationName={params.name} resourceName={params.resource} from='application' />
    </div>
  );
};

export default SingleResource;
