import { useState, useEffect } from "react";
import dataService from "services/dataService";
import Property from "types/Property";

type Options = {
  id?: string;
}

function useDeals(options?: Options): { deals: Property[] } {
  const [deals, setDeals] = useState<Property[]>([]);
  const { id } = options || {};
  const dealsResult: Property[] = id === undefined ? deals : deals?.filter((deal) => deal.id === id) || [];

  useEffect(() => {
    setDeals(dataService.getDeals());
  }, []);

  return { deals: dealsResult };
}

export default useDeals;
