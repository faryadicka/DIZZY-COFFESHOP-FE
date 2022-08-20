import React from 'react'
import "./NotFound.scoped.css";

function NotFound() {
  return (
    <>
        <section className="page_404">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 ">
                <div className="col-sm-10 col-sm-offset-1  text-center banner">
                  <h1 className="text-center ">404</h1>
                  <div className="four_zero_four_bg"></div>
                  <div className="contant_box_404">
                    <h3 className="h2">PAGE NOT FOUND</h3>
                    <p>the page you are looking for not avaible!</p>
                    <a href="/" className="link_404">
                      <button className="btn btn-warning btn-404">
                        Go To Home
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
  )
}

export default NotFound