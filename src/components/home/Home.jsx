import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);
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
