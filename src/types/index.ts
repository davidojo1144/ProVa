export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
}
