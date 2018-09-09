import { Container } from "inversify";

import LibBootstrapper from "../lib/bootstrap";
import ServiceBootstrapper from "../service/bootstrap";
import DomainBootstrapper from "../domain/bootstrap";
import ProxyBootstrapper from "../proxy/bootstrap";
import ApiBootstrapper from "../api/bootstrap";

require("dotenv").config();
const container = new Container();

LibBootstrapper(container);
ServiceBootstrapper(container);
DomainBootstrapper(container);
ProxyBootstrapper(container);
ApiBootstrapper(container);

export { container };
