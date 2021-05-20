import { Pagination } from "react-bootstrap";

const Pages = ({ page, loading, total_pages, param }) => {
  if (loading || !total_pages || !page) {
    return <></>;
  }

  let currPages = [];
  let pageInt = parseInt(page);
  let lastPage = parseInt(total_pages);

  let url =
    window.location.pathname.slice(0, window.location.pathname.indexOf("/")) +
    param +
    "/";

  if (pageInt === 1) {
    if (lastPage === 1) {
      currPages.push(
        <Pagination key={-1}>
          <Pagination.Prev disabled>Prev</Pagination.Prev>
          <Pagination.Item active key={pageInt}>
            {page}
          </Pagination.Item>
          <Pagination.Next disabled>Next</Pagination.Next>
        </Pagination>
      );
    } else if (lastPage === 2) {
      let nextPage = pageInt + 1;
      currPages.push(
        <Pagination key={-1}>
          <Pagination.Prev disabled>Prev</Pagination.Prev>
          <Pagination.Item active key={pageInt}>
            {page}
          </Pagination.Item>
          <Pagination.Next key={nextPage} href={url + nextPage}>
            Next
          </Pagination.Next>
        </Pagination>
      );
    } else {
      let nextPage = pageInt + 1;
      currPages.push(
        <Pagination key={-1}>
          <Pagination.First disabled key={""}>
            First
          </Pagination.First>
          <Pagination.Item active key={pageInt}>
            {page}
          </Pagination.Item>
          <Pagination.Next key={nextPage} href={url + nextPage}>
            Next
          </Pagination.Next>
          <Pagination.Last key={lastPage} href={url + lastPage}>
            Last
          </Pagination.Last>
        </Pagination>
      );
    }
  } else if (pageInt === lastPage) {
    if (lastPage === 2) {
      let prev = page - 1;
      currPages.push(
        <Pagination key={-2}>
          <Pagination.Prev key={prev} href={url + prev}>
            1
          </Pagination.Prev>

          <Pagination.Item active key={page}>
            {page}
          </Pagination.Item>
        </Pagination>
      );
    } else {
      let prev = page - 1;
      currPages.push(
        <Pagination key={-2}>
          <Pagination.First key={1} href={url}>
            First
          </Pagination.First>
          <Pagination.Prev key={prev} href={url + prev}>
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
    }
  } else {
    if (pageInt === lastPage - 1) {
      let firstPage = 1;
      let next = parseInt(page) + 1;
      let prev = parseInt(page) - 1;
      // if prev === 1 we have to avoid the keys being the same so, since the API defaults to the first page, we can ommit the key being a number (1) to empty string
      if (prev === 1) {
        firstPage = "";
      }

      currPages.push(
        <Pagination key={-3}>
          <Pagination.First key={firstPage} href={url}>
            First
          </Pagination.First>
          <Pagination.Prev key={prev} href={url + prev}>
            Prev
          </Pagination.Prev>

          <Pagination.Item active key={pageInt}>
            {page}
          </Pagination.Item>
          <Pagination.Next key={next} href={url + next}>
            Next
          </Pagination.Next>

          <Pagination.Last disabled key={0}>
            Last
          </Pagination.Last>
        </Pagination>
      );
    } else {
      let firstPage = 1;
      let next = parseInt(page) + 1;
      let prev = parseInt(page) - 1;
      // if prev === 1 we have to avoid the keys being the same so, since the API defaults to the first page, we can ommit the key being a number (1) to empty string
      if (prev === 1) {
        firstPage = "";
      }

      currPages.push(
        <Pagination key={-3}>
          <Pagination.First key={firstPage} href={url + firstPage}>
            First
          </Pagination.First>
          <Pagination.Prev key={prev} href={url + prev}>
            Prev
          </Pagination.Prev>

          <Pagination.Item active key={pageInt}>
            {page}
          </Pagination.Item>
          <Pagination.Next key={next} href={url + next}>
            Next
          </Pagination.Next>

          <Pagination.Last key={lastPage} href={url + lastPage}>
            Last
          </Pagination.Last>
        </Pagination>
      );
    }
  }

  return <>{currPages}</>;
};

export default Pages;
