export interface User {
  id: number;
  name: string;
}

export interface Message {
  id: number;
  from: number;
  to: number;
  message: string;
  file?: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserWithLastMessage extends User {
  last_message: Message | null;
}
