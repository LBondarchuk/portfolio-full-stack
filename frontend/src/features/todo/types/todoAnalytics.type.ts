export type TodoAnalyticsItem = {
  name: string;
  value: number;
};

export type TodoAnalyticsDay = {
  day: string;
  value: number;
};

export type TodoAnalytics = {
  summary: {
    total: number;
    completed: number;
    inProgress: number;
    highPriority: number;
    completionRate: number;
  };

  status: TodoAnalyticsItem[];

  categories: TodoAnalyticsItem[];

  priorities: TodoAnalyticsItem[];

  weeklyCompletion: TodoAnalyticsDay[];
};

export type TodoSummary = TodoAnalytics["summary"];
