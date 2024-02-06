import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import styles from './Layout.module.css';
import SideBar from '../components/SideBar/SideBar';
import { useState } from 'react';

const MainLayout = () => {
  const [sidebar, setSidebar] = useState<boolean>(true);
  const handleSidebar = () => {
    setSidebar((prev) => !prev);
  };
  return (
    <>
      <Header sidebar={sidebar} handleSidebar={handleSidebar} />
      <div className={!sidebar ? `${styles.mainContainer} ${styles.sidebar_closed}` : styles.mainContainer}>
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
