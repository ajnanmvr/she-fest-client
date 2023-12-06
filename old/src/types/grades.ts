import * as z from 'zod';

export const addGradeSchema = z.object({
  username: z.string().min(1, { message: 'Required' }),
  password: z.string().min(1 , { message: 'Required' }),
});

export interface Login{
    username: string;
    password: string;
}
