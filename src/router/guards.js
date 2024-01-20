import { useAuthGuard } from 'src/features/auth/guards/auth.guard';
import { useGuestGuard } from 'src/features/auth/guards/guest.guard';

export const guards = [useAuthGuard, useGuestGuard];
