export interface UserListDataType {
  userListId: number;
  title: string;
  position: string;
  keywords: string[];
  createdAt: string | Date;
  modifiedAt: string | Date;
  // 밑에 프로젝트 리스트처럼 writer로 바꾸기!!
  accountId: number;
  nickname: string;
  userImageUrl: string;
  techTagList: string[];
}

export interface ProjectListDataType {
  projectListId: number;
  title: string;
  content: string;
  position: string;
  status: string;
  views: number;
  techTagList: string[];
  startDate: string | Date;
  endDate: string | Date;
  createdAt: string | Date;
  modifiedAt: string | Date;
  writerId: number;
  writerNickName: string;
  writerImageURL: string;
  replyList?: ReplyDataType[];
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
