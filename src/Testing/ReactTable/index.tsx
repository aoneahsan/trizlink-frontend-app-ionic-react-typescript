import React from 'react';
// import { useReactTable } from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const PRODUCTS_API_URL = 'https://fakestoreapi.com/products';

const TestingReactTable: React.FC = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['products'],
    queryFn: () => axios.get(PRODUCTS_API_URL),
  });
  // const tableInstance = useReactTable({});

  return (
    <>
      <h1>React Table</h1>
      <table></table>
    </>
  );
};

export default TestingReactTable;
