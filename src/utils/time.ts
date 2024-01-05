import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("en");

export const fromNow = (timestamp: string) => {
  return dayjs(timestamp).fromNow();
};

export const prettyDate = (timestamp: string) => {
  return dayjs(timestamp).format("MMMM D, YYYY [at] h:mm A");
};
