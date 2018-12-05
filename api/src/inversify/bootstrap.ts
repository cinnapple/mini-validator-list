import { Container } from "inversify";

import LibBootstrapper from "../lib/inversify.bootstrap";
import ServiceBootstrapper from "../service/inversify.bootstrap";
import DomainBootstrapper from "../domain/inversify.bootstrap";
import ProxyBootstrapper from "../proxy/inversify.bootstrap";
import ApiBootstrapper from "../api/inversify.bootstrap";

const container = new Container();

LibBootstrapper(container);
ServiceBootstrapper(container);
DomainBootstrapper(container);
ProxyBootstrapper(container);
ApiBootstrapper(container);

export { container };
