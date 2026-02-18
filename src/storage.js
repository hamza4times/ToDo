export {storageAvailable, getItem, setItem, clearStorage}; // <============= functions

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function clearStorage(){
    if (storageAvailable("localStorage")){
        localStorage.clear();
    } else {
        return 0;
    }
}

// <-------------------- Improved functions ------------------------>

function getItem(key){
    if (storageAvailable("localStorage")){
        localStorage.getItem(JSON.parse(String(key)));
    }else{
        return 0;
    }
}

function setItem(key, value){
    if (storageAvailable("localStorage")){
        localStorage.setItem(key, JSON.stringify(value));
    }else{
        return 0;
    }
}