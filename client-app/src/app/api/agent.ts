import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Job, JobBid } from "../models/job";
import { PaginatedResult } from "../models/pagination";
import { Photo, Profile, Skill, UserFile } from "../models/profile";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    if (process.env.NODE_ENV === "development") await sleep(1000);

    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResult(
        response.data,
        JSON.parse(pagination)
      );
      return response as AxiosResponse<PaginatedResult<any>>;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config, headers } = error.response!;
    switch (status) {
      case 400:
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          history.push("/not-found");
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        if (
          status === 401 &&
          headers["www-authenticate"]?.startsWith('Bearer error="invalid_token')
        ) {
          store.userStore.logout();
          toast.error("Session expired - please login again");
        }
        break;
      case 404:
        history.push("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        history.push("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Account = {
  current: () => requests.get<User>("/account"),
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
  register: (user: UserFormValues) =>
    requests.post<User>("/account/register", user),
  refreshToken: () => requests.post<User>("/account/refreshToken", {}),
  verifyEmail: (token: string, email: string) =>
    requests.post<void>(
      `/account/verifyEmail?token=${token}&email=${email}`,
      {}
    ),
  resendEmailConfirm: (email: string) =>
    requests.get(`/account/resendEmailConfirmationLink?email=${email}`),
};

const Profiles = {
  get: (userName: string) => requests.get<Profile>(`/profiles/${userName}`),
  uploadProfilePhoto: (file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios.post<Photo>("photos", formData, {
      headers: { "Content-type": "multipart/form-data" },
    });
  },
  deletePhoto: (id: string) => requests.del(`/photos/${id}`),
  updateProfile: (profile: Partial<Profile>) =>
    requests.put(`/profiles`, profile),
  addCV: (cv: UserFile) => requests.put("/profiles/cv", cv),
  addAccountLinks: (profile: Partial<Profile>) =>
    requests.put("/profiles/accountLinks", profile),
};

const Files = {
  uploadFile: (file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios.post<UserFile>("files", formData, {
      headers: { "Content-type": "multipart/form-data" },
    });
  },
};

const Experts = {
  list: (params: URLSearchParams) =>
    axios
      .get<PaginatedResult<Profile[]>>("/experts", { params })
      .then(responseBody),
};

const Skills = {
  listUsed: (params: URLSearchParams) =>
    axios.get<Skill[]>("/skills", { params }).then(responseBody),
  listAll: () => requests.get<Skill[]>("/skills/all"),
  listJobRequired: (params: URLSearchParams) =>
    axios.get<Skill[]>("/skills/job-required", { params }).then(responseBody),
};

const Jobs = {
  get: (id: string) => requests.get<Job>(`/jobs/${id}`),
  list: (params: URLSearchParams) =>
    axios.get<PaginatedResult<Job[]>>("/jobs", { params }).then(responseBody),
  listUser: (userName: string, params: URLSearchParams) =>
    axios
      .get<PaginatedResult<Job[]>>(`/jobs/user/${userName}`, { params })
      .then(responseBody),
  add: (job: Partial<Job>) => requests.post("/jobs", job),
  delete: (id: string) => requests.del(`/jobs/${id}`),
  addBid: (jobId: string, jobBid: Partial<JobBid>) =>
    requests.post(`/jobs/${jobId}/bid`, jobBid),
  deleteBid: (jobBidId: string) => requests.del(`/jobs/bids/${jobBidId}`),
  acceptBid: (jobId: string, jobBidId: string) =>
    requests.del(`/jobs/${jobId}/${jobBidId}`,),
};

const agent = {
  Account,
  Profiles,
  Experts,
  Skills,
  Jobs,
  Files,
};

export default agent;
