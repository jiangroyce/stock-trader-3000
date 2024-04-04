let [totalCount, currentPage, pageSize, onPageChange, siblingCount, className] = [];

export const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage
}) => {
    const paginationRange = useMemo(() => {
        //pass
    }, [totalCount, pageSize, siblingCount, currentPage]);

    return paginationRange
}

// todo
// nav bar styling
// watchlists dashboard styling
// navbar and watchlists all static
