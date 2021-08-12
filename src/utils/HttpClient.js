export default {
  get(url, options) {
    fetch(
      new Request(url, {
        mode: "no-cors",
      }),
      options
    )
      .then((res) => {
        console.log(res);
        res.json();
      })
      .then((res) => {
        console.log(res);
      });
  },
  post() {},
  delete() {},
  put() {},
  head() {},
  options() {},
};

fetch("https://acc-ds.t1t.io/v3_5/versions/latest", {
  headers: {
    accept: "application/json",
    "access-control-allow-origin": "*",
    "sec-ch-ua":
      '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
    "sec-ch-ua-mobile": "?0",
  },
  referrer: "http://localhost:8080/",
  referrerPolicy: "strict-origin-when-cross-origin",
  body: null,
  method: "GET",
  mode: "cors",
  credentials: "omit",
});
