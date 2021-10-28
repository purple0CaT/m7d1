interface ReduxStore {
  user: {
    name: string;
    image: string;
    favorites: string[];
    favoriteJobs: Job[];
  };
  search: {
    searchQuery: string;
    type: string;
    loading: boolean;
    data: any;
    page: number;
    error: string;
  };
}
interface Job {
  _id: string;
  url: string;
  title: string;
  company_name: string;
  category: string;
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  salary: string;
  description: string;
}

export type { ReduxStore, Job };
