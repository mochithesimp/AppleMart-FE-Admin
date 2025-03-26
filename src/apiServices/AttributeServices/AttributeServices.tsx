import * as request from "../../utils/request";

export const getAttribute = async () => {
  try {
    const res = await request.get("Attribute");
    return res;
  } catch (error) {
    console.log(error);
  }
};