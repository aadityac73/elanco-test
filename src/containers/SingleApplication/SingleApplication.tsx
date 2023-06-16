import { useParams } from 'react-router-dom';
import DataTable from '../../components/DataTable/DataTable';

const SingleApplication = () => {
  const params = useParams();
  return (
    <div>
      <h1 className='pageH1'>{params.name?.replace(/-/g, ' ')}</h1>
      <DataTable sourceName={params.name} from="application" />;
    </div>
  );
};

export default SingleApplication;
