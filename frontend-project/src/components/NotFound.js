import { Link } from "react-router-dom";
import "../styles/NotFound.css";

/**
 *
 * @returns a funny not found page I found online at https://freefrontend.com/html-funny-404-pages/
 */
export default function NotFound() {
  return (
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center">404</h1>
              </div>

              <div className="contant_box_404">
                <h3 className="h2">
                  Look like you're lost!
                  <br />{" "}
                  <span className="subtext">
                    The page you are looking for is not avaible!
                  </span>
                </h3>

                <Link to="/" className="link_404">
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
