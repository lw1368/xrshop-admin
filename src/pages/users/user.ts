import { useQuery } from "@apollo/client";

import { GET_USER_LIST } from "@/graphql/users";
import { User } from "@/types/api";

export const useUsers = (
  params: { name?: string; phone?: string },
  page: { current: number | undefined; pageSize: number | undefined }
) => {
  const { loading, error, data, refetch } = useQuery<User.TUserQuery>(
    GET_USER_LIST,
    {
      variables: {
        name: params.name || "",
        phone: params.phone || "",
        page: {
          pageNum: page.current,
          pageSize: page.pageSize,
        },
      },
    }
  );

  console.log(data, error);
  return {
    loading,
    error,
    refetch,
    page: data?.getUserlist.page,
    data: data?.getUserlist.data,
  };
};
