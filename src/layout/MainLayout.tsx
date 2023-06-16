import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import styles from './Layout.module.css';
import SideBar from '../components/SideBar/SideBar';

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.sideBar}>
          <SideBar />
        </div>
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
