import { NavLink, Navigate, useLocation, useParams } from 'react-router-dom';
import styles from './Header.module.css';
import { useState, useEffect } from 'react';
import api from '../../main-app/http/api';
import Hamburger from '../../icons/Hamburger';
import Search from '../../icons/Search';
import { useDebounce } from '../../hooks/useDebounce';
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
  const location = useLocation();
  const params = useParams();
  const [current, setCurrent] = useState(params.name || '');
  const [navigate, setNavigate] = useState(false);
  const [search, setSearch] = useState<string>('');
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

  const tempData: string[] =
    search.length > 0
      ? appsData.filter((item) => {
          return (
            item.toString().toLowerCase().indexOf(search.toLowerCase()) > -1
          );
        })
      : [];

  useEffect(() => {
    setNavigate(false);
  }, [location]);

  const handleNavigate = () => {
    setNavigate(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const debouncedSearch = useDebounce(handleSearchChange, 500);

  return (
    <>
      {navigate && (
        <Navigate
          to={`/applications/${current}`}
          state={{ from: location }}
          replace
        />
      )}
      <div className={styles.dialog}>
        <div onClick={handleClose} className={styles.dialogBackdrop}></div>
        <div className={styles.dialogContainer}>
          <div className={styles.dialogHeader}>
            <div className={styles.dialogTitle}>
              <span>Select an application </span>
              <span className={styles.closeBtn} onClick={handleClose}>
                X
              </span>
            </div>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search"
                autoFocus
                className={styles.search}
                onChange={debouncedSearch}
              />
              <span className={styles.searchIcon}>
                <Search />
              </span>
            </div>
          </div>
          <div className={styles.dialogData}>
            {loading ? (
              <></>
            ) : (
              <ul className={styles.dialogList}>
                {(search.length > 0 ? tempData : appsData).map((item) => {
                  return (
                    <li
                      onClick={() => setCurrent(item)}
                      className={current === item ? styles.current : ''}
                      key={item}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div className={styles.dialogActions}>
            <button className={styles.cancelBtn} onClick={handleClose}>
              cancel
            </button>
            <button
              disabled={current === params.name}
              className={styles.openBtn}
              onClick={handleNavigate}
            >
              open
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

interface HeaderProps {
  handleSidebar: () => void;
  sidebar: boolean
}

const Header: React.FC<HeaderProps> = ({ handleSidebar, sidebar }) => {
  const [dialog, setDialog] = useState(true);
  const location = useLocation();
  const openDialog = () => {
    setDialog(true);
  };
  const closeDialog = () => {
    setDialog(false);
  };

  useEffect(() => {
    closeDialog();
  }, [location]);
  const params = useParams();
  return (
    <>
      <header className={styles.header}>
        <div className={styles['nav-container']}>
          <ul className={styles.nav}>
            <li title={sidebar ? 'Close Sidebar' : 'Open Sidebar'} onClick={handleSidebar} className={styles.hamburger}>
              <Hamburger />
            </li>
            <li className={`${styles.logo} ${styles.item}`}>
              <NavLink to={'/'}>Elanco</NavLink>
            </li>
            <li className={styles.appsBtn}>
              <button title='Select an Application' onClick={openDialog}>
                {params?.name ? params.name : 'Macao'}&nbsp;
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
