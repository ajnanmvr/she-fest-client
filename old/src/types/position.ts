import * as z from 'zod';
export const addPositionSchema = z.object({
    name: z.string().min(1, { message: 'Required' }) ,
    pointGroup: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string"
    }),
    pointHouse:   z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string"
    }),
    pointSingle:  z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string"
    }),
    value:  z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string"
    })
  });