export default {

  get: (key) => {
    console.log('get storage');
    const data = localStorage.getItem(key);
    
    return JSON.parse(data);
  },
  
  set: (key, data) => {
    console.log('set storage');
    const string = JSON.stringify(data);

    localStorage.setItem(key, string);
  }
}