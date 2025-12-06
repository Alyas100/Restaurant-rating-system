import { createBrowserClient } from "@supabase/ssr";

// Define a mock client with a more complete interface to match Supabase
const createMockClient = () => {
    const mockError = (message: string) => {
        console.warn(message);
        return { error: { message } };
    };

    const mockQueryBuilder = (table: string) => {
        return {
            select: async (columns = '*') => {
                console.warn(`Mock Supabase query on table "${table}", columns: "${columns}" - Please configure your Supabase environment variables.`);
                return { data: [], error: null };
            },
            insert: async (values: any) => mockError("Supabase insert attempted but environment variables are not set"),
            update: async (values: any) => mockError("Supabase update attempted but environment variables are not set"),
            delete: async () => mockError("Supabase delete attempted but environment variables are not set"),

            // Additional methods that might be used
            eq: (column: string, value: any) => mockQueryBuilder(table),
            neq: (column: string, value: any) => mockQueryBuilder(table),
            lt: (column: string, value: any) => mockQueryBuilder(table),
            lte: (column: string, value: any) => mockQueryBuilder(table),
            gt: (column: string, value: any) => mockQueryBuilder(table),
            gte: (column: string, value: any) => mockQueryBuilder(table),
            like: (column: string, pattern: string) => mockQueryBuilder(table),
            ilike: (column: string, pattern: string) => mockQueryBuilder(table),
            is: (column: string, value: any) => mockQueryBuilder(table),
            in: (column: string, values: any[]) => mockQueryBuilder(table),
            filter: (column: string, operator: string, value: any) => mockQueryBuilder(table),
            or: (filters: string) => mockQueryBuilder(table),
            order: (column: string, options?: { ascending?: boolean }) => mockQueryBuilder(table),
            limit: (count: number) => mockQueryBuilder(table),
            range: (from: number, to: number) => mockQueryBuilder(table),
            single: async () => {
                console.warn(`Mock Supabase single query on table "${table}" - Please configure your Supabase environment variables.`);
                return { data: null, error: null };
            },
        };
    };

    return {
        from: (table: string) => mockQueryBuilder(table),

        // Mock auth methods
        auth: {
            getUser: async () => ({ data: { user: null }, error: null }),
            signIn: async (credentials: any) => mockError("Supabase auth signIn attempted but environment variables are not set"),
            signOut: async () => mockError("Supabase auth signOut attempted but environment variables are not set"),
        },

        // Add any other methods that Supabase might use
        rpc: async (fn: string, args?: any) => mockError(`Supabase RPC call "${fn}" attempted but environment variables are not set`),
    };
};

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        console.error("Missing Supabase environment variables. Please check your .env.local file.");
        console.info("Using mock client for development. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to connect to your database.");
        return createMockClient();
    }

    // Validate the Supabase URL format
    try {
        new URL(supabaseUrl!);
    } catch (e) {
        console.error("Invalid Supabase URL format:", supabaseUrl);
        return createMockClient();
    }

    return createBrowserClient(
        supabaseUrl!,
        supabaseAnonKey!
    );
}
