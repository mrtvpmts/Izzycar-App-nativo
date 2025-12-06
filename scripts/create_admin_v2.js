
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uvumtvogvbhwgsauiqrn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2dW10dm9ndmJod2dzYXVpcXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5OTA0MzgsImV4cCI6MjA4MDU2NjQzOH0.bnBmSIuJB-VQrgGfjYlgfDZ4Wo7CS1xcp25tUSEEVys';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createAdmin() {
    const email = 'admin2@lcpneus.com.br';
    const password = 'admin1234';

    console.log(`Creating backup user: ${email}...`);

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: 'Admin Backup',
                role: 'admin'
            }
        }
    });

    if (error) {
        if (error.message.includes('already registered')) {
            console.log('User already exists.');
        } else {
            console.error('Error creating user:', error.message);
        }
    } else {
        console.log('User created successfully. ID:', data.user?.id);
        if (data.session) {
            console.log('Session active. Attempting to force profile update just in case...');
            // Need to recreate client with session to bypass public RLS if needed, or just standard insert
            const { error: profileError } = await supabase
                .from('profiles')
                .upsert({
                    id: data.user.id,
                    full_name: 'Admin Backup',
                    role: 'admin',
                    email: email
                });
            if (profileError) console.error('Error manual upserting profile:', profileError);
            else console.log('Profile upserted manually.');
        } else {
            console.log('No session returned (confirm email might be on).');
        }
    }
}

createAdmin();
