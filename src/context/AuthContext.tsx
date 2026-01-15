'use client';

import React, { createContext, useContext, ReactNode } from 'react';

// O contexto pode ser mais complexo no futuro, com dados do usuário, etc.
const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Aqui entraria a lógica de autenticação (Firebase, etc.)
  const value = {};

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
