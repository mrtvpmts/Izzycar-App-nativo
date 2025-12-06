
import { createClient } from '@supabase/supabase-js';

// Hardcoded for script execution context
const supabaseUrl = 'https://uvumtvogvbhwgsauiqrn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2dW10dm9ndmJod2dzYXVpcXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5OTA0MzgsImV4cCI6MjA4MDU2NjQzOH0.bnBmSIuJB-VQrgGfjYlgfDZ4Wo7CS1xcp25tUSEEVys';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createAdmin() {
    const email = 'adm@lcpneus.com.br';
    const password = 'admin123@changeME';

    console.log(`Creating user: ${email}...`);

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: 'Administrador LC Pneus',
                role: 'admin'
            }
        }
    });

    if (error) {
        if (error.message.includes('already registered')) {
            console.log('User already exists. Skipping creation.');
        } else {
            console.error('Error creating user:', error.message);
        }
    } else {
        console.log('User created successfully. ID:', data.user?.id);
    }
}

createAdmin();
