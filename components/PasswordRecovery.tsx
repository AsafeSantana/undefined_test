"use client";

import React, { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import styles from '/app/home.module.css';


const registeredEmails = ['user1@example.com', 'user2@example.com']; 

function isEmailRegistered(email: string): boolean {
  return registeredEmails.includes(email);
}

function RecoveryConfirmation({ onConfirm }: { onConfirm: () => void }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <span className={styles.closeIcon} onClick={onConfirm}>
          &times;
        </span>
        <h2 className={styles.modalTitle}>Recuperação de Senha</h2>
        <p className={styles.modalDescription}>
          Um e-mail de recuperação foi enviado se o endereço estiver cadastrado. Por favor, verifique a caixa de entrada e a pasta de spam.
        </p>
        <button type="button" className={styles.button} onClick={onConfirm}>
          Entendido
        </button>
      </div>
    </div>
  );
}


function PasswordResetConfirmation() {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>Olá,</h2>
        <p className={styles.modalDescription}>
          Redefina sua senha de acesso clicando no link abaixo.
        </p>
        <p className={`${styles.modalDescription} ${styles.link}`}>
        <a href="/reset" className={styles.link}>
  https://trajetonbdchabvuyhbvayrbvyubrvyhv.senha
</a>
        </p>
        <p className={`${styles.modalDescription} ${styles.expiryText}`}>
          O link expira em 24 horas
        </p>
      </div>
    </div>
  );
}

export default function PasswordRecovery({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [isResetConfirmationVisible, setIsResetConfirmationVisible] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEmailError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("E-mail inválido. Insira um endereço de e-mail no formato correto.");
      return;
    }

    if (!isEmailRegistered(email)) {
      setEmailError("E-mail inválido. Este endereço de e-mail não está cadastrado no sistema, verifique e tente novamente.");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      setIsConfirmationVisible(true);
    } catch (error) {
      toast.error("Ocorreu um erro ao enviar o e-mail. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleConfirmationClose = () => {
    setIsConfirmationVisible(false);
    setIsResetConfirmationVisible(true);
  };

  const handleResetConfirmationClose = () => {
    setIsResetConfirmationVisible(false);
    onClose();
  };

  return (
    <>
      {isResetConfirmationVisible ? (
        <PasswordResetConfirmation />
      ) : isConfirmationVisible ? (
        <RecoveryConfirmation onConfirm={handleConfirmationClose} />
      ) : (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <span className={styles.closeIcon} onClick={onClose}>
              &times;
            </span>
            <h2 className={styles.modalTitle}>Recuperar Senha</h2>
            <p className={styles.modalDescription}>Para recuperar a sua senha, digite o e-mail cadastrado.</p>
            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <div className={styles.inputField}>
                <label htmlFor="recovery-email" className={styles.inputLabel}>E-mail</label>
                <input
                  id="recovery-email"
                  type="email"
                  placeholder="mail.example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${styles.input} ${emailError ? 'border-red-500' : ''}`}
                />
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
              </div>
              <button type="submit" className={`${styles.button} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
