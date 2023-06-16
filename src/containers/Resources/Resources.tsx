// import { useState, useEffect } from 'react';
// import api from '../../main-app/http/api';
// import AppGrid from '../../components/AppsGrid/AppsGrid';
// import Loader from '../../components/Loader/Loader';

const Resources = () => {
  // const [appsData, setAppsData] = useState<string[]>([]);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const getApps = async () => {
  //     setLoading(true);
  //     const res = await api.getResources();
  //     if (res.isError) {
  //       setLoading(false);
  //       console.log(res?.getError());
  //     } else {
  //       setLoading(false);
  //       setAppsData(res?.getValue());
  //     }
  //   };
  //   getApps();
  // }, []);
  return (
    <>
      <h1 className="pageH1">All Resources</h1>
      {/* {loading ? <Loader /> : <AppGrid apiUrl="/resources" data={appsData} />} */}
    </>
  );
};

export default Resources;
