import request from "@/utils/request";
import { ResultData, BrandItem } from "@/types/api";

export default {
  getBrandList(params: any) {
    return request.get<ResultData<BrandItem>>("/brands/list", params);
  },
};
