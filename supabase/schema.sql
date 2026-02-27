-- Copy and paste this into the Supabase SQL Editor

-- 1. Create the brand_registrations table
CREATE TABLE public.brand_registrations (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    brand_name text NOT NULL,
    website text,
    industry text NOT NULL,
    description text,
    email text NOT NULL,
    phone text,
    collab_types text[] DEFAULT '{}'::text[],
    platforms text[] DEFAULT '{}'::text[],
    budget_range text,
    influencer_tiers text[] DEFAULT '{}'::text[],
    frequency text,
    guidelines text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) but allow inserts for public access (since the form is open to anyone)
ALTER TABLE public.brand_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts for brand_registrations" 
    ON public.brand_registrations 
    FOR INSERT 
    TO public 
    WITH CHECK (true);

-- 2. Create the campaigns table
CREATE TABLE public.campaigns (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    brand_name text NOT NULL,
    target_niche text NOT NULL,
    budget text NOT NULL,
    timeline text NOT NULL,
    goal text NOT NULL,
    deliverables text NOT NULL,
    target_audience text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) but allow inserts for public access (since the form is open to anyone)
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts for campaigns" 
    ON public.campaigns 
    FOR INSERT 
    TO public 
    WITH CHECK (true);
