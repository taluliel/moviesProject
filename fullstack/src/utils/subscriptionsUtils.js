import axios from "axios";

const allSubscriptions = async () => {
  let resp = await axios.get("http://localhost:8000/api/subscriptions");
  let subscriptions = resp.data;
  return subscriptions;
};

const AddSubscriptions = async (obj) => {
  await axios.post(
    "http://localhost:8000/api/subscriptions/AddSubscriptions",
    obj
  );
  return allSubscriptions();
};

const getSubscriptionsByMovie = async (movieID) => {
  let subscriptionsData = [];
  let resp = await axios.get("http://localhost:8000/api/subscriptions");
  let subscriptions = resp.data;
  subscriptions.forEach((element) => {
    if (element.Movies.movieId === movieID) {
      subscriptionsData.push(element);
    }
  });

  return subscriptionsData;
};

const getSubscriptionsByMember = async (memberID) => {
  let subscriptionsData = [];
  let resp = await axios.get("http://localhost:8000/api/subscriptions");
  let subscriptions = resp.data;
  subscriptions.forEach((element) => {
    if (element.MemberId === memberID) {
      subscriptionsData.push(element);
    }
  });

  return subscriptionsData;
};

const subscriptionsUtils = {
  allSubscriptions,
  AddSubscriptions,
  getSubscriptionsByMovie,
  getSubscriptionsByMember,
};
export default subscriptionsUtils;
