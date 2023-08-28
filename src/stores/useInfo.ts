import { create } from "zustand";

export default create<Info & { setInfo: (info: Info) => void }>((set) => ({
  setInfo: (info: Info) => set(() => info),
}));

export type Info = {
  name?: string;
  description?: string;
  serie?: string;
  unitOfUse?: string;
};
