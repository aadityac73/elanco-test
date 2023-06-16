import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api, { RawData } from '../../main-app/http/api';
import AppGrid from '../../components/AppsGrid/AppsGrid';
import Loader from '../../components/Loader/Loader';

interface TypeAcc {
  [name: string]: {
    count: number;
  };
}

const SingleApplication = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await api.getApplicationData(params.name || 'Macao');
      if (res.isError) {
        setLoading(false);
        console.log(res?.getError());
      } else {
        setLoading(false);
        setData(() => {
          return res?.getValue().reduce((acc: TypeAcc, item: RawData) => {
            if (acc[item?.ServiceName || 'Resource']) {
              acc[item?.ServiceName || 'Resource'].count += 1;
            } else {
              acc[item?.ServiceName || 'Resource'] = { count: 1 };
            }
            return acc;
          }, {});
        });
      }
    };
    getData();
  }, []);

  return (
    <div>
      <h1 className="pageH1">Resources</h1>
      {loading ? (
        <Loader />
      ) : (
        <AppGrid data={data} apiUrl={`/applications/${params.name}`} />
      )}
    </div>
  );
};

export default SingleApplication;
