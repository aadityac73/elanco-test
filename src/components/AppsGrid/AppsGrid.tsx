import { Link } from 'react-router-dom';
import styles from './AppsGrid.module.css';

interface AppsGridProps {
  data: {
    [name: string]: {
      count: number;
    };
  };
  apiUrl: string;
}
const AppGrid: React.FC<AppsGridProps> = ({ data, apiUrl }) => {
  return (
    <div className={styles.appsContainer}>
      {Object.keys(data).map((item) => {
        return (
          <div key={item} className={styles.cardContainer}>
            <div className={styles.appCard}>
              <div className={styles.cardTop}>
                <span className={styles.appsCount}>{data[item].count}</span>
                {/* <span title={item} className={styles.appTitle}>
                  {item}
                </span> */}
                <Link
                  title={item}
                  className={styles.appTitle}
                  to={`${apiUrl}/${item}`}
                >
                  {item}
                </Link>
              </div>
              <hr />
              <Link className={styles.appBtn} to={`${apiUrl}/${item}`}>
                <span>View Instances</span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AppGrid;
