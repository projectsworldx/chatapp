import { SetMetadata } from '@nestjs/common';

// Define a custom metadata key to mark public routes/methods
export const IS_PUBLIC_KEY = 'isPublic';

// Create a decorator function that sets the metadata for public routes/methods
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
