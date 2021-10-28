import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { ReduxStore } from "../../types/types";

const Home = () => {
  const user = useSelector((state: ReduxStore) => state.user);
  return (
    <div>
      <Container>
        <h1 className="text-muted my-5">
          Hello {user.name ? user.name : "there"}!
        </h1>
      </Container>
    </div>
  );
};
export default Home;
