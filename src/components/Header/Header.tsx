import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

interface NavType {
  id: number;
  name: string;
  route: string;
  classes?: string;
}

const navItems: NavType[] = [
  {
    id: 1,
    name: 'Elanco',
    route: '/',
    classes: `${styles.logo} ${styles.item}`
  },
  {
    id: 2,
    name: 'Home',
    route: '/',
    classes: styles.item
  },
  {
    id: 3,
    name: 'Applications',
    route: '/applications',
    classes: styles.item
  },
  {
    id: 4,
    name: 'Resources',
    route: '/resources',
    classes: styles.item
  }
];

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles['nav-container']}>
        <ul className={styles.nav}>
          {navItems.map((item) => {
            return (
              <li key={item.id} className={item.classes}>
                <NavLink
                  key={item.id}
                  className={({ isActive }) =>
                    isActive && item.id != 1 ? styles.active : ''
                  }
                  to={item.route}
                >
                  {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default Header;
