export interface ActionItem {
  id: string;
  task: string;
  owner?: string;
  due?: string;
  done: boolean;
}

export interface TranscriptHistory {
  id: string;
  transcript: string;
  tasks: ActionItem[];
  createdAt: string;
}
