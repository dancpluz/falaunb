import supabase from './supabase';

export const removeReview = async (codigo) => {
  try {
    const { error } = await supabase
      .from('avaliacao')
      .delete()
      .eq('codigo',codigo)

    if (error) {
      throw new Error('Failed to remove review');
    }

    console.log('Review Removed');
  } catch (error) {
    console.error('Error removing review:',error.message);
  }
}