import { z } from 'zod';

const queryParamValidator = z.object({
  name: z.string(),
  value: z.string(),
}).strict();

export const queryOptionsValidator = z.object({
  queryUrn: z.string(),
  mapResults: z.boolean(),
  namedParams: z.array(queryParamValidator).optional()
}).strict();

export const lokiEntityValidator = z.object({
  urn: z.string().regex(new RegExp("urn:com:[A-Za-z0-9][A-Za-z0-9-]{0,31}:([A-Za-z0-9()+,\\-.:=@;$_!*']|%[0-9A-Fa-f]{2})+"), "Valid URN required"),
});

export const stepValidator = z.object({
  name: z.string(),
  complete: z.boolean().or(z.null()),
  type: z.string(),
  actions: z.array(z.object({
    name: z.string(),
    description: z.string(),
    assignee: z.string(),
    complete: z.boolean(),
  })),
}).strict();

export const workflowValidator = lokiEntityValidator.extend({
  name: z.string(),
  templateName: z.string().optional(),
  templatename: z.string().optional(),
  description: z.string().optional(),
  category: z.string(),
  steps: z.string().transform((val) => {
    return JSON.parse(val);
  }).or(z.array(stepValidator)),
}).strict();

export type QueryOptions = z.infer<typeof queryOptionsValidator>;
export type Workflow = z.infer<typeof workflowValidator>;
export type LokiEntity = z.infer<typeof lokiEntityValidator>;
