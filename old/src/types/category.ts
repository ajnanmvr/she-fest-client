import * as z from 'zod';
export const editCategorySchema = z.object({
    name: z.string().min(1, { message: 'Required' }),
    section: z.string().min(1, { message: 'Required' })
  });