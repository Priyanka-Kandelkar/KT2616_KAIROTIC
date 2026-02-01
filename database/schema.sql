-- ============================================
-- HAWKINS READINESS NETWORK - DATABASE SCHEMA
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. USER PROFILES TABLE
-- ============================================
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL CHECK (role IN ('civilian', 'authority')),
    phone TEXT,
    area_id UUID,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. AREAS TABLE (Geographic zones)
-- ============================================
CREATE TABLE public.areas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'medium', 'high')),
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    disaster_types TEXT[] NOT NULL, -- ['earthquake', 'flood', 'cyclone']
    is_coastal BOOLEAN DEFAULT FALSE,
    is_near_river BOOLEAN DEFAULT FALSE,
    is_seismic_zone BOOLEAN DEFAULT FALSE,
    current_status TEXT DEFAULT 'safe' CHECK (current_status IN ('safe', 'warning', 'danger')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. SHELTERS TABLE
-- ============================================
CREATE TABLE public.shelters (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    area_id UUID REFERENCES public.areas(id) ON DELETE CASCADE,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    capacity INTEGER NOT NULL,
    current_occupancy INTEGER DEFAULT 0,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'full', 'maintenance', 'closed')),
    disaster_types TEXT[] NOT NULL,
    amenities TEXT[], -- ['water', 'medical', 'food', 'power']
    contact_phone TEXT,
    is_elevated BOOLEAN DEFAULT FALSE, -- for floods
    is_wind_safe BOOLEAN DEFAULT FALSE, -- for cyclones
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. DRILLS TABLE (Test drill records)
-- ============================================
CREATE TABLE public.drills (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    drill_type TEXT NOT NULL CHECK (drill_type IN ('earthquake', 'flood', 'cyclone')),
    mode TEXT NOT NULL CHECK (mode IN ('test', 'real')),
    status TEXT NOT NULL CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    score INTEGER, -- 0-100
    preparedness_level TEXT CHECK (preparedness_level IN ('not_prepared', 'partially_prepared', 'fully_prepared')),
    duration_seconds INTEGER,
    answers JSONB, -- Store Q&A responses
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. DRILL QUESTIONS TABLE
-- ============================================
CREATE TABLE public.drill_questions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    drill_type TEXT NOT NULL CHECK (drill_type IN ('earthquake', 'flood', 'cyclone')),
    question_text TEXT NOT NULL,
    question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice', 'yes_no', 'knowledge_check')),
    options JSONB, -- For multiple choice
    correct_answer TEXT,
    explanation TEXT,
    order_num INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 6. COMMUNITY FEEDBACK TABLE
-- ============================================
CREATE TABLE public.feedback (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    feedback_type TEXT CHECK (feedback_type IN ('drill', 'shelter', 'first_aid', 'general')),
    message TEXT NOT NULL,
    area_id UUID REFERENCES public.areas(id),
    is_reviewed BOOLEAN DEFAULT FALSE,
    reviewed_by UUID REFERENCES public.profiles(id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 7. DAILY REPORTS TABLE (Authority reports)
-- ============================================
CREATE TABLE public.daily_reports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    area_id UUID REFERENCES public.areas(id) ON DELETE CASCADE,
    authority_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    report_date DATE NOT NULL,
    status_summary TEXT NOT NULL,
    drills_conducted INTEGER DEFAULT 0,
    shelters_operational INTEGER,
    shelters_maintenance INTEGER,
    active_threats TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(area_id, report_date)
);

-- ============================================
-- 8. DISASTER PROTOCOLS TABLE
-- ============================================
CREATE TABLE public.disaster_protocols (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    disaster_type TEXT NOT NULL CHECK (disaster_type IN ('earthquake', 'flood', 'cyclone')),
    protocol_type TEXT NOT NULL CHECK (protocol_type IN ('immediate_action', 'first_aid', 'safety_tips', 'evacuation')),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    order_num INTEGER NOT NULL,
    icon_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 9. EMERGENCY ALERTS TABLE
-- ============================================
CREATE TABLE public.emergency_alerts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    area_id UUID REFERENCES public.areas(id) ON DELETE CASCADE,
    disaster_type TEXT NOT NULL CHECK (disaster_type IN ('earthquake', 'flood', 'cyclone', 'other')),
    severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES public.profiles(id),
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 10. DANGER ZONES TABLE (for map visualization)
-- ============================================
CREATE TABLE public.danger_zones (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    area_id UUID REFERENCES public.areas(id) ON DELETE CASCADE,
    zone_type TEXT NOT NULL CHECK (zone_type IN ('red', 'yellow', 'green')),
    coordinates JSONB NOT NULL, -- Array of lat/lng for polygon
    disaster_type TEXT CHECK (disaster_type IN ('earthquake', 'flood', 'cyclone')),
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shelters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drill_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disaster_protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.danger_zones ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can insert profile on signup" ON public.profiles
    FOR INSERT WITH CHECK (true);

-- AREAS POLICIES (Everyone can read)
CREATE POLICY "Anyone can view areas" ON public.areas
    FOR SELECT USING (true);

CREATE POLICY "Only authorities can update areas" ON public.areas
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'authority'
        )
    );

-- SHELTERS POLICIES (Everyone can read)
CREATE POLICY "Anyone can view shelters" ON public.shelters
    FOR SELECT USING (true);

CREATE POLICY "Only authorities can manage shelters" ON public.shelters
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'authority'
        )
    );

-- DRILLS POLICIES
CREATE POLICY "Users can view own drills" ON public.drills
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own drills" ON public.drills
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own drills" ON public.drills
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Authorities can view all drills" ON public.drills
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'authority'
        )
    );

-- DRILL QUESTIONS POLICIES (Everyone can read)
CREATE POLICY "Anyone can view drill questions" ON public.drill_questions
    FOR SELECT USING (true);

-- FEEDBACK POLICIES
CREATE POLICY "Users can insert feedback" ON public.feedback
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own feedback" ON public.feedback
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Authorities can view all feedback" ON public.feedback
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'authority'
        )
    );

CREATE POLICY "Authorities can update feedback" ON public.feedback
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'authority'
        )
    );

-- DAILY REPORTS POLICIES
CREATE POLICY "Anyone can view daily reports" ON public.daily_reports
    FOR SELECT USING (true);

CREATE POLICY "Authorities can manage reports" ON public.daily_reports
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'authority'
        )
    );

-- DISASTER PROTOCOLS POLICIES (Everyone can read)
CREATE POLICY "Anyone can view protocols" ON public.disaster_protocols
    FOR SELECT USING (true);

-- EMERGENCY ALERTS POLICIES (Everyone can read)
CREATE POLICY "Anyone can view alerts" ON public.emergency_alerts
    FOR SELECT USING (true);

CREATE POLICY "Authorities can manage alerts" ON public.emergency_alerts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'authority'
        )
    );

-- DANGER ZONES POLICIES (Everyone can read)
CREATE POLICY "Anyone can view danger zones" ON public.danger_zones
    FOR SELECT USING (true);

CREATE POLICY "Authorities can manage danger zones" ON public.danger_zones
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'authority'
        )
    );

-- ============================================
-- FUNCTIONS AND TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_areas_updated_at BEFORE UPDATE ON public.areas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shelters_updated_at BEFORE UPDATE ON public.shelters
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, role)
    VALUES (NEW.id, NEW.email, 'civilian');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- INDEXES for performance
-- ============================================
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_area_id ON public.profiles(area_id);
CREATE INDEX idx_areas_risk_level ON public.areas(risk_level);
CREATE INDEX idx_shelters_area_id ON public.shelters(area_id);
CREATE INDEX idx_shelters_status ON public.shelters(status);
CREATE INDEX idx_drills_user_id ON public.drills(user_id);
CREATE INDEX idx_drills_drill_type ON public.drills(drill_type);
CREATE INDEX idx_feedback_user_id ON public.feedback(user_id);
CREATE INDEX idx_feedback_is_reviewed ON public.feedback(is_reviewed);
CREATE INDEX idx_daily_reports_area_date ON public.daily_reports(area_id, report_date);
CREATE INDEX idx_emergency_alerts_area_active ON public.emergency_alerts(area_id, is_active);