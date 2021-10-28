export const urlCheck = (type:string, query:string, page:number) => {
  let skip = page * 8;
  let url = `${process.env.REACT_APP_URLFETCH}/jobs?limit=8&skip=${skip}`;

  switch (type) {
    case "company":
      return (url = url + `&company=${query}`);
      break;
    case "title":
      return (url = url + `&title=${query}`);
      break;
    case "category":
      return (url = url + `&category=${query}`);
      break;
    default:
      console.log("Switch error");
      return url;
      break;
  }
};
