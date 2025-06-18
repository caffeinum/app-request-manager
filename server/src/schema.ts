
import { z } from 'zod';

// AppRequest schema
export const appRequestSchema = z.object({
  id: z.number(),
  description: z.string(),
  generated_code: z.string().nullable(),
  status: z.enum(['pending', 'generating', 'completed', 'failed']),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type AppRequest = z.infer<typeof appRequestSchema>;

// Input schema for creating app requests
export const createAppRequestInputSchema = z.object({
  description: z.string().min(1, 'Description is required').max(5000, 'Description too long')
});

export type CreateAppRequestInput = z.infer<typeof createAppRequestInputSchema>;

// Input schema for updating app requests
export const updateAppRequestInputSchema = z.object({
  id: z.number(),
  generated_code: z.string().nullable().optional(),
  status: z.enum(['pending', 'generating', 'completed', 'failed']).optional()
});

export type UpdateAppRequestInput = z.infer<typeof updateAppRequestInputSchema>;

// Schema for getting a single app request
export const getAppRequestInputSchema = z.object({
  id: z.number()
});

export type GetAppRequestInput = z.infer<typeof getAppRequestInputSchema>;
