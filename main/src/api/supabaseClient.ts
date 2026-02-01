import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

export type Profile = {
  id: string;
  email: string;
  full_name?: string;
  role: 'civilian' | 'authority';
  phone?: string;
  area_id?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  created_at: string;
  updated_at: string;
};

export type Area = {
  id: string;
  name: string;
  risk_level: 'low' | 'medium' | 'high';
  latitude: number;
  longitude: number;
  disaster_types: string[];
  is_coastal: boolean;
  is_near_river: boolean;
  is_seismic_zone: boolean;
  current_status: 'safe' | 'warning' | 'danger';
  created_at: string;
  updated_at: string;
};

export type Shelter = {
  id: string;
  name: string;
  area_id: string;
  latitude: number;
  longitude: number;
  capacity: number;
  current_occupancy: number;
  status: 'open' | 'full' | 'maintenance' | 'closed';
  disaster_types: string[];
  amenities: string[];
  contact_phone?: string;
  is_elevated: boolean;
  is_wind_safe: boolean;
  created_at: string;
  updated_at: string;
};

export type Drill = {
  id: string;
  user_id: string;
  drill_type: 'earthquake' | 'flood' | 'cyclone';
  mode: 'test' | 'real';
  status: 'in_progress' | 'completed' | 'abandoned';
  score?: number;
  preparedness_level?: 'not_prepared' | 'partially_prepared' | 'fully_prepared';
  duration_seconds?: number;
  answers?: any;
  started_at: string;
  completed_at?: string;
  created_at: string;
};

export type DrillQuestion = {
  id: string;
  drill_type: 'earthquake' | 'flood' | 'cyclone';
  question_text: string;
  question_type: 'multiple_choice' | 'yes_no' | 'knowledge_check';
  options?: string[];
  correct_answer?: string;
  explanation?: string;
  order_num: number;
  created_at: string;
};

export type Feedback = {
  id: string;
  user_id: string;
  feedback_type?: 'drill' | 'shelter' | 'first_aid' | 'general';
  message: string;
  area_id?: string;
  is_reviewed: boolean;
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
};


export type DisasterProtocol = {
  id: string;
  disaster_type: 'earthquake' | 'flood' | 'cyclone';
  protocol_type: 'immediate_action' | 'first_aid' | 'safety_tips' | 'evacuation';
  title: string;
  content: string;
  order_num: number;
  icon_name?: string;
  created_at: string;
};

export type EmergencyAlert = {
  id: string;
  area_id: string;
  disaster_type: 'earthquake' | 'flood' | 'cyclone' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  is_active: boolean;
  created_by?: string;
  expires_at?: string;
  created_at: string;
};

export type DangerZone = {
  id: string;
  area_id: string;
  zone_type: 'red' | 'yellow' | 'green';
  coordinates: Array<{ lat: number; lng: number }>;
  disaster_type?: 'earthquake' | 'flood' | 'cyclone';
  description?: string;
  is_active: boolean;
  created_at: string;
};