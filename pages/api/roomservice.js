// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// room API key
const API_KEY = "NQyFH0MwRrsGKytaHS5iQ";

// random number generator for username
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// the request/response template from the roomservice documentation
export default async (req, res) => {
  const body = req.body;
  const user = "user-" + JSON.stringify(getRandomInt(1000000, 10000000)) + JSON.stringify(getRandomInt(1000000, 10000000)) + JSON.stringify(getRandomInt(1000000, 10000000)) + JSON.stringify(getRandomInt(1000000, 10000000));

  const r = await fetch("https://super.roomservice.dev/provision", {
    method: "post",
    headers: {
      Authorization: `Bearer: ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: user,
      resources: body.resources,
    }),
  });

  const json = await r.json();
  res.json(json);
};
