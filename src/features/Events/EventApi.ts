import { getApiUrl, fetchWithAuth } from '../../config/api';

export interface Event {
  id: number;
  title: string;
  description?: string;
  date: string;
  location?: string;
  organizer_id?: number;
  created_at?: string;
  updated_at?: string;
}

export const fetchEvents = async (): Promise<Event[]> => {
  const url = getApiUrl('EVENTS', '/');
  const response = await fetchWithAuth(url);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error loading events");
  }
  return response.json();
};

export const fetchEventById = async (id: number): Promise<Event> => {
  const url = getApiUrl('EVENTS', `/${id}`);
  const response = await fetchWithAuth(url);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error loading event");
  }
  return response.json();
};

export const createEvent = async (eventData: {
  title: string;
  description?: string;
  date: string;
  location?: string;
  organizer_id?: number;
}): Promise<{ message: string; id: number }> => {
  const url = getApiUrl('EVENTS', '/');
  const response = await fetchWithAuth(url, {
    method: "POST",
    body: JSON.stringify(eventData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error creating event");
  }
  return response.json();
};

export const updateEvent = async (id: number, eventData: Partial<Event>): Promise<{ message: string; id: number }> => {
  const url = getApiUrl('EVENTS', `/${id}`);
  const response = await fetchWithAuth(url, {
    method: "PUT",
    body: JSON.stringify(eventData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error updating event");
  }
  return response.json();
};

export const deleteEvent = async (id: number): Promise<{ message: string }> => {
  const url = getApiUrl('EVENTS', `/${id}`);
  const response = await fetchWithAuth(url, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error deleting event");
  }
  return response.json();
};

