export interface DataAccess<T> {


  getPagedPosts(page: number, pageSize: number): Promise<T[]>;
  filterPostsByText(text: string): Promise<T[]>;
  add(t: T): Promise<void>;
  delete(id: number): Promise<void>;
  update(id: number, updateData: Partial<T>): Promise<void>;
  get(id: number): Promise<T>;
  getAll(): Promise<T>;
}
