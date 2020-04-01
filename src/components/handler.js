export default {
  sort(array, field, type = "asc") {
    array.sort(function(a, b) {
      if (field === "updatedAt") {
        a[field] = new Date(a[field]);
        a[field] = a[field].getTime();

        b[field] = new Date(b[field]);
        b[field] = b[field].getTime();
      }
      switch (type) {
        case "asc":
          return a[field] - b[field];
        case "desc":
          return b[field] - a[field];
        default:
          return array;
      }
    });
  },

  formatDate(date) {
    if (!date) return "";
    let dateObj = new Date(date);
    var d = dateObj.getDate();
    var m = dateObj.getMonth() + 1;
    var y = dateObj.getFullYear();
    return d + "/" + m + "/" + y;
  }
};
