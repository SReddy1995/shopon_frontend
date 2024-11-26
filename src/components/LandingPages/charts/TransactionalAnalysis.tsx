import { useState, useEffect } from "react";
import GenericChart from "./GenericChart";


const TransactionalAnalysis = ({ data,labels, type }: any) => {
    const [customRange, setCustomRange] = useState({ start: null, end: null });
    const categories = ['totalOrders', 'totalOrderValue'];

    return (
        <GenericChart
            data={data}
            labels={labels}
            type={type}
            title="Transactional Analysis"
            categories={categories}
            customRange={customRange}
            setCustomRange={setCustomRange}
            showComparativeFilters = {true}
        />
    );
};

export default TransactionalAnalysis;