import { type SchemaTypeDefinition } from 'sanity';
import cars from './cars';
import rental from './rental';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [cars, rental],
}

export function concat(_arg0: { name: string; title: string; type: string; fields: ({ name: string; title: string; type: string; to?: undefined; } | { name: string; title: string; type: string; to: { type: string; }[]; })[]; }[]): any {
  throw new Error("Function not implemented.");
}
