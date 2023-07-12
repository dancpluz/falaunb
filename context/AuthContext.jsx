import { createContext,useContext,useState } from 'react';
import supabase from '../utils/supabase.js';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged,setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loginError,setLoginError] = useState('');
  const router = useRouter();

  const onLogin = async (input) => {
    const { matricula,senha } = input;
    

    try {
      const { data: users,error } = await supabase
        .from('estudante')
        .select('*')
        .eq('matricula',matricula);

      if (error) {
        console.error('Database error:',error);
        // Handle error, display error message, etc.
        return;
      }

      if (users.length === 0) {
        setLoginError('Matrícula não existe');
        return;
      }

      const user = users[0];

      if (user.senha !== senha) {
        setLoginError('Senha errada');
        return;
      }

      // Login successful, proceed with authentication logic
      console.log('Login successful:',user);
      setUserData(user);
      setIsLogged(true);
      setIsAdmin(user.admin);
      router.push("/")
      // Redirect to the authenticated page, etc.
    } catch (error) {
      console.error('Login error:',error.message);
      // Handle error, display error message, etc.
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        setIsLogged,
        isAdmin,
        setIsAdmin,
        userData,
        setUserData,
        loginError,
        setLoginError,
        onLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);