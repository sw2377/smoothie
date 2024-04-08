export interface UserCardListDataType {
  id?: number;
  title: string;
  position: string;
  keywords: string[];
  createdAt: string | Date;
  modifiedAt?: string | Date;
  techTags: string[];
  userId?: string;
  // nickname: string; // userNickname
  // userImageUrl: string;
}

export interface ProjectListDataType {
  id: number; // PK
  title: string;
  content: string;
  position: string;
  status: string;
  views: number;
  techTags: string[];
  startDate: string | Date;
  endDate: string | Date;
  createdAt: string | Date;
  modifiedAt: string | Date;
  userId: number; // FK
  replyList?: ReplyDataType[];
  // writerNickName: string;
  // writerImageURL: string;
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
// export type ProjectListResponse = ApiResonse<ProjectListDataType>;
