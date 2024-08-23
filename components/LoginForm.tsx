"use client";

import React, { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import styles from '/app/home.module.css';
import PasswordRecovery from './PasswordRecovery'; 

export default function LoginForm() {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    setEmailError('');
    setPasswordError('');

    let hasError = false;

    const emailRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[.])[a-zA-Z\d.]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      setEmailError("E-mail inválido. Insira um endereço de e-mail no formato correto.");
      hasError = true;
    }

    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[^\w\s]/.test(password)) {
      setPasswordError("Senha inválida. A senha deve ter pelo menos 8 caracteres, incluindo 1 letra maiúscula, 1 letra minúscula e 1 caractere especial.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, 
    });

    if (result?.error) {
      toast.error(result.error); 
    } else if (result?.ok) {
      toast.success("Login efetuado com sucesso!"); 
      window.location.href = "/dashboard";
    }
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <form onSubmit={login} className={styles.card}>
        <div className={styles.inputField}>
          <label htmlFor="email" className={styles.inputLabel}>
            E-mail <span className="text-red-500">*</span>
          </label>
          <input 
            name="email"
            type="email"
            placeholder="mail.exemple@gmail.com"
            className={`${styles.input} ${emailError ? 'border-red-500' : ''}`} 
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>} 
        </div>
        <div className={styles.inputField}>
          <label htmlFor="password" className={styles.inputLabel}>
            Senha <span className="text-red-500">*</span>
          </label>
          <input 
            name="password"
            type="password"
            placeholder="***********"
            className={`${styles.input} ${passwordError ? 'border-red-500' : ''}`} 
          />
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>} 
        </div>
        <div className={styles.inputField}>
          <button type="button" className={styles.forgotPasswordLink} onClick={openModal}>Esqueci minha senha</button>
        </div>
        <button type="submit" className={styles.button}>Entrar</button>
      </form>

      {isModalOpen && <PasswordRecovery onClose={closeModal} />}
    </>
  );
}
