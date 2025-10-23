import { z } from 'zod';

// Booking validation schema
export const bookingSchema = z.object({
  name: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  phone: z.string()
    .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone format. Use 10-15 digits, optionally starting with +'),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email too long'),
  service: z.enum([
    'Classic Haircut - R250',
    'Beard Trim & Shaping - R150',
    'Hot Towel Shave - R200',
    'Haircut & Beard Combo - R350',
    'Kids Haircut - R180',
    'Hair Coloring - R400',
    'Scalp Treatment - R300',
    'Deluxe Grooming Package - R600'
  ], { errorMap: () => ({ message: 'Please select a valid service' }) }),
  preferred_date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  preferred_time: z.string()
    .regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
  notes: z.string()
    .max(500, 'Notes must be less than 500 characters')
    .optional()
    .or(z.literal(''))
});

export type BookingFormData = z.infer<typeof bookingSchema>;

// Sanitize HTML to prevent XSS in emails
export const sanitizeForEmail = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};
