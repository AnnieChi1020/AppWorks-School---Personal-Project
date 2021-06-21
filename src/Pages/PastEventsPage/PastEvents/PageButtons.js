import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const PageButtonsContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 50px 0 0 0;
`;

const PageButton = styled.div`
  border: 1px solid transparent;
  font-size: 16px;
  font-weight: 600;
  line-height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  padding: 5px 1px;
  color: #a4a3a3;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  :hover {
    color: #57bc90;
  }
`;

const SelectedPageButton = styled(PageButton)`
  border-bottom: 1px solid #747474;
  cursor: inherit;
  pointer-events: none;
  color: #4f4f4f;
`;

const DisabledPageButton = styled(PageButton)`
  cursor: inherit;
  opacity: 0.3;
  pointer-events: none;
`;




function PageButtons(props) {
  return (
    <PageButtonsContainer>
      {props.showPageNum === 1 ? (
        <DisabledPageButton>
          <FontAwesomeIcon disabled icon={faChevronLeft} />
        </DisabledPageButton>
      ) : (
        <PageButton
          onClick={() => {
            props.toPrevPage();
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </PageButton>
      )}

      {props.pageNumber.map((page, index) =>
        props.showPageNum === page ? (
          <SelectedPageButton
            key={index}
            id={`${page}`}
            disabled
            onClick={(e) => props.changePage(e.target.id)}
          >
            {page}
          </SelectedPageButton>
        ) : (
          <PageButton
            key={index}
            id={`${page}`}
            onClick={(e) => props.changePage(e.target.id)}
          >
            {page}
          </PageButton>
        )
      )}
      {props.showPageNum === props.pageNumber.length ? (
        <DisabledPageButton>
          <FontAwesomeIcon disabled icon={faChevronRight} />
        </DisabledPageButton>
      ) : (
        <PageButton
          onClick={() => {
            props.toNextPage();
          }}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </PageButton>
      )}
    </PageButtonsContainer>
  );
}

export default PageButtons;
