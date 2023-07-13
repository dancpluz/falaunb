import { createContext,useContext,useState } from 'react';
import supabase from '../utils/supabase.js';

const HomeContext = createContext();

export const DataProvider = ({ children }) => {
  const [departments,setDepartments] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const fetchDepartments = async () => {
    const { data } = await supabase
      .from("departamento")
      .select()
      .order("nome",{ ascending: true })
    setDepartments(data);
  }

  return (
    <HomeContext.Provider
      value={{
        departments,
        fetchDepartments,
        selectedDepartment,
        setSelectedDepartment
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => useContext(HomeContext);