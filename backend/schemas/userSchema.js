import { z } from 'zod';
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  role: z.enum(['Principal', 'Teacher', 'Student']),
  classroom: z.string().optional(),
});

const loginSchema = userSchema.pick({
  email: true,
  password: true,
});

const registrationSchema = userSchema;

export {loginSchema,registrationSchema};
