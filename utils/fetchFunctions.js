import supabase from './supabase';
import { formatDepartment } from './formatting';


export const fetchDepartments = async () => {
  try {
    const { data,error } = await supabase
      .from('departamento')
      .select()
      .order('nome',{ ascending: true });

    if (error) {
      throw new Error('Failed to fetch department options');
    }

    const optionsArray = data.map((obj) => ({
      value: obj.codigo,
      label: formatDepartment(obj.nome),
    }));

    console.log('Departments Fetched:',optionsArray);
    return optionsArray;
  } catch (error) {
    console.error('Error fetching department options:',error.message);
    return [];
  }
};

