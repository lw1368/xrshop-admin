export interface Result<T = any> {
  code: number;
  data: T;
  msg: string;
}
export interface ResultData<T = any> {
  list: T[];
  page: {
    pageNum: number;
    pageSize: number;
    total: number | 0;
  };
}
export interface PageParams {
  pageNum: number;
  pageSize?: number;
}

export interface IPage {
  pageNum: number;
  pageSize: number;
  total: number;
}

// 品牌管理
export interface BrandItem {
  id: number;
  name: string;
  img: string;
  sort: number;
  isUse: boolean;
}
// 分类管理
export interface CategoryItem {
  id: number;
  pid: number;
  name: string;
  img: string;
  sort: number;
  isUse: boolean;
}

// 用户管理
export type UserSearchParams = {
  userId?: number;
  userName?: string;
  state?: number;
};
export namespace User {
  export interface Params extends PageParams {
    userId?: number;
    userName?: string;
    state?: number;
  }

  export interface UserItem {
    _id: string;
    id: string;
    name: string;
    email?: string;
    deptId: string;
    state: number;
    phone: string;
    job: string;
    role: number;
    roleList: string;
    createId: number;
    deptName: string;
    userImg: string;
  }
  // export type TUserQuery = ResultData<User.UserItem>;
  export type TUserQuery = {
    [key: string]: {
      __typename?: "Query";
      // params: { name: string; phone: string };
      data: UserItem[];
      page: IPage;
    };
  };
  export interface CreateParams {
    userName: string;
    userEmail: string;
    mobile?: number;
    deptId: string;
    job?: string;
    state?: number;
    roleList: string[];
    userImg: string;
  }
  export interface EditParams extends CreateParams {
    userId: number;
  }
}

export namespace Role {
  export interface Params extends PageParams {
    roleName?: string;
  }
  export interface CreateParams {
    roleName: string;
    remark?: string;
  }
  export interface RoleItem extends CreateParams {
    _id: string;
    permissionList: {
      checkedKeys: string[];
      halfCheckedKeys: string[];
    };
    updateTime: string;
    createTime: string;
  }
  export interface EditParams extends CreateParams {
    _id: string;
  }
  export interface Permission {
    _id: string;
    permissionList: {
      checkedKeys: string[];
      halfCheckedKeys: string[];
    };
  }
}
