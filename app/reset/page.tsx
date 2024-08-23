
import ResetPassword from '@/components/ResetPassword'; 
import styles from '../home.module.css'; 

export default function ResetPasswordPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <ResetPassword />
      </div>
    </main>
  );
}
