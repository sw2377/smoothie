import { UserListDataType, ProjectListDataType } from "./board.types";

export type CardType = "USER_CARD" | "PROJECT_CARD";
export type CardDataType = UserListDataType | ProjectListDataType;
