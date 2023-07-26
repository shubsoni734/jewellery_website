import { useState, useContext, createContext, useEffect } from "react";

const BillContext = createContext();
const BillProvider = ({ children }) => {
  const [bill, setBill] = useState([]);

  useEffect(() => {
    let existingBillDetail = localStorage.getItem("bill");
    if (existingBillDetail) setBill(JSON.parse(existingBillDetail));
  }, []);

  return (
    <BillContext.Provider value={[bill, setBill]}>
      {children}
    </BillContext.Provider>
  );
};

// custom hook
const useBill = () => useContext(BillContext);

export { useBill, BillProvider };
