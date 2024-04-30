export interface ProjectDataType {
  id?: number;
  title: string;
  description: string;
  repo_url: string;
  image_url?: string;
  inside_project: boolean;
  created_at?: string | Date;
  modified_at?: string | Date;
  profile_id: string;
}

export interface ProfileDataType {
  id?: string;
  user_name: string;
  email: string;
  avatar_url: string;
  position: string;
  created_at?: string | Date;
  modified_at?: string | Date;
  cover_letter: string;
  tech_tags: string[];
  hard_skills: string[];
  soft_skills: string[];
  projects: ProjectDataType[];
}

export interface ReviewDataType {
  id?: number;
  title: string;
  content: string;
  writer_id: string;
  project_id: number;
  created_at?: string | Date;
  receiver_id: string;
  projects: ProjectDataType;
}
