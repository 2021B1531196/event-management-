export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  startTime: string;
  endTime: string;
  location: string;
  coverImage: string;
  price: number;
  featured: boolean;
  attendees: number;
  organizer: {
    id: string;
    name: string;
    role: string;
    avatar: string;
  };
}