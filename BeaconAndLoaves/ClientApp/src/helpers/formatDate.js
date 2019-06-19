const formatDate = (date) => {
  const inputDate = new Date(date);
  const month = (`0${inputDate.getMonth() + 1}`).slice(-2);
  const year = inputDate.getFullYear();
  const formattedDate = `${month}/${year}`;
  return formattedDate;
};

export default formatDate;
