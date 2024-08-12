import { z } from 'zod';

const timetableSchema = z.object({
  classroom: z.string(),
  subject: z.string().min(1),
  periods: z.array(z.object({
    day: z.string(),
    startTime: z.string().regex(/^\d{2}:\d{2}$/),
    endTime: z.string().regex(/^\d{2}:\d{2}$/),
  })).nonempty(),
});

export default { timetableSchema };
