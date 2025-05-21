import { KeycloakConfig } from "keycloak-js";

const keycloakConfig: KeycloakConfig = {
  url: "https://sso.odd.works",
  realm: "odt",
  clientId: "worklog",
};

export const environment = {
  production: true,
  keycloak: keycloakConfig,
};
