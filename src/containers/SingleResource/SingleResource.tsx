import { useParams } from 'react-router-dom';
import DataTable from '../../components/DataTable/DataTable';

const SingleResource = () => {
  const params = useParams();
  return (
    <div>
      <h1 className='pageH1'>{params.name?.replace(/-/g, ' ')}</h1>
      <DataTable sourceName={params.name} from="resource" />;
    </div>
  );
};

export default SingleResource;
