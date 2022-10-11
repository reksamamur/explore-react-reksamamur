import { data } from "../../data/data";

const dataUpcoming = data.filter((obj) => {
  return obj.category_id === "0";
});

const dataReady = data.filter((obj) => {
  return obj.category_id === "1";
});

const dataClaimed = data.filter((obj) => {
  return obj.category_id === "2";
});

export { data, dataUpcoming, dataReady, dataClaimed };
