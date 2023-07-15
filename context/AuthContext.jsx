import { createContext,useContext,useState } from 'react';
import supabase from '../utils/supabase.js';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged,setIsLogged] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const [userData, setUserData] = useState({nome: 'Teste'});
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

  const onLogout = async (input) => {
    setIsLogged(false);
    setIsAdmin(false);
    setUserData(null);
  }

  const OnSignUp = async (input) => {
    try {
      console.log(input)
      const { data,error } = await supabase
        .from('estudante')
        .insert(input)
        .select()

      if (error) {
        console.error('Database error:',error);
        // Handle error, display error message, etc.
        return;
      }

      // Login successful, proceed with authentication logic
      console.log('Login successful:',data);
      
      router.push("/entrar")
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
        onLogin,
        onLogout,
        OnSignUp
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);