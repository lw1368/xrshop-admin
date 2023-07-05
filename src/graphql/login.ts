import { gql } from "@apollo/client";

export const SEND_CODE_MSG = gql`
  mutation sendCodeMsg($phone: String!) {
    sendCodeMsg(phone: $phone) {
      code
      message
      data
    }
  }
`;

export const LOGIN = gql`
  mutation login($phone: String!, $code: String!) {
    login(phone: $phone, code: $code) {
      code
      message
      data
    }
  }
`;
