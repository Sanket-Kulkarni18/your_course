export const convert_time = (duration) => {
  var a = duration.match(/\d+/g);

  if (
    duration.indexOf("M") >= 0 &&
    duration.indexOf("H") === -1 &&
    duration.indexOf("S") === -1
  ) {
    a = [0, a[0], 0];
  }

  if (duration.indexOf("H") >= 0 && duration.indexOf("M") === -1) {
    a = [a[0], 0, a[1]];
  }
  if (
    duration.indexOf("H") >= 0 &&
    duration.indexOf("M") === -1 &&
    duration.indexOf("S") === -1
  ) {
    a = [a[0], 0, 0];
  }

  duration = 0;

  if (a.length === 3) {
    duration = duration + parseInt(a[0]) * 3600;
    duration = duration + parseInt(a[1]) * 60;
    duration = duration + parseInt(a[2]);
  }

  if (a.length === 2) {
    duration = duration + parseInt(a[0]) * 60;
    duration = duration + parseInt(a[1]);
  }

  if (a.length === 1) {
    duration = duration + parseInt(a[0]);
  }
  // duration is in seconds
  return duration;
};

export const getVideoId = (url) => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
};

export const secondsToHms = (d) => {
  d = Number(d);

  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  let hms =
    ("0" + h).slice(-2) + ":" + ("0" + m).slice(-2) + ":" + ("0" + s).slice(-2);

  return hms.slice(0, 2) === "00" ? hms.slice(3, hms.length) : hms;
};

export const getUserData = (userData) => {
  return {
    uid: userData.uid,
    userName: userData.displayName,
    profilePic: userData.photoURL,
    email: userData.email,
  };
};
