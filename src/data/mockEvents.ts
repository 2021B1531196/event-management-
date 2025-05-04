import { Event } from '../types/event';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Web Development Summit 2025',
    description: 'Join the premier web development conference featuring talks from industry leaders. Learn about the latest frameworks, tools, and best practices.',
    category: 'Technology',
    startTime: '2025-05-15T09:00:00.000Z',
    endTime: '2025-05-15T17:00:00.000Z',
    location: 'Virtual',
    coverImage: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    price: 0,
    featured: true,
    attendees: 245,
    organizer: {
      id: '101',
      name: 'John Smith',
      role: 'Lead Developer',
      avatar: 'https://i.pravatar.cc/150?u=john@example.com'
    }
  },
  {
    id: '2',
    title: 'Digital Marketing Masterclass',
    description: 'A comprehensive masterclass on digital marketing strategies, SEO, content marketing, and social media advertising.',
    category: 'Business',
    startTime: '2025-05-20T14:00:00.000Z',
    endTime: '2025-05-20T16:00:00.000Z',
    location: 'Virtual',
    coverImage: 'https://images.pexels.com/photos/7688454/pexels-photo-7688454.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    price: 29.99,
    featured: false,
    attendees: 178,
    organizer: {
      id: '102',
      name: 'Emily Chen',
      role: 'Marketing Director',
      avatar: 'https://i.pravatar.cc/150?u=emily@example.com'
    }
  },
  {
    id: '3',
    title: 'Data Science Workshop',
    description: 'Learn the fundamentals of data science, machine learning, and practical applications with Python and R.',
    category: 'Technology',
    startTime: '2025-06-05T10:00:00.000Z',
    endTime: '2025-06-05T16:00:00.000Z',
    location: 'Virtual',
    coverImage: 'https://images.pexels.com/photos/4050318/pexels-photo-4050318.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    price: 49.99,
    featured: true,
    attendees: 132,
    organizer: {
      id: '103',
      name: 'Michael Lee',
      role: 'Data Scientist',
      avatar: 'https://i.pravatar.cc/150?u=michael@example.com'
    }
  },
  {
    id: '4',
    title: 'Virtual Yoga Retreat',
    description: 'Join our weekend virtual yoga retreat featuring sessions from renowned yoga instructors and wellness experts.',
    category: 'Health',
    startTime: '2025-06-12T08:00:00.000Z',
    endTime: '2025-06-13T16:00:00.000Z',
    location: 'Virtual',
    coverImage: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    price: 19.99,
    featured: false,
    attendees: 86,
    organizer: {
      id: '104',
      name: 'Sarah Johnson',
      role: 'Yoga Instructor',
      avatar: 'https://i.pravatar.cc/150?u=sarah@example.com'
    }
  },
  {
    id: '5',
    title: 'UX Design Conference',
    description: 'Explore the latest trends in user experience design with talks from leading designers and product managers.',
    category: 'Design',
    startTime: '2025-06-18T09:00:00.000Z',
    endTime: '2025-06-18T17:00:00.000Z',
    location: 'Virtual',
    coverImage: 'https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    price: 39.99,
    featured: true,
    attendees: 154,
    organizer: {
      id: '105',
      name: 'David Wilson',
      role: 'UX Designer',
      avatar: 'https://i.pravatar.cc/150?u=david@example.com'
    }
  },
  {
    id: '6',
    title: 'Financial Planning Workshop',
    description: 'Learn effective financial planning strategies, investment options, and retirement planning from certified financial planners.',
    category: 'Finance',
    startTime: '2025-06-25T14:00:00.000Z',
    endTime: '2025-06-25T17:00:00.000Z',
    location: 'Virtual',
    coverImage: 'https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    price: 0,
    featured: false,
    attendees: 95,
    organizer: {
      id: '106',
      name: 'Robert Brown',
      role: 'Financial Advisor',
      avatar: 'https://i.pravatar.cc/150?u=robert@example.com'
    }
  },
  {
    id: '7',
    title: 'Art & Creativity Summit',
    description: 'A creative summit featuring workshops, demonstrations, and talks from artists, photographers, and designers.',
    category: 'Arts',
    startTime: '2025-07-02T10:00:00.000Z',
    endTime: '2025-07-02T18:00:00.000Z',
    location: 'Virtual',
    coverImage: 'https://images.pexels.com/photos/3094219/pexels-photo-3094219.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    price: 25.99,
    featured: false,
    attendees: 112,
    organizer: {
      id: '107',
      name: 'Lisa Wang',
      role: 'Artist',
      avatar: 'https://i.pravatar.cc/150?u=lisa@example.com'
    }
  },
  {
    id: '8',
    title: 'Product Management Bootcamp',
    description: 'An intensive bootcamp covering all aspects of product management, from ideation to launch and beyond.',
    category: 'Business',
    startTime: '2025-07-10T09:00:00.000Z',
    endTime: '2025-07-12T17:00:00.000Z',
    location: 'Virtual',
    coverImage: 'https://images.pexels.com/photos/3153207/pexels-photo-3153207.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    price: 199.99,
    featured: false,
    attendees: 78,
    organizer: {
      id: '108',
      name: 'James Miller',
      role: 'Product Manager',
      avatar: 'https://i.pravatar.cc/150?u=james@example.com'
    }
  },
  {
    id: '9',
    title: 'Science and Innovation Forum',
    description: 'Explore the latest scientific breakthroughs and technological innovations across various fields.',
    category: 'Education',
    startTime: '2025-07-15T13:00:00.000Z',
    endTime: '2025-07-15T18:00:00.000Z',
    location: 'Virtual',
    coverImage: 'https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    price: 0,
    featured: false,
    attendees: 205,
    organizer: {
      id: '109',
      name: 'Dr. Olivia Taylor',
      role: 'Research Scientist',
      avatar: 'https://i.pravatar.cc/150?u=olivia@example.com'
    }
  }
];