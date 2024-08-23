
import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import styles from './home.module.css'; 
import ResetPassword from "@/components/ResetPassword";


export default function Home() {
  return (
    <main>
      <div className={styles.container}>
       <LoginForm/>
      </div>
      
    </main>
  );
}
