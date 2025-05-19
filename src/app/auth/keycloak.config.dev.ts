import { KeycloakConfig } from "keycloak-js";

const keycloakConfig: KeycloakConfig = {
  url: "https://sso-dev.odd.works",
  realm: "odt",
  clientId: "worklog",
};

export const environment = {
  production: false,
  keycloak: keycloakConfig,
};
