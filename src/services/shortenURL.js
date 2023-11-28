const { v4: uuidv4 } = require("uuid");

const generateId = () => {
  const uuid = uuidv4();
  return uuid.slice(0, 7);
};

export const checkURL = (short) => {
  return fetch("http://localhost:3001/checkURL", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      uuid: short,
    }),
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("Error");
    });
};

export const shortenURL = (longURL,uid) => {
  const uuid = generateId();
  return fetch("http://localhost:3001/checkURL", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      uuid: uuid,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.result && res.result.length === 0) {
        return fetch("http://localhost:3001/shortenURL", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            long: longURL,
            short: uuid,
            url: `http://localhost:3000/${uuid}`,
            user_id:uid
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            return {
              long: res.success.long,
              short: res.success.short,
              url: res.success.url,
              error: false,
            };
          })
          .catch((err) => {
            return { error: true };
          });
      } else {
        shortenURL();
      }
    })
    .catch((err) => {
      return { error: true };
    });
};

export const getURLs = (uid) => {
  return fetch(`http://localhost:3001/getURLs/${uid}`)
    .then((response) => response.json())
    .then((res) => {
      return res;
    });
};

export const deleteURL = (id) => {
  return fetch("http://localhost:3001/deleteURL", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id }),
  }).then((res)=>res.json())
    .then((res) => {
      return { error: false, result: res };
    })
    .catch((err) => {
      return { error: true };
    });
};
