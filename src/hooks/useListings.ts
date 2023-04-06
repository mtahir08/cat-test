import * as React from 'react';

import useAPI from './useAPI';

const useListings = (categoryId: number) => {
  const { get, data, isLoading, isError, headers } = useAPI();
  const [paginationCount, setPaginationCount] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [dataToShow, setDataToShow] = React.useState([]);

  React.useEffect(() => {
    if (!isLoading) {
      get(
        `/images/search/?limit=10&category_ids=${categoryId}&order=ASC&page=${currentPage}`
      );
    }
  }, [categoryId, currentPage]);

  React.useEffect(() => {
    setPaginationCount(headers?.map['pagination-count']);
  }, [headers]);

  React.useEffect(() => {
    if (data?.length) {
      setDataToShow([...dataToShow, ...data]);
    }
  }, [JSON.stringify(data)]);

  const onEndReached = () => {
    if (currentPage < paginationCount) setCurrentPage(currentPage + 1);
  };

  return { dataToShow, isLoading, isError, onEndReached };
};

export default useListings;
