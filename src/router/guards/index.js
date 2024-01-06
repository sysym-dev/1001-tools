import { useAuthGuard } from './auth.guard';
import { useGuestGuard } from './guest.guard';

export const guards = [useAuthGuard, useGuestGuard];
