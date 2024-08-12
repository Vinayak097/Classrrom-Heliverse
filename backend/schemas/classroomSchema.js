import { z } from 'zod';

const classroomSchema = z.object({
  name: z.string().min(1),
  startTime: z.string().regex(/^\d{2}:\d{2}$/), // HH:MM format
  endTime: z.string().regex(/^\d{2}:\d{2}$/),
  days: z.array(z.string()).nonempty(),
  teacher: z.string().optional(),
});

export default { classroomSchema };
