import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import HomepageLayout from "./containers/Home";
import BookList from "./containers/BookList";
import AddBook from "./containers/AddBook";
import EditBook from "./containers/EditBook";
import ProductDetail from "./containers/ProductDetail";

const BaseRouter = () => (
  <Hoc>
    <Route path="/addbook/" component={AddBook} />
    <Route path="/productdetail/:bookID" component={ProductDetail} />
    <Route path="/editbook/:bookID" component={EditBook} />
    <Route path="/products" component={BookList} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route exact path="/" component={HomepageLayout} />
  </Hoc>
);

export default BaseRouter;
