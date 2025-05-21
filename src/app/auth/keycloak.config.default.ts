import { KeycloakConfig } from "keycloak-js";

const keycloakConfig: KeycloakConfig = {
  url: "http://localhost:9000", // Default Keycloak server
  realm: "odds",
  clientId: "worklog",
};

export const environment = {
  production: false,
  keycloak: keycloakConfig,
};
