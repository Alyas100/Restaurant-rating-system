// Test script to check if our mock client works
import { createClient } from './utils/supabase/client';

console.log('Testing Supabase client...');
const supabase = createClient();

console.log('Supabase client created successfully');

// Test a query
async function testQuery() {
    try {
        const { data, error } = await supabase
            .from("restaurants")
            .select("*");
        
        console.log('Query result:', { data, error });
    } catch (err) {
        console.error('Error in query:', err);
    }
}

testQuery();