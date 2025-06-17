
import { supabase } from '../integrations/supabase/client';
import { ParkingSpot, Booking, User, Review, Vehicle } from '../types';

class SupabaseDatabase {
  async getParkingSpots(): Promise<ParkingSpot[]> {
    const { data, error } = await supabase
      .from('parking_spots')
      .select('*')
      .eq('is_active', true);
    
    if (error) throw error;
    return data?.map(this.mapParkingSpotFromDB) || [];
  }

  async getParkingSpotsByOwner(ownerId: string): Promise<ParkingSpot[]> {
    const { data, error } = await supabase
      .from('parking_spots')
      .select('*')
      .eq('owner_id', ownerId);
    
    if (error) throw error;
    return data?.map(this.mapParkingSpotFromDB) || [];
  }

  async getParkingSpotById(id: string): Promise<ParkingSpot | undefined> {
    const { data, error } = await supabase
      .from('parking_spots')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return undefined;
    return data ? this.mapParkingSpotFromDB(data) : undefined;
  }

  async addParkingSpot(spotData: Omit<ParkingSpot, 'id' | 'rating' | 'reviewCount' | 'availableSlots'>): Promise<ParkingSpot> {
    const dbData = {
      owner_id: spotData.ownerId,
      name: spotData.name,
      address: spotData.address,
      price: spotData.price,
      price_type: spotData.priceType,
      total_slots: spotData.totalSlots,
      available_slots: spotData.totalSlots,
      rating: 0,
      review_count: 0,
      images: spotData.images,
      amenities: spotData.amenities,
      opening_hours: spotData.openingHours,
      phone: spotData.phone,
      description: spotData.description,
      lat: spotData.lat,
      lng: spotData.lng,
      is_active: spotData.isActive,
    };

    const { data, error } = await supabase
      .from('parking_spots')
      .insert(dbData)
      .select()
      .single();
    
    if (error) throw error;
    return this.mapParkingSpotFromDB(data);
  }

  async updateParkingSpot(id: string, updates: Partial<ParkingSpot>): Promise<ParkingSpot | undefined> {
    const dbUpdates: any = {};
    
    if (updates.name) dbUpdates.name = updates.name;
    if (updates.address) dbUpdates.address = updates.address;
    if (updates.price !== undefined) dbUpdates.price = updates.price;
    if (updates.priceType) dbUpdates.price_type = updates.priceType;
    if (updates.totalSlots !== undefined) dbUpdates.total_slots = updates.totalSlots;
    if (updates.availableSlots !== undefined) dbUpdates.available_slots = updates.availableSlots;
    if (updates.images) dbUpdates.images = updates.images;
    if (updates.amenities) dbUpdates.amenities = updates.amenities;
    if (updates.openingHours) dbUpdates.opening_hours = updates.openingHours;
    if (updates.phone) dbUpdates.phone = updates.phone;
    if (updates.description) dbUpdates.description = updates.description;
    if (updates.isActive !== undefined) dbUpdates.is_active = updates.isActive;

    const { data, error } = await supabase
      .from('parking_spots')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) return undefined;
    return this.mapParkingSpotFromDB(data);
  }

  async deleteParkingSpot(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('parking_spots')
      .delete()
      .eq('id', id);
    
    return !error;
  }

  async getAllBookings(): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*');
    
    if (error) throw error;
    return data?.map(this.mapBookingFromDB) || [];
  }

  async getBookingsBySpotId(spotId: string): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('spot_id', spotId);
    
    if (error) throw error;
    return data?.map(this.mapBookingFromDB) || [];
  }

  async getBookingsByUserId(userId: string): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId);
    
    if (error) throw error;
    return data?.map(this.mapBookingFromDB) || [];
  }

  async getBookingById(id: string): Promise<Booking | undefined> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return undefined;
    return data ? this.mapBookingFromDB(data) : undefined;
  }

  async getBookingByPin(pin: string): Promise<Booking | null> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('pin', pin)
      .single();
    
    if (error) return null;
    return data ? this.mapBookingFromDB(data) : null;
  }

  async getBookingByQRCode(qrCode: string): Promise<Booking | null> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('qr_code', qrCode)
      .single();
    
    if (error) return null;
    return data ? this.mapBookingFromDB(data) : null;
  }

  async createBooking(bookingData: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> {
    const dbData = {
      spot_id: bookingData.spotId,
      user_id: bookingData.userId,
      vehicle_id: bookingData.vehicleId,
      start_time: bookingData.startTime,
      end_time: bookingData.endTime,
      total_cost: bookingData.totalCost,
      status: bookingData.status,
      qr_code: bookingData.qrCode,
      pin: bookingData.pin,
    };

    const { data, error } = await supabase
      .from('bookings')
      .insert(dbData)
      .select()
      .single();
    
    if (error) throw error;
    return this.mapBookingFromDB(data);
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking | undefined> {
    const dbUpdates: any = {};
    
    if (updates.status) dbUpdates.status = updates.status;
    if (updates.endTime) dbUpdates.end_time = updates.endTime;
    if (updates.totalCost !== undefined) dbUpdates.total_cost = updates.totalCost;

    const { data, error } = await supabase
      .from('bookings')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) return undefined;
    return this.mapBookingFromDB(data);
  }

  async updateBookingStatus(id: string, status: string): Promise<Booking | undefined> {
    return this.updateBooking(id, { status: status as any });
  }

  async deleteBooking(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);
    
    return !error;
  }

  async getAllUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*');
    
    if (error) throw error;
    return data?.map(this.mapUserFromDB) || [];
  }

  async getUserById(id: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return undefined;
    return data ? this.mapUserFromDB(data) : undefined;
  }

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const dbData = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      user_type: userData.userType,
    };

    const { data, error } = await supabase
      .from('profiles')
      .insert(dbData)
      .select()
      .single();
    
    if (error) throw error;
    return this.mapUserFromDB(data);
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const dbUpdates: any = {};
    
    if (updates.name) dbUpdates.name = updates.name;
    if (updates.email) dbUpdates.email = updates.email;
    if (updates.phone) dbUpdates.phone = updates.phone;
    if (updates.userType) dbUpdates.user_type = updates.userType;

    const { data, error } = await supabase
      .from('profiles')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) return undefined;
    return this.mapUserFromDB(data);
  }

  async deleteUser(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);
    
    return !error;
  }

  async authenticateUser(email: string, password: string): Promise<User | null> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error || !data.user) return null;
    
    const user = await this.getUserById(data.user.id);
    return user || null;
  }

  async getAllReviews(): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select('*');
    
    if (error) throw error;
    return data?.map(this.mapReviewFromDB) || [];
  }

  async getReviewsBySpotId(spotId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('spot_id', spotId);
    
    if (error) throw error;
    return data?.map(this.mapReviewFromDB) || [];
  }

  async getReviewsBySpot(spotId: string): Promise<Review[]> {
    return this.getReviewsBySpotId(spotId);
  }

  async getReviewsByUserId(userId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('user_id', userId);
    
    if (error) throw error;
    return data?.map(this.mapReviewFromDB) || [];
  }

  async addReview(reviewData: Review): Promise<Review> {
    const dbData = {
      user_id: reviewData.userId,
      spot_id: reviewData.spotId,
      rating: reviewData.rating,
      comment: reviewData.comment,
      user_name: reviewData.userName,
    };

    const { data, error } = await supabase
      .from('reviews')
      .insert(dbData)
      .select()
      .single();
    
    if (error) throw error;
    return this.mapReviewFromDB(data);
  }

  async updateReview(id: string, updates: Partial<Review>): Promise<Review | undefined> {
    const dbUpdates: any = {};
    
    if (updates.rating !== undefined) dbUpdates.rating = updates.rating;
    if (updates.comment) dbUpdates.comment = updates.comment;

    const { data, error } = await supabase
      .from('reviews')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) return undefined;
    return this.mapReviewFromDB(data);
  }

  async updateReviewComment(id: string, comment: string): Promise<Review | undefined> {
    return this.updateReview(id, { comment });
  }

  async deleteReview(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);
    
    return !error;
  }

  async getVehiclesByUserId(userId: string): Promise<Vehicle[]> {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('user_id', userId);
    
    if (error) throw error;
    return data?.map(this.mapVehicleFromDB) || [];
  }

  async searchParkingSpots(query: string, filters?: any): Promise<ParkingSpot[]> {
    let queryBuilder = supabase
      .from('parking_spots')
      .select('*')
      .eq('is_active', true);

    if (query) {
      queryBuilder = queryBuilder.or(`name.ilike.%${query}%,address.ilike.%${query}%`);
    }

    if (filters) {
      if (filters.priceRange) {
        queryBuilder = queryBuilder.lte('price', filters.priceRange);
      }
      if (filters.amenities && filters.amenities.length > 0) {
        queryBuilder = queryBuilder.contains('amenities', filters.amenities);
      }
    }

    const { data, error } = await queryBuilder;
    
    if (error) throw error;
    return data?.map(this.mapParkingSpotFromDB) || [];
  }

  async getAllParkingSpots(): Promise<ParkingSpot[]> {
    return this.getParkingSpots();
  }

  async getNextAvailableTime(spotId: string): Promise<string | null> {
    const { data, error } = await supabase
      .from('bookings')
      .select('end_time')
      .eq('spot_id', spotId)
      .eq('status', 'active')
      .order('end_time', { ascending: true })
      .limit(1);
    
    if (error || !data || data.length === 0) {
      return new Date().toISOString();
    }
    
    return data[0].end_time;
  }

  // Helper methods to map between database schema and application types
  private mapParkingSpotFromDB(dbData: any): ParkingSpot {
    return {
      id: dbData.id,
      name: dbData.name,
      address: dbData.address,
      price: dbData.price,
      priceType: dbData.price_type,
      totalSlots: dbData.total_slots,
      availableSlots: dbData.available_slots,
      rating: dbData.rating || 0,
      reviewCount: dbData.review_count || 0,
      images: dbData.images || [],
      amenities: dbData.amenities || [],
      openingHours: dbData.opening_hours,
      phone: dbData.phone,
      description: dbData.description,
      lat: dbData.lat,
      lng: dbData.lng,
      ownerId: dbData.owner_id,
      isActive: dbData.is_active,
    };
  }

  private mapBookingFromDB(dbData: any): Booking {
    return {
      id: dbData.id,
      spotId: dbData.spot_id,
      userId: dbData.user_id,
      startTime: dbData.start_time,
      endTime: dbData.end_time,
      vehicleId: dbData.vehicle_id,
      totalCost: dbData.total_cost,
      status: dbData.status,
      qrCode: dbData.qr_code,
      pin: dbData.pin,
      createdAt: dbData.created_at,
    };
  }

  private mapUserFromDB(dbData: any): User {
    return {
      id: dbData.id,
      name: dbData.name,
      email: dbData.email,
      phone: dbData.phone,
      userType: dbData.user_type,
    };
  }

  private mapReviewFromDB(dbData: any): Review {
    return {
      id: dbData.id,
      userId: dbData.user_id,
      spotId: dbData.spot_id,
      rating: dbData.rating,
      comment: dbData.comment,
      createdAt: dbData.created_at,
      userName: dbData.user_name,
    };
  }

  private mapVehicleFromDB(dbData: any): Vehicle {
    return {
      id: dbData.id,
      make: dbData.make,
      model: dbData.model,
      licensePlate: dbData.license_plate,
      color: dbData.color,
    };
  }

  // Legacy methods for backward compatibility
  async addBooking(bookingData: Booking): Promise<Booking> {
    return this.createBooking(bookingData);
  }

  async addUser(userData: User): Promise<User> {
    return this.createUser(userData);
  }
}

export const database = new SupabaseDatabase();
