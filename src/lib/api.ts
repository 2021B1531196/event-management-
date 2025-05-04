import { supabase } from './supabase';
import { Event } from '../types/event';

export const api = {
  events: {
    async list() {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          user:user_id (
            id,
            email,
            raw_user_meta_data
          ),
          registrations:registrations(count)
        `)
        .order('start_time', { ascending: true });

      if (error) throw error;

      return data.map(event => ({
        id: event.id,
        title: event.title,
        description: event.description,
        category: event.category,
        startTime: event.start_time,
        endTime: event.end_time,
        location: event.location,
        coverImage: event.cover_image,
        price: event.price,
        featured: event.featured,
        attendees: event.registrations[0].count,
        organizer: {
          id: event.user.id,
          name: event.user.raw_user_meta_data.name,
          role: 'Organizer',
          avatar: `https://i.pravatar.cc/150?u=${event.user.email}`,
        },
      }));
    },

    async create(eventData: Omit<Event, 'id' | 'attendees' | 'organizer'>) {
      const { data, error } = await supabase
        .from('events')
        .insert([
          {
            title: eventData.title,
            description: eventData.description,
            category: eventData.category,
            start_time: eventData.startTime,
            end_time: eventData.endTime,
            location: eventData.location,
            cover_image: eventData.coverImage,
            price: eventData.price,
            featured: eventData.featured,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    async get(id: string) {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          user:user_id (
            id,
            email,
            raw_user_meta_data
          ),
          registrations:registrations(count),
          chat_messages:chat_messages(
            id,
            content,
            created_at,
            user:user_id (
              id,
              email,
              raw_user_meta_data
            )
          ),
          questions:questions(
            id,
            content,
            votes,
            answered,
            created_at,
            user:user_id (
              id,
              email,
              raw_user_meta_data
            )
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
  },

  registrations: {
    async register(eventId: string) {
      const { error } = await supabase
        .from('registrations')
        .insert([{ event_id: eventId }]);

      if (error) throw error;
    },

    async unregister(eventId: string) {
      const { error } = await supabase
        .from('registrations')
        .delete()
        .eq('event_id', eventId);

      if (error) throw error;
    },
  },

  chat: {
    async sendMessage(eventId: string, content: string) {
      const { error } = await supabase
        .from('chat_messages')
        .insert([{ event_id: eventId, content }]);

      if (error) throw error;
    },

    subscribeToMessages(eventId: string, callback: (message: any) => void) {
      return supabase
        .channel(`chat:${eventId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'chat_messages',
            filter: `event_id=eq.${eventId}`,
          },
          callback
        )
        .subscribe();
    },
  },

  questions: {
    async ask(eventId: string, content: string) {
      const { error } = await supabase
        .from('questions')
        .insert([{ event_id: eventId, content }]);

      if (error) throw error;
    },

    async vote(questionId: string) {
      const { error } = await supabase.rpc('increment_question_votes', {
        question_id: questionId,
      });

      if (error) throw error;
    },

    async markAsAnswered(questionId: string) {
      const { error } = await supabase
        .from('questions')
        .update({ answered: true })
        .eq('id', questionId);

      if (error) throw error;
    },
  },
};