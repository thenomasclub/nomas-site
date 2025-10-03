export const partnersQuery = `*[_type == "partner"] | order(priority asc) {
  _id,
  name,
  "logo": logo.asset->url,
  website,
  discount
}`;
