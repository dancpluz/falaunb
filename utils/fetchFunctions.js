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

export const fetchTeachers = async (value) => {
  try {
    const { data,error } = await supabase
      .from('professor')
      .select('nome')
      .eq('cod_departamento',value)

    if (error) {
      throw new Error('Failed to fetch teacher options');
    }

    const optionsArray = data.map((obj) => ({
      value: obj.nome,
      label: obj.nome,
    }));

    console.log('Teachers Fetched:',optionsArray);
    return optionsArray;
  } catch (error) {
    console.error('Error fetching teacher options:',error.message);
    return [];
  }
};

export const fetchSubjects = async (value) => {
  try {
    const { data,error } = await supabase
      .from('turma')
      .select('cod_disciplina(codigo,nome)')
      .eq('nome_professor',value)
      .order('cod_disciplina(nome)',{ ascending: true });

    if (error) {
      throw new Error('Failed to fetch subject options');
    }

    const optionsArray = data.map((obj) => ({
      value: obj.cod_disciplina.codigo,
      label: obj.cod_disciplina.nome,
    }));

    console.log('Subjects Fetched:',optionsArray);
    return optionsArray;
  } catch (error) {
    console.error('Error fetching subject options:',error.message);
    return [];
  }
}

export const fetchClassrooms = async (value, teacher) => {
  try {
    const { data,error } = await supabase
      .from('turma')
      .select('turma, codigo')
      .eq('cod_disciplina',value)
      .eq('nome_professor',teacher)
      .order('turma',{ ascending: true });

    if (error) {
      throw new Error('Failed to fetch subject options');
    }

    const optionsArray = data.map((obj) => ({
      value: obj.codigo,
      label: obj.turma,
    }));

    console.log('Subjects Fetched:',optionsArray);
    return optionsArray;
  } catch (error) {
    console.error('Error fetching subject options:',error.message);
    return [];
  }
}