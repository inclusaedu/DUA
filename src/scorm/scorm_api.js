var API = null;

function findAPI(win) {
  var attempts = 0;
  while ((!win.API) && (win.parent) && (win.parent != win) && (attempts < 500)) {
    attempts++;
    win = win.parent;
  }
  return win.API;
}

function initAPI() {
  API = findAPI(window);
  if (!API) {
    console.warn("SCORM API not found. Running in standalone mode.");
  }
}

function LMSInitialize(param) {
  if (API) {
    return API.LMSInitialize(param);
  }
  console.log("SCORM: LMSInitialize(" + param + ") - standalone mode");
  return "true";
}

function LMSSetValue(name, value) {
  if (API) {
    return API.LMSSetValue(name, value);
  }
  console.log("SCORM: LMSSetValue(" + name + ", " + value + ") - standalone mode");
  return "true";
}

function LMSGetValue(name) {
  if (API) {
    return API.LMSGetValue(name);
  }
  console.log("SCORM: LMSGetValue(" + name + ") - standalone mode");
  return "";
}

function LMSCommit(param) {
  if (API) {
    return API.LMSCommit(param);
  }
  console.log("SCORM: LMSCommit(" + param + ") - standalone mode");
  return "true";
}

function LMSFinish(param) {
  if (API) {
    return API.LMSFinish(param);
  }
  console.log("SCORM: LMSFinish(" + param + ") - standalone mode");
  return "true";
}

function LMSGetLastError() {
  if (API) {
    return API.LMSGetLastError();
  }
  return "0";
}

function LMSGetErrorString(errCode) {
  if (API) {
    return API.LMSGetErrorString(errCode);
  }
  return "";
}

function LMSGetDiagnostic(errCode) {
  if (API) {
    return API.LMSGetDiagnostic(errCode);
  }
  return "";
}

document.addEventListener("DOMContentLoaded", function () {
  initAPI();
  LMSInitialize("");
});
