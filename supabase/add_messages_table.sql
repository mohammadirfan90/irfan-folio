-- Create contact messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous inserts (so visitors can submit messages)
CREATE POLICY "Allow public insert to contact_messages" 
    ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Allow authenticated users (admin) full access to read and delete messages
CREATE POLICY "Allow authenticated read/write to contact_messages" 
    ON public.contact_messages FOR ALL USING (auth.role() = 'authenticated');
