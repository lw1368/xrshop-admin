import { create } from "zustand";

interface UserItem {
  _id: string;
  userId: number;
  userName: string;
  userEmail: string;
  deptId: string;
  state: number;
  mobile: string;
  job: string;
  role: number;
  roleList: string;
  createId: number;
  deptName: string;
  userImg: string;
}

export const useStore = create<{
  token: string;
  userInfo: UserItem;
  collapsed: boolean;
  updateToken: (token: string) => void;
  updateUserInfo: (userInfo: UserItem) => void;
  updateCollapsed: () => void;
}>((set) => ({
  token: "",
  userInfo: {
    _id: "",
    userId: 0,
    userName: "",
    userEmail: "",
    deptId: "",
    state: 0,
    mobile: "",
    job: "",
    role: 0,
    roleList: "",
    createId: 0,
    deptName: "",
    userImg: "",
  },
  collapsed: false,
  updateToken: (token) => set({ token }),
  updateUserInfo: (userInfo: UserItem) => set({ userInfo }),
  updateCollapsed: () =>
    set((state) => {
      return {
        collapsed: !state.collapsed,
      };
    }),
}));
