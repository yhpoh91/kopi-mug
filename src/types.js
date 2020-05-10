/* @flow */
export type ScopeType = 'singleton' | 'scoped' | 'transient';
export type ServiceType = 'class' | 'function';
export type ParameterType = 'dependency' | 'value';

export type Parameter = { type: ParameterType, value: any };
export type ServiceFactory = (...args: Array<string>) => any;
export type ServiceConfiguration = {
  scopeType: ScopeType,
  serviceType: ServiceType,
  factory: any,
  parameters: Array<Parameter>,
};
export type ServiceConfigurationBuilder = {
  factory: any,
  parameters: Array<Parameter>,
  scopeType: ScopeType,
  serviceType: ServiceType,
  build: () => any,
  addDependency: (string) => ServiceConfigurationBuilder,
  addValue: (any) => ServiceConfigurationBuilder,
  setScopeType: (ScopeType) => ServiceConfigurationBuilder,
  setServiceType: (ServiceType) => ServiceConfigurationBuilder,
};

export type Configuration = {
  defaultScopeType: ScopeType,
  defaultServiceType: ServiceType,
};