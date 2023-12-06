import * as z from 'zod';
export const addSectionSchema = z.object({
    name: z.string().min(1, { message: 'Required' })
  });