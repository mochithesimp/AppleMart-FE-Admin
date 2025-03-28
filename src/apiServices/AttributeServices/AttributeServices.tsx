import * as request from "../../utils/request";

export const getAttribute = async () => {
  try {
    const res = await request.get("/api/Attribute");
    return res;
  } catch (error) {
    console.log(error);
  }
};