
import { supabase } from './supabaseClient';

export const authService = {

  async signUp(email, password, role = 'civilian', additionalData = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
          ...additionalData
        }
      }
    });

    if (error) throw error;

    if (data.user) {
      await supabase
        .from('profiles')
        .update({
          role,
          full_name: additionalData.full_name,
          phone: additionalData.phone,
          area_id: additionalData.area_id
        })
        .eq('id', data.user.id);
    }

    return data;
  },


  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  },


  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },


  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  async getCurrentProfile() {
    const user = await this.getCurrentUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data;
  }
};


export const profileService = {

  async getProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  },


  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },


  async updateEmergencyContact(userId, contactName, contactPhone) {
    return this.updateProfile(userId, {
      emergency_contact_name: contactName,
      emergency_contact_phone: contactPhone
    });
  }
};


export const areaService = {

  async getAllAreas() {
    const { data, error } = await supabase
      .from('areas')
      .select('*')
      .order('name');

    if (error) throw error;
    return data;
  },


  async getArea(areaId) {
    const { data, error } = await supabase
      .from('areas')
      .select('*')
      .eq('id', areaId)
      .single();

    if (error) throw error;
    return data;
  },

  async updateAreaStatus(areaId, status) {
    const { data, error } = await supabase
      .from('areas')
      .update({ current_status: status })
      .eq('id', areaId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateRiskLevel(areaId, riskLevel) {
    const { data, error } = await supabase
      .from('areas')
      .update({ risk_level: riskLevel })
      .eq('id', areaId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

export const shelterService = {

  async getAllShelters() {
    const { data, error } = await supabase
      .from('shelters')
      .select('*')
      .order('name');

    if (error) throw error;
    return data;
  },

  async getSheltersByArea(areaId) {
    const { data, error } = await supabase
      .from('shelters')
      .select('*')
      .eq('area_id', areaId)
      .order('name');

    if (error) throw error;
    return data;
  },


  async getSheltersByDisasterType(disasterType) {
    const { data, error } = await supabase
      .from('shelters')
      .select('*')
      .contains('disaster_types', [disasterType])
      .eq('status', 'open')
      .order('name');

    if (error) throw error;
    return data;
  },


  async updateShelterStatus(shelterId, status, occupancy = null) {
    const updates = { status };
    if (occupancy !== null) {
      updates.current_occupancy = occupancy;
    }

    const { data, error } = await supabase
      .from('shelters')
      .update(updates)
      .eq('id', shelterId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },


  async getAvailableShelters() {
    const { data, error } = await supabase
      .from('shelters')
      .select('*')
      .eq('status', 'open')
      .filter('current_occupancy', 'lt', 'capacity')
      .order('name');

    if (error) throw error;
    return data;
  }
};


export const drillService = {

  async startDrill(userId, drillType, mode = 'test') {
    const { data, error } = await supabase
      .from('drills')
      .insert({
        user_id: userId,
        drill_type: drillType,
        mode: mode,
        status: 'in_progress',
        started_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },


  async completeDrill(drillId, score, preparednessLevel, answers) {
    const startTime = await this.getDrillStartTime(drillId);
    const durationSeconds = Math.floor((Date.now() - new Date(startTime)) / 1000);

    const { data, error } = await supabase
      .from('drills')
      .update({
        status: 'completed',
        score,
        preparedness_level: preparednessLevel,
        answers,
        duration_seconds: durationSeconds,
        completed_at: new Date().toISOString()
      })
      .eq('id', drillId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },


  async getDrillStartTime(drillId) {
    const { data, error } = await supabase
      .from('drills')
      .select('started_at')
      .eq('id', drillId)
      .single();

    if (error) throw error;
    return data.started_at;
  },


  async getUserDrills(userId) {
    const { data, error } = await supabase
      .from('drills')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getUserDrillStats(userId) {
    const drills = await this.getUserDrills(userId);
    
    const completedDrills = drills.filter(d => d.status === 'completed');
    const avgScore = completedDrills.length > 0
      ? completedDrills.reduce((sum, d) => sum + (d.score || 0), 0) / completedDrills.length
      : 0;

    return {
      total: drills.length,
      completed: completedDrills.length,
      averageScore: Math.round(avgScore),
      byType: {
        earthquake: drills.filter(d => d.drill_type === 'earthquake').length,
        flood: drills.filter(d => d.drill_type === 'flood').length,
        cyclone: drills.filter(d => d.drill_type === 'cyclone').length
      }
    };
  }
};


export const drillQuestionService = {

  async getQuestionsByType(drillType) {
    const { data, error } = await supabase
      .from('drill_questions')
      .select('*')
      .eq('drill_type', drillType)
      .order('order_num');

    if (error) throw error;
    return data;
  }
};


export const protocolService = {

  async getProtocolsByDisaster(disasterType) {
    const { data, error } = await supabase
      .from('disaster_protocols')
      .select('*')
      .eq('disaster_type', disasterType)
      .order('protocol_type')
      .order('order_num');

    if (error) throw error;
    return data;
  },


  async getProtocolsByType(disasterType, protocolType) {
    const { data, error } = await supabase
      .from('disaster_protocols')
      .select('*')
      .eq('disaster_type', disasterType)
      .eq('protocol_type', protocolType)
      .order('order_num');

    if (error) throw error;
    return data;
  }
};
export const feedbackService = {
  /**
   * Submit feedback
   */
  async submitFeedback(userId, message, feedbackType = 'general', areaId = null) {
    const { data, error } = await supabase
      .from('feedback')
      .insert({
        user_id: userId,
        message,
        feedback_type: feedbackType,
        area_id: areaId
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAllFeedback(includeReviewed = false) {
    let query = supabase
      .from('feedback')
      .select('*, profiles(full_name, email)')
      .order('created_at', { ascending: false });

    if (!includeReviewed) {
      query = query.eq('is_reviewed', false);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },


  async markAsReviewed(feedbackId, reviewerId) {
    const { data, error } = await supabase
      .from('feedback')
      .update({
        is_reviewed: true,
        reviewed_by: reviewerId,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', feedbackId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};


export const alertService = {

  async createAlert(createdBy, areaId, alertData) {
    const { data, error } = await supabase
      .from('emergency_alerts')
      .insert({
        created_by: createdBy,
        area_id: areaId,
        ...alertData
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getActiveAlerts(areaId = null) {
    let query = supabase
      .from('emergency_alerts')
      .select('*, areas(name)')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (areaId) {
      query = query.eq('area_id', areaId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },


  async deactivateAlert(alertId) {
    const { data, error } = await supabase
      .from('emergency_alerts')
      .update({ is_active: false })
      .eq('id', alertId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};


export const zoneService = {

  async getActiveDangerZones(areaId = null) {
    let query = supabase
      .from('danger_zones')
      .select('*')
      .eq('is_active', true);

    if (areaId) {
      query = query.eq('area_id', areaId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },


  async getZonesByDisaster(disasterType) {
    const { data, error } = await supabase
      .from('danger_zones')
      .select('*')
      .eq('disaster_type', disasterType)
      .eq('is_active', true);

    if (error) throw error;
    return data;
  }
};

export const realtimeService = {

  subscribeToAlerts(callback) {
    return supabase
      .channel('emergency_alerts')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'emergency_alerts'
      }, callback)
      .subscribe();
  },

  subscribeToShelters(callback) {
    return supabase
      .channel('shelters')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'shelters'
      }, callback)
      .subscribe();
  },


  unsubscribe(channel) {
    return supabase.removeChannel(channel);
  }
};

export default {
  auth: authService,
  profile: profileService,
  area: areaService,
  shelter: shelterService,
  drill: drillService,
  drillQuestion: drillQuestionService,
  protocol: protocolService,
  feedback: feedbackService,
  alert: alertService,
  zone: zoneService,
  realtime: realtimeService
};