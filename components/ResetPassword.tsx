"use client";

import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '/app/home.module.css'; 

const ResetPassword = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validatePassword = (password: string) => {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return 'A senha deve ter no mínimo 6 caracteres.';
    }
    if (!hasUpperCase) {
      return 'A senha deve conter pelo menos uma letra maiúscula.';
    }
    if (!hasLowerCase) {
      return 'A senha deve conter pelo menos uma letra minúscula.';
    }
    if (!hasNumber) {
      return 'A senha deve conter pelo menos um número.';
    }
    if (!hasSymbol) {
      return 'A senha deve conter pelo menos um símbolo.';
    }
    return '';
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validatePassword(newPassword);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    
    setSuccess('Senha atualizada com sucesso!');
    setError('');

 
    setTimeout(() => router.push('/'), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.modalTitle}>Redefinir Senha</h2>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.inputField}>
            <label htmlFor="new-password" className={styles.inputLabel}>Nova Senha</label>
            <input
              id="new-password"
              type="password"
              placeholder="Digite sua nova senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="confirm-password" className={styles.inputLabel}>Confirmar Senha</label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Confirme sua nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
            />
          </div>

          {}
          <div className={styles.instructions}>
            <p>✔️Crie uma senha segura seguindo as instruções abaixo:</p>
            <ul>
              <li>✔️ Use letras maiúsculas e minúsculas, símbolos e números.</li>
              <li>✔️ Não use informações pessoais como datas de aniversário.</li>
              <li>✔️ Não use uma senha igual à anterior.</li>
              <li>✔️ A senha deve ter no mínimo 6 caracteres.</li>
            </ul>
          </div>

          {}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <button type="submit" className={styles.button}>Redefinir Senha</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
