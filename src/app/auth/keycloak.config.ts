import { KeycloakConfig } from "keycloak-js";

const keycloakConfig: KeycloakConfig = {
  url: "http://localhost:9000", // e.g., 'http://localhost:8080/auth'
  realm: "odds",
  clientId: "worklog",
};

export const environment = {
  production: false,
  keycloak: keycloakConfig,
};
