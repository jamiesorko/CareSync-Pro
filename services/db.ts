
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

export const db = createClient(supabaseUrl, supabaseKey);

export const careService = {
  async getClients() {
    const { data } = await db.from('clients').select('*');
    return data || [];
  },
  async getStaff() {
    const { data } = await db.from('staff').select('*');
    return data || [];
  }
};
