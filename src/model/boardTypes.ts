export interface UserListDataType {
  teamBoardId?: number;
  title: string;
  position: string;
  keywords: string[];
  accountId?: number;
  teamBoardImageUrl?: string;
  techTagList: string[] | number[];
  nickname?: string;
  createdAt: string;
  modifiedAt?: string;
}

export interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalpages: number;
}
