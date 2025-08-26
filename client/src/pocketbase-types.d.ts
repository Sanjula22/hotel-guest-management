import { RecordService } from 'pocketbase';

interface Guest {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  date_of_birth: string; // ISO date string
}

interface TypedPocketBase extends RecordService {
  collection(idOrName: 'guests'): RecordService<Guest>;
}

declare module 'pocketbase' {
  interface PocketBase {
    collection(idOrName: string): RecordService;
    collection(idOrName: 'guests'): RecordService<Guest>;
  }
}