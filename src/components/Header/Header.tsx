import { Link, NavLink, useParams } from 'react-router-dom';
import styles from './Header.module.css';
import { useState, useEffect } from 'react';
import api from '../../main-app/http/api';
// interface NavType {
//   id: number;
//   name: string;
//   route: string;
//   classes?: string;
// }

// const navItems: NavType[] = [
//   {
//     id: 1,
//     name: 'Elanco',
//     route: '/',
//     classes: `${styles.logo} ${styles.item}`
//   },
//   {
//     id: 2,
//     name: 'Home',
//     route: '/',
//     classes: styles.item
//   },
//   {
//     id: 3,
//     name: 'Applications',
//     route: '/applications',
//     classes: styles.item
//   },
//   {
//     id: 4,
//     name: 'Resources',
//     route: '/resources',
//     classes: styles.item
//   }
// ];

interface DialogProps {
  handleClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({ handleClose }) => {
  const [appsData, setAppsData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getApps = async () => {
      setLoading(true);
      const res = await api.getApplications();
      if (res.isError) {
        setLoading(false);
        console.log(res?.getError());
      } else {
        setLoading(false);
        setAppsData(res?.getValue());
      }
    };
    getApps();
  }, []);
  return (
    <>
      <div className={styles.dialog}>
        <div onClick={handleClose} className={styles.dialogBackdrop}></div>
        <div className={styles.dialogContainer}>
          <span className={styles.closeBtn} onClick={handleClose}>
            X
          </span>
          <div className={styles.dialogData}>
            {loading ? (
              <></>
            ) : (
              <ul className={styles.dialogList}>
                <li>Application Name</li>
                {appsData.map((item) => {
                  return (
                    <li key={item}>
                      <Link to={`/applications/${item}`} reloadDocument>
                        {'# '}
                        {item}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const Header: React.FC = () => {
  const [dialog, setDialog] = useState(false);
  const openDialog = () => {
    setDialog(true);
  };
  const closeDialog = () => {
    setDialog(false);
  };
  const params = useParams();
  return (
    <>
      <header className={styles.header}>
        <div className={styles['nav-container']}>
          <ul className={styles.nav}>
            <li className={`${styles.logo} ${styles.item}`}>
              <NavLink to={'/'}>Elanco</NavLink>
            </li>
            <li className={styles.appsBtn}>
              <button onClick={openDialog}>
                {params?.name ? params.name : 'Macao'}
              </button>
            </li>
          </ul>
        </div>
      </header>
      {dialog && <Dialog handleClose={closeDialog} />}
    </>
  );
};

export default Header;
