import DataTable from '../../components/DataTable/DataTable';

const Homepage = () => {
  return (
    <div>
      <h1 className='pageH1'>All Instances</h1>
      <DataTable from="home" sourceName="" />;
    </div>
  );
};

export default Homepage;
