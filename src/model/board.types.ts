export interface UserCardListDataType {
  id?: number;
  title: string;
  position: string;
  keywords: string[];
  created_at: string | Date;
  modified_at?: string | Date;
  tech_tags: string[];
  user_id?: string;
  user_name: string;
  avatar_url: string;
}

export interface ProjectCardListDataType {
  id: number; // PK
  title: string;
  content: string;
  position: string[];
  status: string;
  views: number;
  tech_tags: string[];
  start_date: string | Date;
  end_date: string | Date;
  created_at: string | Date;
  modified_at: string | Date;
  user_id: number;
  user_name: string;
  avatar_url: string;
  reply_list?: ReplyDataType[];
}

export interface ReplyDataType {
  writerId: number;
  writerNickName: string;
  writerImageURL: string;
  replyId: number;
  content: string;
  acceptType: string | "NONE" | "ACCEPT" | "REFUSE";
  createAt: string;
  apply: boolean;
}

// export interface PageInfo {
//   page: number;
//   size: number;
//   totalElements: number;
//   totalpages: number;
// }

export interface ApiResonse<T> {
  data: T[];
  // pageInfo: PageInfo;
}

// export type UserListResponse = ApiResonse<UserListDataType>;
// export type ProjectListResponse = ApiResonse<ProjectCardListDataType>;
