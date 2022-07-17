// import contractService from "services/contractService";

import { useState, useEffect } from "react";
import dataService from "services/dataService";
import Property from "types/Property";

function useDeals() {
  const [deals, setDeals] = useState<Property[]>([]);

  useEffect(() => {
    setDeals(dataService.getDeals());
  }, []);

  return { deals };
}

export default useDeals;
