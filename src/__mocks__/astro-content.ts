export type CollectionEntry<T extends string> = {
  id: string;
  slug: string;
  body: string;
  data: Record<string, any>;
};

export async function getCollection(_name: string, _filter?: any) {
  return [];
}
