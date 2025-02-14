import Hero from "../../components/Hero/Hero";
import BookDetails from "../../components/BookDetails/BookDetails";
import Layout from "../../components/Layout/Layout";
import { useLocation } from "react-router-dom";
import useUserStore from "../../../store/useUserStore";
import GuestBlock from "../../components/GuestBlock/GuestBlock";

const BookInfo = () => {
  const location = useLocation();
  const { book } = location.state || {};

  const isLogined = useUserStore((state) => state.isLogined);

  return (
    <>
      <Layout
        hero={isLogined ? <Hero section="도서 상세" /> : null}
        content={isLogined ? <BookDetails book={book} /> : <GuestBlock />}
      />
    </>
  );
};
export default BookInfo;
