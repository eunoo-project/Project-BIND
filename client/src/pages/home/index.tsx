import { Button, A11yHidden } from '@/components';
import styles from './Home.module.css';
import { a } from '@/utils';

a();

const Home = () => {
  return (
    <div className={styles.container}>
      <Button />
    </div>
  );
};

export default Home;
