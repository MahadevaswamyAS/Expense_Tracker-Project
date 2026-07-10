import moment from "moment";

 export const validateEmail= (email) => {
    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}

export const getInitials=(name)=>{
    if(!name) return "";
    const words =name.split(" ");
    let initials="";
    for(let i=0;i<Math.min(words.length,2); i++){
        initials+=words[i][0];
    }
    return initials.toUpperCase();
};

export const addThousandsSeparator=(num)=>{
    if(num== null || isNaN(num)) return "";

    const [integerPart,fractionalPart]= num.toString().split(".");
    const formattedInteger=integerPart.replace(/\B(?=(\d{3})+(?!\d))/g,",");
    return fractionalPart
    ?`${formattedInteger}.${fractionalPart}`
    :formattedInteger;
}



export const prepareExpenseBarChartData = (data = []) => {
   const map = {};

  data.forEach(item => {
    if (!item?.date) return;

    const dateKey = moment(item.date).format("YYYY-MM-DD"); // unique key

    if (!map[dateKey]) {
      map[dateKey] = {
        dateKey,
        month: moment(item.date).format("Do MMM"),
        amount: 0,
      };
    }

    map[dateKey].amount += Number(item.amount) || 0;
  });

  return Object.values(map).sort(
    (a, b) => new Date(a.dateKey) - new Date(b.dateKey)
  );
};


export const prepareIncomeBarChartData=(data=[])=>{
    const map = {};

  data.forEach(item => {
    if (!item?.date) return;

    const dateKey = moment(item.date).format("YYYY-MM-DD"); // unique key

    if (!map[dateKey]) {
      map[dateKey] = {
        dateKey,
        month: moment(item.date).format("Do MMM"),
        amount: 0,
      };
    }

    map[dateKey].amount += Number(item.amount) || 0;
  });

  return Object.values(map).sort(
    (a, b) => new Date(a.dateKey) - new Date(b.dateKey)
  );
};

export const prepareExpenseLineChartData=(data=[])=>{
  const map = {};

  data.forEach(item => {
    if (!item?.date) return;

    const dateKey = moment(item.date).format("YYYY-MM-DD"); // unique key

    if (!map[dateKey]) {
      map[dateKey] = {
        dateKey,
        month: moment(item.date).format("Do MMM"),
        amount: 0,
      };
    }

    map[dateKey].amount += Number(item.amount) || 0;
  });

  return Object.values(map).sort(
    (a, b) => new Date(a.dateKey) - new Date(b.dateKey)
  );
};