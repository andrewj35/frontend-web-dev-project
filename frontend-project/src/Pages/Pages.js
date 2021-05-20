import { Pagination } from "react-bootstrap";

const Pages = ({ page, loading, total_pages }) => {
  if (loading || !total_pages || !page) {
    return <></>;
  }

  let currPages = [];
  let pageInt = parseInt(page);
  let lastPage = parseInt(total_pages);

  function goNextPage() {
    window.location.href =
      window.location.pathname.slice(0, window.location.pathname.indexOf("/")) +
      "/movies/" +
      (pageInt + 1);
  }

  function goPrevPage() {
    window.location.href =
      window.location.pathname.slice(0, window.location.pathname.indexOf("/")) +
      "/movies/" +
      (pageInt - 1);
  }

  function goFirstPage() {
    window.location.href =
      window.location.pathname.slice(0, window.location.pathname.indexOf("/")) +
      "/movies/" +
      1;
  }

  function goLastPage() {
    window.location.href =
      window.location.pathname.slice(0, window.location.pathname.indexOf("/")) +
      "/movies/" +
      lastPage;
  }

  if (pageInt === 1) {
    let first = 0;
    let nextPage = pageInt + 1;
    currPages.push(
      <Pagination key={-1}>
        <Pagination.First key={first} disabled>
          First
        </Pagination.First>
        <Pagination.Item active key={pageInt}>
          {page}
        </Pagination.Item>
        <Pagination.Next key={nextPage} onClick={() => goNextPage()}>
          Next
        </Pagination.Next>
        <Pagination.Last key={lastPage} onClick={() => goLastPage()}>
          {total_pages}
        </Pagination.Last>
      </Pagination>
    );
  } else if (pageInt === lastPage) {
    let prev = page - 1;
    currPages.push(
      <Pagination key={-2}>
        <Pagination.First key={1} onClick={() => goFirstPage()}>
          First
        </Pagination.First>
        <Pagination.Prev key={prev} onClick={() => goPrevPage()}>
          Prev
        </Pagination.Prev>

        <Pagination.Item active key={page}>
          {page}
        </Pagination.Item>
        <Pagination.Last disabled key={0}>
          Last
        </Pagination.Last>
      </Pagination>
    );
  } else {
    let firstPage = 1;
    let next = parseInt(page) + 1;
    let prev = parseInt(page) - 1;

    currPages.push(
      <Pagination key={-3}>
        <Pagination.First key={firstPage} onClick={() => goFirstPage()}>
          First
        </Pagination.First>
        <Pagination.Prev key={prev} onClick={() => goPrevPage()}>
          Prev
        </Pagination.Prev>

        <Pagination.Item active key={pageInt}>
          {page}
        </Pagination.Item>
        <Pagination.Next key={next} onClick={() => goNextPage()}>
          Next
        </Pagination.Next>

        <Pagination.Last key={lastPage} onClick={() => goLastPage()}>
          Last
        </Pagination.Last>
      </Pagination>
    );
  }

  return <>{currPages}</>;
};

export default Pages;
