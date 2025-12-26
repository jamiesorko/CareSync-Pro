
import { supabase } from '../lib/supabase';
import { BaseEntity } from '../types';

export interface InternalEmail extends BaseEntity {
  senderId: string;
  senderName: string;
  recipientRole: string;
  subject: string;
  body: string;
  isRead: boolean;
  priority: 'NORMAL' | 'URGENT';
}

export class EmailService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  async getInbox(staffId: string): Promise<InternalEmail[]> {
    // Mocking inbox for demo mode
    return [
      {
        id: 'em-1',
        companyId: this.companyId || 'demo',
        senderId: 'coord1',
        senderName: 'Nyota Uhura (Dispatch)',
        recipientRole: 'PSW',
        subject: 'Shift Update: Robert Johnson',
        body: 'Please note the new lift protocol for this mornings visit.',
        isRead: false,
        priority: 'NORMAL',
        createdAt: new Date().toISOString()
      },
      {
        id: 'em-2',
        companyId: this.companyId || 'demo',
        senderId: 'hr1',
        senderName: 'Toby (HR)',
        recipientRole: 'PSW',
        subject: 'T4 Documentation Ready',
        body: 'Your 2024 tax documents are now available in the Vault.',
        isRead: true,
        priority: 'NORMAL',
        createdAt: new Date().toISOString()
      }
    ];
  }

  async sendEmail(email: Omit<InternalEmail, 'id' | 'isRead' | 'createdAt' | 'companyId'>): Promise<void> {
    console.log(`[EMAIL_CORE]: Transmitting internal message to ${email.recipientRole}`, email);
    if (supabase && this.companyId) {
      await supabase.from('internal_emails').insert([{
        ...email,
        company_id: this.companyId,
        is_read: false
      }]);
    }
  }
}

export const emailService = new EmailService();
