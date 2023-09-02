namespace NodeJS {
   interface ProcessEnv {}
}

import { z } from 'zod';

export const envVariables = z.object({
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string({
      description: 'String please',
   }),
   CLERK_SECRET_KEY: z.string({ description: 'String please' }),
   NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string({ description: 'String please' }),
   NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string({ description: 'String please' }),
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string({
      description: 'String please',
   }),
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string({
      description: 'String please',
   }),
   UPLOADTHING_SECRET: z.string({ description: 'String please' }),
   UPLOADTHING_APP_ID: z.string({ description: 'String please' }),
   NEXT_PUBLIC_SITE_URL: z.string({ description: 'String please' }),
});

declare global {
   namespace NodeJS {
      interface ProcessEnv extends z.infer<typeof envVariables> {}
   }
}
