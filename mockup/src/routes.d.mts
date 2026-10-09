export type RouteId = 'home' | 'tech' | 'sound' | 'arts' | 'freedom' | 'library' | 'catalogue' | 'not-found';
export type World = { id: RouteId; path: string; label: string; note: string; image: string; summary: string };
export type Route = { id: RouteId; path: string; label: string; title: string; description: string };
export const worlds: World[];
export const routes: Route[];
export function routeForPath(pathname: string): Route;
export function legacyDestination(pathname: string, hash: string, search?: string): string | null;
