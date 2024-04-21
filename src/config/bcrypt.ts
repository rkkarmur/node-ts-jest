import * as bcrypt from "bcrypt";
const saltRounds = 10;

const encrypt = async (data:string) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(data, salt);
    return hash;
  } catch (error) {
    return false;
  }
};

const compare = async (data:string, hash:string) => {
  const value = await bcrypt.compare(data, hash);
  return value;
};
export { encrypt, compare };