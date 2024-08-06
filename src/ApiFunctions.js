import axios from "axios";
axios.defaults.baseURL =
  "https://proxy.cors.sh/https://live.devnimble.com/api/v1";

const END_POINT_FOR_LIST = "/contacts";
const END_POINT_FOR_CREATE = "/contact";
const ACCESS_TOKEN = "VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn";
const headers = {
  headers: {
    "x-cors-api-key": "temp_67611e2d3685d187cca2b6113d9b2df7",
  },
};
axios.defaults.headers.common.Authorization = `Bearer ${ACCESS_TOKEN}`;

export async function getContactsList() {
  const options = {
    headers: {
      "x-cors-api-key": "temp_67611e2d3685d187cca2b6113d9b2df7",
    },
    params: {
      sort: "created:desc",
    },
  };

  const result = await axios.get(`${END_POINT_FOR_LIST}`, options);
  return result.data;
}

export async function createContact(data) {
  const properties = {
    record_type: "person",
    privacy: {
      edit: null,
      read: null,
    },
    owner_id: null,
    fields: {
      email: [
        {
          label: "email",
          modifier: "other",
          value: data.Email,
          is_primary: false,
        },
      ],
      "first name": [
        {
          label: "first name",
          modifier: "",
          value: data.FirstName || " ",
          is_primary: false,
        },
      ],
      "last name": [
        {
          label: "last name",
          modifier: "",
          value: data.LastName || " ",
          is_primary: false,
        },
      ],
    },
  };

  const result = await axios.post(
    `${END_POINT_FOR_CREATE}`,
    properties,
    headers
  );
  return result.data;
}

export async function deleteContact(id) {
  await axios.delete(`${END_POINT_FOR_CREATE}/${id}`, headers);
}

export async function fetchContact(id) {
  const result = await axios.get(`${END_POINT_FOR_CREATE}/${id}`, headers);
  return result.data;
}

export async function addTag(data) {
  const properties = {
    tags: data.contactData,
  };
  await axios.put(`${END_POINT_FOR_LIST}/${data.id}/tags`, properties, headers);
}
