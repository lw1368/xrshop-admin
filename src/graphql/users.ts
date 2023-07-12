import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUserInfo {
    getUserInfo {
      id
      tel
      desc
      name
      avatar
      pageNum
      pageSize
    }
  }
`;

export const GET_USER_LIST = gql`
  query getUserlist($name: String!, $phone: String!, $page: PageInput!) {
    getUserlist(name: $name, phone: $phone, page: $page) {
      code
      message
      data {
        email
        phone
        name
        id
      }
      page {
        pageNum
        pageSize
        total
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUserInfo($id: String!, $params: UserInput!) {
    updateUserInfo(id: $id, params: $params) {
      code
      message
    }
  }
`;

export const CREATE_USER = gql`
  mutation create($params: UserInput!) {
    create(params: $params) {
      code
      message
    }
  }
`;

export const DELETE_USER = gql`
  mutation del($ids: String!) {
    del(ids: $ids) {
      code
      message
    }
  }
`;
