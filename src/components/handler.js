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
  }
};
