import { useState, useEffect } from 'react';
import styles from './SideBar.module.css';
import api from '../../main-app/http/api';
import { Link, useParams } from 'react-router-dom';

const SideBar = () => {
  const [resources, setResources] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    const getApps = async () => {
      setLoading(true);
      const res = await api.getResources();
      if (res.isError) {
        setLoading(false);
        console.log(res?.getError());
      } else {
        setLoading(false);
        setResources(res?.getValue());
      }
    };
    getApps();
  }, []);
  return (
    <div className={styles.sidebarContainer}>
      {loading ? (
        <></>
      ) : (
        <ul className={styles.sidebarList}>
          <li
            className={
              params?.resource == '' || !params.resource
                ? `${styles.selected} ${styles.link}`
                : styles.link
            }
          >
            <Link reloadDocument to={`/applications/${params.name}`}>
              Dashboard
            </Link>
          </li>
          <span className={styles.menuTitle}>Resources</span>
          {resources.map((item) => {
            return (
              <li
                className={
                  params?.resource == item
                    ? `${styles.selected} ${styles.link}`
                    : styles.link
                }
              >
                <Link
                  reloadDocument
                  to={`/applications/${params.name}/${item}`}
                  key={item}
                >
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SideBar;
