import { Link } from 'react-router-dom';
import styles from './AppsGrid.module.css';

interface AppsGridProps {
  data: {
    [name:string]: {
      count: number
    }
  };
  apiUrl: string;
}
const AppGrid: React.FC<AppsGridProps> = ({ data, apiUrl }) => {
  return (
    <div className={styles.appsContainer}>
      {Object.keys(data).map((item, idx) => {
        return (
          <div key={item} className={styles.cardContainer}>
            <div className={styles.appCard}>
              <span title={item} className={styles.appTitle}>
                {item?.substring(0,26)}{item?.length > 26 ? '...' : ''}{` (${data[item].count})`}
              </span>
              <Link
                className={styles.appBtn}
                key={idx}
                to={`${apiUrl}/${item}`}
              >
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
