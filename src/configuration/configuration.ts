import { z } from 'zod';

const schema = z.object({
  TODOIST_API_KEY: z.string(),
  MONGODB_URI: z.string(),
  JWT_SECRET: z.string(),
});

export type ConfigurationType = z.output<typeof schema>;
export class Configuration {
  static validate(config: unknown) {
    const result = schema.safeParse(config);

    if (result.success === false) {
      console.error('Missing environment variables:');
      throw result.error;
    }

    return result.data;
  }
}
