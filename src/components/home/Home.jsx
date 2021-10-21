import { Container } from "react-bootstrap";
import { connect } from "react-redux";
const mapStateToProps = (state) => ({ user: state.user });

const Home = ({ user }) => {
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
export default connect(mapStateToProps)(Home);
