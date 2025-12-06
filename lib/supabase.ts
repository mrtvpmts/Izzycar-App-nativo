
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uvumtvogvbhwgsauiqrn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2dW10dm9ndmJod2dzYXVpcXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5OTA0MzgsImV4cCI6MjA4MDU2NjQzOH0.bnBmSIuJB-VQrgGfjYlgfDZ4Wo7CS1xcp25tUSEEVys'; // Typically this should be in an env file but putting it here for simplicity as requested

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
